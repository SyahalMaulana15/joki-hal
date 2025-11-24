/* ========================================
   JOKI HAL - CONFIGURATION FILE
   ======================================== */

// ⚠️ PENTING: Ganti URL ini dengan URL Web App dari Google Apps Script Anda
const CONFIG = {
    // Google Apps Script Web App URL
    // Dapatkan URL ini setelah deploy Apps Script sebagai Web App
    // Format: https://script.google.com/macros/s/AKfycby.../exec
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwBOYGaeg3fbkAl4V3eC5i7xRRuO-w3pDgy874Ouh4MqIrPLx8FH-3ShhdD8090Kz1NDw/exec',
    
    // Secret Token (HARUS SAMA dengan yang di Apps Script)
    // Jangan ganti ini kecuali Anda juga ganti di Apps Script
    SECRET_TOKEN: 'JOKIHAL2024SECRET',
    
    // Kontak Twitter/X
    TWITTER_URL: 'https://twitter.com/SyahalMaulana15',
    
    // Nomor WhatsApp (Format: 62xxx tanpa tanda +)
    WHATSAPP_NUMBER: '6289516876075',
    WHATSAPP_URL: 'https://wa.me/6289516876075',
    
    // Link untuk "Lihat Testimoni Lainnya"
    TESTIMONI_URL: 'https://twitter.com/SyahalMaulana15',
    
    // Slider Settings
    SLIDER_AUTOPLAY_SPEED: 3000, // 3 detik (dalam milliseconds)
    SLIDER_SPEED: 500, // 0.5 detik untuk transisi
};

// Jenis Joki Names (Jangan edit ini)
const JOKI_TYPES = {
    '2S': '2-Shot',
    'MNG': 'Meet & Greet',
    'VC': 'Video Call'
};