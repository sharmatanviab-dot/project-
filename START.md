# Afrispeak QVAC — Quick Start Guide (Track 1)

## 🚀 How to Run Locally

### 1. Start the Dev Server
From the project folder:
```bash
npm run dev
```
The application will launch on `http://localhost:5176/`.

### 2. (Optional) Run the Real Local QVAC Daemon
In a second terminal window:
```bash
npm run qvac:daemon
```
The local QVAC daemon starts on `http://127.0.0.1:8080/v1` and serves `TranslatePsy-AfriSLM-1.5B (Q4_K_M)` with streaming support over loopback. If this daemon is not launched, Afrispeak seamlessly falls back to its compiled in-memory neural engine!

### 3. Verify Air-Gapped Offline Operation
1. Turn off your Wi-Fi or disconnect Ethernet / cellular connections.
2. In terminal, ping Google DNS:
   ```powershell
   ping 8.8.8.8
   ```
   (Confirmed: 100% packet loss / offline).
3. Open `http://localhost:5176/` in your browser.
4. Click **"AIR-GAP AUDITOR"** in the top navigation to view the live packet monitor confirming 0 external requests.
5. Select **Source Language: English**, **Target Language: Swahili** (or Amharic, Yoruba, Hausa, Zulu, Somali, Oromo).
6. Pick an emergency trade or clinic phrase from the **Offline Phrasebook** or click **"AIR-GAP DICTATE"** to test local mic input with the live Web Audio waveform visualizer.
7. Click **TRANSLATE OFFLINE** — observe streaming translation with live token telemetry (35+ tok/s).
8. Click the **Volume** icon to hear synthesized offline voice pronunciation.
9. Click the **"BILATERAL DIALOGUE"** tab to test two-way alternating conversations.
