// ==UserScript==
// @name         Invidiousify
// @version      1.0
// @description  Replaces YouTube video links with Invidious links when copied to clipboard
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Invidious base URL
    const invidiousBaseURL = 'https://invidious.nerdvpn.de/watch/';

    // Regular expressions to match YouTube video URLs
    const youtubeRegex = /https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const youtuBeRegex = /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;

    function checkClipboard() {
        navigator.clipboard.readText().then((text) => {
            let match = youtubeRegex.exec(text) || youtuBeRegex.exec(text);
            if (match) {
                const videoId = match[1];
                const invidiousURL = invidiousBaseURL + videoId;

                navigator.clipboard.writeText(invidiousURL).then(() => {
                    showNotification(`Replaced YouTube URL with: ${invidiousURL}`);
                });
            }
        }).catch((err) => {
            console.error('Failed to read clipboard content:', err);
        });
    }

    // Function to show a notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#333';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        notification.style.zIndex = '10000';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setInterval(checkClipboard, 1000);
})();
