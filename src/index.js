const express = require('express');
const WebSocket = require('ws');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');

const app = express();
const HTTP_PORT = 9568;
const WS_PORT = 9567;
const HOST = '127.0.0.1';

const downloadsDir = path.join(__dirname, '../downloads');
if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

const extMap = {
    'ogg': '.ogg',
    'mpeg': '.mp3',
    'wav': '.wav',
    'x-wav': '.wav',
    'webm': '.webm',
};

const openSoundpadURL = (url) => {
    exec(`start "" "${url}"`, (err) => {
        if (err) console.error('❌ Failed to launch soundpad://', err);
        else console.log('✅ URL sent to Soundpad!');
    });
};

// HTTP Server
app.use('/downloads', express.static(downloadsDir));
app.get('/', (_, res) => res.send('📁 Access downloaded files via /downloads/filename.mp3'));
app.listen(HTTP_PORT, HOST, () => {
    console.log(`HTTP server running at: http://${HOST}:${HTTP_PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT }, () => {
    console.log(`WebSocket server running at: ws://${HOST}:${WS_PORT}`);
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (msg) => {
        const url = msg.toString().trim();
        console.log('Received URL:', url);

        try {
            const response = await axios.get(url, { responseType: 'stream' });
            const contentType = response.headers['content-type'] || '';
            const extension = Object.entries(extMap).find(([type]) => contentType.includes(type))?.[1] || '.bin';

            let name = path.parse(path.basename(new URL(url).pathname)).name;
            if (!name || name.length < 3) name = uuidv4();

            const filename = `${name}${extension}`;
            const filePath = path.join(downloadsDir, filename);
            const fileStream = fs.createWriteStream(filePath);

            response.data.pipe(fileStream);

            fileStream.on('finish', () => {
                console.log(`✅ File saved: ${filePath}`);
                const downloadURL = `http://${HOST}:${HTTP_PORT}/downloads/${encodeURIComponent(filename)}`;
                const soundpadURL = `soundpad://sound/url/${downloadURL}`;
                console.log('🔊 Opening in Soundpad:', soundpadURL);
                openSoundpadURL(soundpadURL);
                ws.send(`✅ File downloaded: ${downloadURL}`);
            });

            fileStream.on('error', (err) => {
                console.error('❌ File write error:', err);
                ws.send('❌ Error while saving file.');
            });
        } catch (err) {
            console.error('❌ Download error:', err.message);
            ws.send('❌ Error while downloading file.');
        }
    });
});
