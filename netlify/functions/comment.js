const Waline = require('@waline/vercel');

// Environment variables dari Netlify
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_TOKEN = process.env.JWT_TOKEN;
const SITE_NAME = process.env.SITE_NAME || 'My Blog';
const SITE_URL = process.env.SITE_URL || 'https://your-site.netlify.app';

// Validate required env vars
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

if (!JWT_TOKEN) {
  throw new Error('JWT_TOKEN environment variable is required');
}

// Export Waline handler untuk Netlify Functions
module.exports = Waline({
  // Database Configuration
  storage: 'mongodb',
  mongodbUrl: MONGODB_URI, // ← Gunakan mongodbUrl bukan dbUrl
  
  // Security
  secureDomains: [SITE_URL], // Allow CORS dari domain ini
  forbiddenWords: [], // Kata-kata terlarang (optional)
  
  // JWT untuk authentication
  jwtToken: JWT_TOKEN,
  
  // Site info
  serverURL: SITE_URL,
  
  // Features
  upload: false, // Disable file upload (Netlify limitation)
  login: 'enable', // Enable login
  
  // Hooks (optional)
  async postSave(comment) {
    console.log('New comment saved:', comment);
    // Bisa tambahkan webhook ke Laravel di sini
    // await notifyLaravel(comment);
  },
  
  async postUpdate(comment) {
    console.log('Comment updated:', comment);
  },
  
  async postDelete(comment) {
    console.log('Comment deleted:', comment);
  },
});
