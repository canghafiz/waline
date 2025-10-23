const Waline = require('@waline/vercel');

// Environment variables dari Netlify (Menggunakan nama yang Anda inginkan)
const MONGODB_URI = process.env.MONGODB_URI;
// Menggunakan MASTER_KEY sebagai kunci rahasia utama Waline
const MASTER_KEY = process.env.MASTER_KEY; 
// Menggunakan WALINE_SERVER_URL sebagai URL domain Anda
const WALINE_SERVER_URL = process.env.WALINE_SERVER_URL; 


// --- VALIDASI WAJIB ---
// Ini akan membuat proses deploy gagal jika Env Vars penting tidak ada.
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

if (!MASTER_KEY) {
  throw new Error('MASTER_KEY environment variable is required');
}

if (!WALINE_SERVER_URL) {
  throw new Error('WALINE_SERVER_URL environment variable is required');
}
// --- AKHIR VALIDASI ---


// Export Waline handler untuk Netlify Functions
module.exports = Waline({
  // Database Configuration
  storage: 'mongodb',
  // FIX KRITIS: Menggunakan mongodbUrl untuk koneksi MongoDB
  mongodbUrl: MONGODB_URI, 
  
  // Security & Authentication
  // Waline menggunakan masterKey untuk menandatangani JWT dan otorisasi admin
  masterKey: MASTER_KEY, 
  
  // Site info & CORS
  // Waline menggunakan serverURL dan secureDomains
  serverURL: WALINE_SERVER_URL,
  secureDomains: [WALINE_SERVER_URL], 
  
  // Fitur
  login: 'enable',
  upload: false, 

  // Env
  env: 'netlify',
  
  // Hooks (optional)
  async postSave(comment) {
    console.log('New comment saved:', comment);
  },
});
