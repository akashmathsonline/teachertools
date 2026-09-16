(function() {
    // 1. Automatically Inject Favicon using your permanent image link
    var faviconUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghQs5Ur6Wd9uaY2lFogAOB7LfSy4c6uPs43F4dpvQpBboWfRwVYoq_NSaf0potBGwD_ASciUYW1CwyOv5z4vjF2VZhTeeESxrSJyq_tOomDCTlXQ5_y7SdDWAeAc1SeG8QXSAL6PtoXwKcXXb1pKHKnX15SjWmX91R_3nxFRB2hL9iltuSs0WPXHw_xPo/s1600/blog%20image.png";
    
    var existingFavicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    existingFavicon.type = 'image/png';
    existingFavicon.rel = 'icon';
    existingFavicon.href = faviconUrl;
    if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(existingFavicon);
    }

    // 2. Automatically Inject Google Fonts if not present
    if (!document.querySelector("link[href*='Fredoka']")) {
        var fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap';
        document.head.appendChild(fontLink);
    }

    // 3. Optional: Add a smooth scroll or global helper if needed
    console.log("Teacher Tools Studio: Common automation script loaded successfully.");
})();
