const Waline = require('@waline/vercel');

// Ambil variabel lingkungan dari Netlify
const MONGODB_URI = process.env.MONGODB_URI;
const MASTER_KEY = process.env.MASTER_KEY; 
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


// FIX: Menetapkan Waline() ke 'handler' agar dikenali oleh AWS Lambda/Netlify
module.exports.handler = Waline({
  // Database Configuration
  storage: 'mongodb', // Memaksa Waline menggunakan driver MongoDB
  mongodbUrl: MONGODB_URI, // URL koneksi ke MongoDB Docker Anda
  
  // Security & Authentication
  masterKey: MASTER_KEY, // Kunci rahasia untuk otorisasi admin
  
  // Site info & CORS
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
