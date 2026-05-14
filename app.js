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

    // 5 Second Loading Sequence
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            mainUI.classList.remove('hidden');
        }, 500);
    }, 5000);

    const launch = () => {
        let input = urlInput.value.trim();
        if (!input) return;

        let targetUrl;
        if (input.includes('.') && !input.includes(' ')) {
            targetUrl = input.startsWith('http') ? input : `https://${input}`;
        } else {
            // DuckDuckGo Dark Mode (kae=d)
            targetUrl = `https://duckduckgo.com/?q=${encodeURIComponent(input)}&kae=d`;
        }

        // SCRAMJET INTEGRATION FIX
        // We check if the Scramjet config exists; if not, we use a relative path
        try {
            const prefix = window.__scramjet$config?.prefix || '/service/';
            const encoded = window.__scramjet$config?.encodeUrl ? window.__scramjet$config.encodeUrl(targetUrl) : btoa(targetUrl);
            
            proxyFrame.src = prefix + encoded;
            
            welcome.classList.add('hidden');
            proxyContainer.classList.remove('hidden');
        } catch (err) {
            console.error("URANIUMV3 EXECUTION ERROR:", err);
            // Emergency fallback to direct load if proxy fails
            proxyFrame.src = targetUrl;
            welcome.classList.add('hidden');
            proxyContainer.classList.remove('hidden');
        }
    };

    // Event Listeners - Re-verified
    goBtn.onclick = () => launch();
    
    urlInput.onkeydown = (e) => {
        if (e.key === 'Enter') launch();
    };

    refreshBtn.onclick = () => {
        if (proxyFrame.src) {
            proxyFrame.contentWindow.location.reload();
        }
    };

    fullscreenBtn.onclick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };
});
