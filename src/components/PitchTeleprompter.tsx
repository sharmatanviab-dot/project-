import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Volume2,
  Shield,
  Layers,
  Users,
  BrainCircuit,
  Activity,
  Mic,
  ArrowRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import type { AppTab } from './Header';
import { translatorService } from '../services/translatorService';

interface PitchTeleprompterProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onLoadWorkbenchDemo: (text: string, src: string, target: string) => void;
  onLoadDialogueDemo: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

interface Scene {
  id: number;
  timecode: string;
  tab: AppTab;
  title: string;
  badge: string;
  visualAction: string;
  voiceover: string;
  pronunciationTip?: string;
  quickTriggerLabel?: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    timecode: '0:00 - 0:25',
    tab: 'workbench',
    title: 'The Problem & Air-Gap Proof',
    badge: '100% Air-Gapped',
    visualAction: 'Show desktop with Wi-Fi toggled OFF. Open terminal and run "ping 8.8.8.8" (100% packet loss). Switch to browser running on http://localhost:5176/.',
    voiceover:
      'Across East and West Africa, cross-border traders, rural clinics, and transit operators move goods and care for patients in remote areas where cellular data drops completely. Cloud translation APIs like Google Translate instantly fail when air-gapped.\n\nThis is Afrispeak QVAC. To prove 100% data sovereignty, my laptop is completely disconnected from the internet: Wi-Fi is off, pinging 8.8.8.8 fails with 100% packet loss, yet our entire AI operating system is running locally in memory on port 5176.',
    pronunciationTip: 'Say "CUE-vac" for QVAC. Emphasize "100% data sovereignty".'
  },
  {
    id: 2,
    timecode: '0:25 - 0:55',
    tab: 'workbench',
    title: 'Translation Studio & Native Speech',
    badge: 'TranslatePsy-AfriSLM',
    visualAction: 'Click "Trade Bargain" preset in Studio. Click "Translate Offline". Watch streaming tokens animate at 38 tok/s. Click speaker volume icon to play Swahili offline voice synthesis.',
    voiceover:
      'Powered by Tether\'s QVAC and our TranslatePsy-AfriSLM neural model, translation occurs entirely on-device. With a single click, our engine decodes complex trade and emergency statements into native Swahili at over 38 tokens per second with sub-20 millisecond latency.\n\n[Play voice audio]: Listen to the offline speech synthesis.\n\nWith 8 African languages supported—including Amharic, Yoruba, Hausa, Zulu, Somali, and Oromo—traders communicate without token fees or cloud intermediaries.',
    pronunciationTip: 'Say "Swa-HEE-lee" and "Am-HAR-ik". Let the synthesized audio play for 2 seconds.',
    quickTriggerLabel: '⚡ Load Swahili Trade Demo & Speak'
  },
  {
    id: 3,
    timecode: '0:55 - 1:20',
    tab: 'conversation',
    title: 'Bilateral Live Dialogue Mode',
    badge: 'Two-Way Conversational',
    visualAction: 'Navigate to Dialogue tab. Show Speaker 1 (English) and Speaker 2 (Swahili) message exchanges with auto-language detection and offline voice playback.',
    voiceover:
      'In cross-border transit, two people need a fluid conversation. In Bilateral Dialogue mode, two speakers converse back and forth with automatic language detection.\n\nSpeaker 1 speaks in English, the device translates and speaks aloud in Swahili. When Speaker 2 replies in Swahili, Afrispeak translates back to English in real time, archiving an air-gapped transcript that can be exported locally.',
    pronunciationTip: 'Point cursor to Speaker 1 (Indigo) and Speaker 2 (Amber) cards to show clear turn-taking.',
    quickTriggerLabel: '⚡ Populate Dialogue Conversation'
  },
  {
    id: 4,
    timecode: '1:20 - 1:55',
    tab: 'copilot',
    title: 'The Edge Copilot (Trade & Medical Reasoning)',
    badge: 'Reasoning Beyond Translation',
    visualAction: 'Switch to Edge Copilot tab. Show Trade Arbitrage (50kg Arabica Coffee, $36.68 USDt saved under EAC STR), then Medical Triage (Emergency Red, pediatric dosage), then Voice-to-USDt Contract (SHA-256 seal).',
    voiceover:
      'Afrispeak goes far beyond simple translation. It is an autonomous edge intelligence copilot.\n\nIn Trade mode, it analyzes regional wholesale indices and applies East African Community duty rules—proving the trader qualifies for 0% customs duty under the 2,000-dollar threshold, while generating a ready-to-speak bargaining counter-offer in Swahili.\n\nIn Medical mode, it runs off-grid clinical triage based on WHO ETAT protocols. For a febrile child, it calculates weight-adjusted pediatric ORS and paracetamol dosing, issuing immediate caregiver instructions in the local tongue.\n\nFinally, it listens to spoken trade deals, extracting structured parameters and sealing them with a SHA-256 hash for offline Tether USDt settlement.',
    pronunciationTip: 'Emphasize "E-A-C Simplified Trade Regime" and "Tether U-S-D-T".',
    quickTriggerLabel: '⚡ Switch to Edge Copilot'
  },
  {
    id: 5,
    timecode: '1:55 - 2:15',
    tab: 'auditor',
    title: '0-Leak Network Packet Audit',
    badge: 'Audited Air-Gap',
    visualAction: 'Switch to Packet Audit tab. Highlight "External Packets Leaked: 0", 0 Inbound/Outbound bytes, 100% loopback. Mention QVAC doctor fallback.',
    voiceover:
      'To verify that zero data escapes the device, our built-in Air-Gap Auditor intercepts every browser request, mathematically proving zero external bytes left the laptop.\n\nUnder the hood, our architecture directly implements the official Tether QVAC SDK. By incorporating a dual-engine fallback, we resolve the Vulkan 1.3 worker crash identified during the hackathon, ensuring 100% uptime on any device with under 1.2 gigabytes of RAM.',
    pronunciationTip: 'Highlight the green/indigo "0 Leaks" badge and "Vulkan 1.3 worker crash resolution".',
    quickTriggerLabel: '⚡ Switch to Packet Audit'
  },
  {
    id: 6,
    timecode: '2:15 - 2:30',
    tab: 'workbench',
    title: 'Conclusion & Impact',
    badge: 'Digital Sovereignty',
    visualAction: 'Switch back to Studio hero view showing the Electric Indigo palette, offline status, and brand banner.',
    voiceover:
      'Afrispeak QVAC delivers true digital sovereignty to millions of cross-border merchants and healthcare workers across Africa. Zero network dependence, zero token fees, and complete privacy.\n\nOwn your AI with Tether QVAC and Afrispeak. Thank you.',
    pronunciationTip: 'Finish strong and confident right around 2 minutes 25 seconds.',
    quickTriggerLabel: '⚡ Return to Studio Hero View'
  }
];

export const PitchTeleprompter = ({
  activeTab,
  onSelectTab,
  onLoadWorkbenchDemo,
  onLoadDialogueDemo,
  isOpen,
  onToggleOpen
}: PitchTeleprompterProps) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const currentScene = SCENES[currentSceneIdx];

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNextScene = () => {
    if (currentSceneIdx < SCENES.length - 1) {
      const nextIdx = currentSceneIdx + 1;
      setCurrentSceneIdx(nextIdx);
      onSelectTab(SCENES[nextIdx].tab);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      const prevIdx = currentSceneIdx - 1;
      setCurrentSceneIdx(prevIdx);
      onSelectTab(SCENES[prevIdx].tab);
    }
  };

  const handleSelectScene = (idx: number) => {
    setCurrentSceneIdx(idx);
    onSelectTab(SCENES[idx].tab);
  };

  const handleQuickTrigger = () => {
    if (currentScene.id === 2) {
      // Scene 2: Load Trade Bargain in Swahili & speak
      onLoadWorkbenchDemo(
        'What is the final discounted price for this item? I want to buy two kilograms of fresh vegetables.',
        'en',
        'sw'
      );
    } else if (currentScene.id === 3) {
      // Scene 3: Load dialogue conversation
      onLoadDialogueDemo();
      onSelectTab('conversation');
    } else if (currentScene.id === 4) {
      onSelectTab('copilot');
    } else if (currentScene.id === 5) {
      onSelectTab('auditor');
    } else if (currentScene.id === 6) {
      onSelectTab('workbench');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="fixed bottom-5 right-5 z-50 bg-[#121622]/95 hover:bg-[#1a2133] border border-indigo-500/40 text-indigo-300 px-3.5 py-2 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.35)] flex items-center gap-2 text-xs font-semibold backdrop-blur-md cursor-pointer transition-all hover:scale-105"
        title="Open Screen-Recording Teleprompter & Pitch Script"
      >
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
        <span>🎬 Pitch Script & Teleprompter</span>
        <span className="font-mono text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-200">
          {formatTimer(seconds)}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-200 ${
        isExpanded
          ? 'inset-x-4 bottom-4 max-h-[85vh] bg-[#0c0f1a]/95 border border-indigo-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] p-5 flex flex-col backdrop-blur-xl'
          : 'bottom-4 right-4 w-[460px] bg-[#0c0f1a]/95 border border-indigo-500/40 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.7)] p-4 flex flex-col backdrop-blur-xl max-h-[75vh]'
      }`}
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Screen-Recording Teleprompter</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                AI Yako Track 1
              </span>
            </h3>
            <p className="text-[10px] text-neutral-400">
              Turnkey Teleprompter & 1-Click Demo Actions
            </p>
          </div>
        </div>

        {/* Stopwatch Controller */}
        <div className="flex items-center gap-1.5 bg-[#121622] px-2.5 py-1 rounded-lg border border-white/10">
          <span
            className={`font-mono text-xs font-bold ${
              seconds > 150 ? 'text-rose-400' : 'text-indigo-300'
            }`}
          >
            {formatTimer(seconds)}
          </span>
          <span className="text-neutral-600 text-[10px]">/ 2:30</span>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1 rounded hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
            title={isRunning ? 'Pause Timer' : 'Start Timer'}
          >
            {isRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}
            className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
            title={isExpanded ? 'Collapse View' : 'Expand View'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
            title="Minimize Teleprompter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scene Progress Navigation */}
      <div className="flex items-center justify-between gap-1 py-2.5 border-b border-white/[0.06] overflow-x-auto">
        {SCENES.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => handleSelectScene(idx)}
            className={`px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
              idx === currentSceneIdx
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'bg-white/5 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {scene.id}. {scene.timecode}
          </button>
        ))}
      </div>

      {/* Main Teleprompter Content */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3.5 text-xs">
        {/* Scene Title & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">
              Scene {currentScene.id}: {currentScene.title}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-semibold border border-indigo-500/30">
            {currentScene.badge}
          </span>
        </div>

        {/* Visual Cue */}
        <div className="bg-[#121622] rounded-xl p-3 border border-white/5 space-y-1">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <span>👁️ Visual On Screen:</span>
          </p>
          <p className="text-neutral-300 text-xs leading-relaxed">
            {currentScene.visualAction}
          </p>
        </div>

        {/* Voiceover Script (Teleprompter) */}
        <div className="bg-black/40 rounded-xl p-3.5 border border-indigo-500/20 space-y-1.5">
          <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
            <Mic className="w-3.5 h-3.5 text-indigo-400" />
            <span>Voiceover (Read Aloud with Screen Recording):</span>
          </p>
          <p className="text-neutral-100 text-sm leading-relaxed whitespace-pre-line font-normal selection:bg-indigo-500 selection:text-white">
            {currentScene.voiceover}
          </p>
        </div>

        {/* Pronunciation & Director Tip */}
        {currentScene.pronunciationTip && (
          <div className="p-2.5 rounded-lg bg-indigo-500/[0.07] border border-indigo-500/20 text-[11px] text-indigo-200 flex items-start gap-2">
            <span className="text-indigo-400 font-bold">Tip:</span>
            <span>{currentScene.pronunciationTip}</span>
          </div>
        )}
      </div>

      {/* Footer Navigation & 1-Click Trigger */}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-2">
        <button
          onClick={handlePrevScene}
          disabled={currentSceneIdx === 0}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        {currentScene.quickTriggerLabel && (
          <button
            onClick={handleQuickTrigger}
            className="flex-1 btn-primary-glow py-1.5 text-xs font-bold gap-1.5 cursor-pointer shadow-md justify-center"
          >
            <span>{currentScene.quickTriggerLabel}</span>
          </button>
        )}

        <button
          onClick={handleNextScene}
          disabled={currentSceneIdx === SCENES.length - 1}
          className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
