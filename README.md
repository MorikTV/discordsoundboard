# 🎵 DiscordSoundBoard

**DiscordSoundBoard** is a Node.js-based soundboard system that works exclusively with [Soundpad](https://leppsoft.com/soundpad/) to play custom sounds triggered from Discord Web.

---

## 🚀 Features

- 🎧 Automatically downloads and plays Discord soundboard sounds in Soundpad.
- 🌐 Works via WebSocket connection between browser and local Node.js server.
- 🧩 Easily activated via browser DevTools (no extensions or mods needed).
- 💾 Saves sounds locally in `/downloads`.

---

## 📦 Installation

```bash
git clone https://github.com/MorikTV/discordsoundboard.git
cd discordsoundboard
npm install
node src/index.js
```
---

## ⚙️ Requirements

- Windows OS  
- Soundpad (licensed version)  
- Node.js v16 or newer  
- Browser with Developer Tools (Chrome or Edge recommended)  

---

## 💻 Browser Script (DevTools)

This script redirects Discord soundboard sounds to your Soundpad setup.

### 🔧 How to Use

1. 🟢 Start `index.js` — your local WebSocket and HTTP server will launch.  
2. 🎧 Launch Soundpad on your PC.  
3. 📁 In Soundpad, create a **separate category** (e.g. `Discord`) to hold downloaded sounds.  
4. 🌐 Open Discord Web while in a **voice call**.  
5. 🔊 Open the Soundboard UI in the call (click the **center soundboard icon**).  
6. 🛠️ Press `F12` to open Developer Tools.  
7. 🧠 Go to the **Console** tab.  
8. 📋 Copy and paste the contents of `client/execute.js`, then press `Enter`.  

✅ Now, clicking a sound in Discord will send it to Soundpad instead of playing it in Discord!

---

## 📂 Project Structure
```
discordsoundboard/
│
├── client/
│   └── execute.js          # Script to run in browser (DevTools)
│
├── downloads/              # Saved audio files from Discord
│
├── index.js                # Main Node.js server
└── README.md
```
---

## 📫 Contact

Maintained by MorikTV
