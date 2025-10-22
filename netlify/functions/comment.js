// comment.js

const http = require('http');
// Waline-Vercel sudah support Netlify, jadi Waline/vercel sudah tepat
const Waline = require('@waline/vercel'); 
const serverless = require('serverless-http');

// 1. IMPOR model kustom Anda
// Pastikan path './custom-waline-model' sudah benar relatif terhadap file ini.
const { model: customModel } = require('./custom-waline-model'); 

const app = Waline({
    env: 'netlify',
    
    // 2. SUNNTIKKAN model kustom ke konfigurasi Waline
    model: customModel,
    
    // Opsional: Anda bisa menyimpan 'postSave' juga jika diperlukan
    async postSave(comment) { 
        // do what ever you want after save comment
    },
});

// 3. Eksport handler serverless seperti biasa
module.exports.handler = serverless(http.createServer(app));
