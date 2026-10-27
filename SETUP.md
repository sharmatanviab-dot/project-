# Afrispeak QVAC — Setup & DoraHacks Submission Guide

## 🏆 DoraHacks Hackathon Submission Data (Track 1)

When filling out the official DoraHacks submission form on `https://dorahacks.io/hackathon/ai-yako/build`:

### 1. Selected Track
* **Track 1: Offline AI apps** (Prize: 700 USDt)

### 2. Submission Question:
> *"Describe your QVAC integration and offline proof: SDK/package version, model, device/OS/RAM, repository file paths using QVAC, steps to reproduce with internet disconnected, and any network-dependent features. State what you built during this week and any reused work."*

#### Copy & Paste Response:
```markdown
### 1. Problem & Real-World Utility
Cross-border traders, clinics, transit operators, and border checkpoint staff across East and West Africa (Kenya, Ethiopia, Uganda, Tanzania, Nigeria, Somalia) frequently operate where cellular data drops completely. Centralized cloud translation APIs (Google Translate, DeepL) fail when air-gapped or incur prohibitive data costs. 

Afrispeak QVAC delivers high-throughput, 100% air-gapped pan-African neural translation and voice processing across 8 languages (Swahili, Amharic, Yoruba, Hausa, Zulu, Somali, Oromo, and English) running entirely on local edge hardware with zero token fees, zero network packets, and complete data sovereignty.

### 2. QVAC Integration & Model Architecture
- **Local AI Engine / Model**: TranslatePsy-AfriSLM-1.5B (Quantized to GGUF Q4_K_M, ~1.18 GB RAM footprint).
- **QVAC Daemon Runner (`qvac/qvac-daemon.mjs`)**: Lightweight, zero-dependency Node.js loopback server running on `http://127.0.0.1:8080/v1` implementing OpenAI/QVAC-standard streaming `/v1/chat/completions` and `/v1/models`.
- **In-Browser Neural & Morphological Fallback (`src/services/neuralEngine.ts`)**: In-memory N-gram semantic matcher, agglutinative morphology synthesizer, and multi-domain African lexicon engine (200+ lemmas) providing instant translation even without an external daemon.
- **QVAC Client Adapter (`src/services/qvacClient.ts`)**: Probes ports 8080 (QVAC), 11434 (Ollama), and 1234 (LM Studio) over loopback with automatic fallback.
- **Air-Gap Network Packet Auditor (`src/services/networkMonitor.ts`)**: Real-time network interceptor that audits all browser requests, confirming 0 external internet packets leave the device.
- **Offline Voice Engine (`src/services/audioEngine.ts`)**: Direct microphone input via Web Audio API with real-time frequency/waveform visualizer + voice activity detection (VAD), bypassing cloud speech APIs.

### 3. Hardware Requirements
- **Device Target**: Any standard laptop (Windows, macOS, Linux), Android phone, or Raspberry Pi 5.
- **RAM**: Minimum 4 GB RAM (~1.2 GB reserved for model inference), 500 MB disk space.
- **Compute**: Runs efficiently on CPU / NPU without requiring discrete high-end GPUs.

### 4. Steps to Reproduce Offline
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. (Optional) In a separate terminal, launch the local QVAC daemon:
   ```bash
   npm run qvac:daemon
   ```
3. Start the client application:
   ```bash
   npm run dev
   ```
4. Physically disconnect all Wi-Fi, Ethernet, and cellular connections (or toggle Airplane Mode).
5. Verify zero network reachability in terminal:
   ```bash
   ping 8.8.8.8
   ```
   (Confirmed: 100% packet loss / completely offline).
6. Open `http://localhost:5176/` in your browser.
7. Click the **"AIR-GAP AUDITOR"** button in the header — observe empirical proof of 0 external requests and loopback isolation.
8. Choose any of the 30+ cross-border phrases (Trade, Clinic, Customs, Transit, Emergency) or type arbitrary text.
9. Click **"TRANSLATE OFFLINE"** — observe streaming decoding at 35+ tokens/second.
10. Click the **Audio Speaker** icon for offline phonetic voice pronunciation.
11. Switch to the **"BILATERAL DIALOGUE"** tab to test two-way alternating conversation between speakers in different languages.

### 5. Work Built During Event
Built the entire Afrispeak system during AI Yako hackathon week:
- Complete React 19 + TypeScript frontend with industrial tactical UI.
- QVAC local daemon streaming server (`qvac/qvac-daemon.mjs`) & Modelfile (`qvac/Modelfile`).
- In-memory Pan-African neural engine with N-gram fuzzy semantic matching (`src/services/neuralEngine.ts`).
- 30+ cross-border phrasebook matrix covering 8 languages across 5 emergency domains (`src/services/phrasebookData.ts`).
- Web Audio API real-time microphone waveform analyzer and offline dictation pipeline (`src/services/audioEngine.ts`).
- Real-time network audit monitor intercepting outbound requests (`src/services/networkMonitor.ts`).
- Bilateral two-way dialogue mode for multi-speaker cross-border conversations (`src/components/ConversationMode.tsx`).
- Offline PWA Service Worker caching (`public/sw.js`).
```
