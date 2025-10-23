const http = require('http');
// Menggunakan Waline.default jika Anda menggunakan sintaks require()
const Waline = require('@waline/vercel').default; 
const serverless = require('serverless-http');

// Ambil variabel lingkungan yang sudah Anda setel di Netlify
const MONGODB_URI = process.env.MONGODB_URI;
const WALINE_SERVER_URL = process.env.WALINE_SERVER_URL;
const MASTER_KEY = process.env.MASTER_KEY;


// Konfigurasi Waline dengan driver MongoDB secara eksplisit
const app = Waline({
  env: 'netlify', // Memberi tahu Waline berjalan di lingkungan Netlify/Vercel

  // --- Konfigurasi MongoDB Wajib ---
  storage: 'mongodb', 
  dbUrl: MONGODB_URI, // Menggunakan Env Var untuk URI koneksi
  serverURL: WALINE_SERVER_URL,
  masterKey: MASTER_KEY,
  // ---------------------------------

  async postSave(comment) {
    // do what ever you want after save comment
    // Pastikan Anda memproses event.path, dsb., jika Waline.default() tidak bekerja
  },
});

// Eksport handler untuk Netlify Functions
module.exports.handler = serverless(http.createServer(app));
