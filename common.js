(function() {
    // 1. Automatically Inject Favicon using your permanent image link
    var faviconUrl = "assets/favicon.ico.png";
    
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
