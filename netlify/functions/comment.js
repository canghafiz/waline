const Waline = require('@waline/vercel');
const serverless = require('serverless-http'); // <-- FIX: Adaptor untuk Lambda

// Ambil variabel lingkungan dari Netlify
const MONGODB_URI = process.env.MONGODB_URI;
const MASTER_KEY = process.env.MASTER_KEY; 
const WALINE_SERVER_URL = process.env.WALINE_SERVER_URL; 
// VARIABEL BARU: Domain tempat Waline di-embed (Situs Blog/Klien Anda)
const WALINE_CLIENT_URL = process.env.WALINE_CLIENT_URL; 


// --- VALIDASI WAJIB ---
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}
if (!MASTER_KEY) {
  throw new Error('MASTER_KEY environment variable is required');
}
if (!WALINE_SERVER_URL) {
  throw new Error('WALINE_SERVER_URL environment variable is required');
}
if (!WALINE_CLIENT_URL) {
  throw new Error('WALINE_CLIENT_URL environment variable is required for client CORS');
}
// --- AKHIR VALIDASI ---


// 1. Inisialisasi Aplikasi Waline (Ini mengembalikan aplikasi Koa)
const walineApp = Waline({
  // Database Configuration
  storage: 'mongodb',
  mongodbUrl: MONGODB_URI, 
  
  // Security & Authentication
  masterKey: MASTER_KEY, 
  
  // Site info & CORS
  serverURL: WALINE_SERVER_URL,
  // FIX: Daftarkan kedua domain (Server dan Client) untuk mengatasi ForbiddenError
  secureDomains: [WALINE_SERVER_URL, WALINE_CLIENT_URL], 
  
  // Fitur
  login: 'enable',
  upload: false, 
  env: 'netlify',
  
  // Hooks (optional)
  async postSave(comment) {
    console.log('New comment saved:', comment);
  },
});

// 2. FIX KRITIS: Bungkus aplikasi Koa dengan serverless-http 
// dan tetapkan hasilnya ke module.exports.handler
module.exports.handler = serverless(walineApp);
