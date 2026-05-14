document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    const mainUI = document.getElementById('main-ui');
    const welcome = document.getElementById('welcome-container');
    const proxyContainer = document.getElementById('proxy-container');
    const proxyFrame = document.getElementById('proxy-frame');
    const urlInput = document.getElementById('url-input');
    const goBtn = document.getElementById('go-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    // 5 Second Synthetic Loading Delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            mainUI.classList.remove('hidden');
        }, 500);
    }, 5000);

    const processURL = (input) => {
        input = input.trim();
        if (!input) return null;

        // Check if it's a URL, otherwise use DuckDuckGo Dark Mode
        if (input.includes('.') && !input.includes(' ')) {
            return input.startsWith('http') ? input : `https://${input}`;
        } else {
            // kae=d triggers Dark Mode in DDG
            return `https://duckduckgo.com/?q=${encodeURIComponent(input)}&kae=d`;
        }
    };

    const launch = () => {
        const target = processURL(urlInput.value);
        if (target) {
            // Scramjet routing logic
            // Requires your setup to have __scramjet$config available
            const proxiedUrl = window.__scramjet$config.prefix + window.__scramjet$config.encodeUrl(target);
            
            proxyFrame.src = proxiedUrl;
            welcome.classList.add('hidden');
            proxyContainer.classList.remove('hidden');
        }
    };

    goBtn.addEventListener('click', launch);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') launch();
    });

    refreshBtn.addEventListener('click', () => {
        proxyFrame.contentWindow.location.reload();
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    });
});
