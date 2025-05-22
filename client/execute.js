// 📌 Paste this script into your browser's Developer Console (F12 → Console)
// Works on Discord Web — triggers Soundpad playback via WebSocket

(function() {
    const ws = new WebSocket('ws://127.0.0.1:9567');

    ws.onopen = () => {
        console.log('✅ WebSocket connected');
    };

    ws.onclose = () => {
        console.log('❌ WebSocket disconnected');
    };

    ws.onerror = (error) => {
        console.error('⚠️ WebSocket error:', error);
    };

    document.addEventListener('click', (event) => {
        const target = event.target;
        const buttonOverlay = target.closest('.buttonOverlayActions__9be63');
        if (buttonOverlay) {
            event.stopPropagation();
            event.preventDefault();
            const soundButton = buttonOverlay.closest('.soundButton__9be63');
            if (soundButton) {
                const soundElement = soundButton.querySelector('[id^="sound-"]');
                if (soundElement) {
                    const soundId = soundElement.id.match(/\d+/)?.[0];
                    if (!soundId) return;

                    const audioUrl = `https://cdn.discordapp.com/soundboard-sounds/${soundId}`;
                    console.log(`📤 Sending URL to server: ${audioUrl}`);

                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(audioUrl);
                    } else {
                        console.warn('⛔ WebSocket is not open');
                    }
                }
            }
        }
    });
})();
