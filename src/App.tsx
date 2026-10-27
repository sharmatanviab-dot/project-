import { useState } from 'react';
import { Header, type AppTab } from './components/Header';
import { TranslationWorkbench } from './components/TranslationWorkbench';
import { ConversationMode } from './components/ConversationMode';
import { EdgeCopilot } from './components/EdgeCopilot';
import { PhrasebookDrawer } from './components/PhrasebookDrawer';
import { HardwareTelemetry } from './components/HardwareTelemetry';
import { NetworkAuditView } from './components/NetworkAuditView';
import { PitchTeleprompter } from './components/PitchTeleprompter';
import { translatorService, type ConversationMessage } from './services/translatorService';
import { ShieldCheck, Cpu, HardDrive, Video } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('workbench');
  const [isPitchHUDOpen, setIsPitchHUDOpen] = useState(false);

  // State management for translator studio
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('sw');
  const [inputText, setInputText] = useState(
    'What is the final discounted price for this item? I want to buy two kilograms of fresh vegetables.'
  );

  // Persistent bilateral conversation messages
  const [conversation, setConversation] = useState<ConversationMessage[]>(
    translatorService.getConversation()
  );

  const handleSelectPhrase = (phraseText: string, lang: string) => {
    setInputText(phraseText);
    setSourceLang(lang);
    setActiveTab('workbench');
  };

  const handleAddConversation = (srcText: string, transText: string) => {
    const msg = translatorService.addConversationMessage({
      speaker: 'user_a',
      speakerLabel: 'Speaker 1 (Saved Translation)',
      sourceLang,
      targetLang,
      sourceText: srcText,
      translatedText: transText,
      engine: translatorService.getDaemonStatus()
        ? 'QVAC Local Daemon (:8080)'
        : 'TranslatePsy-AfriSLM (In-Memory Neural Engine)'
    });
    setConversation((prev) => [...prev, msg]);
  };

  const handleAddDirectMessage = (msg: Omit<ConversationMessage, 'id' | 'timestamp'>) => {
    const full = translatorService.addConversationMessage(msg);
    setConversation((prev) => [...prev, full]);
  };

  const handleClearConversation = () => {
    translatorService.clearConversation();
    setConversation([]);
  };

  const handleLoadWorkbenchDemo = (text: string, src: string, target: string) => {
    setInputText(text);
    setSourceLang(src);
    setTargetLang(target);
    setActiveTab('workbench');
    setTimeout(() => {
      translatorService.speakOffline('Bei ya mwisho iliyopunguzwa ni ipi kwa bidhaa hii? Ninataka kununua kilo mbili za mboga mbichi.', 'sw');
    }, 500);
  };

  const handleLoadDialogueDemo = () => {
    translatorService.clearConversation();
    const m1 = translatorService.addConversationMessage({
      speaker: 'user_a',
      speakerLabel: 'Speaker 1 (Trade Officer)',
      sourceLang: 'en',
      targetLang: 'sw',
      sourceText: 'We have arrived at the Busia border checkpoint. Where are the customs inspection documents?',
      translatedText: 'Tumefika katika kituo cha ukaguzi cha mpaka wa Busia. Yako wapi stakabadhi za forodha?',
      engine: 'TranslatePsy-AfriSLM (In-Memory Neural Engine)'
    });
    const m2 = translatorService.addConversationMessage({
      speaker: 'user_b',
      speakerLabel: 'Speaker 2 (Truck Driver)',
      sourceLang: 'sw',
      targetLang: 'en',
      sourceText: 'Niko hapa kwenye soko, nina vibali vyote vya EAC vya kusafirisha mahindi.',
      translatedText: 'I am here at the market, I have all the EAC transit permits for transporting maize.',
      engine: 'TranslatePsy-AfriSLM (In-Memory Neural Engine)'
    });
    setConversation([m1, m2]);
  };

  return (
    <div className="min-h-screen bg-[#080a12] text-white flex flex-col font-sans selection:bg-indigo-500/35 selection:text-white">
      {/* Sleek Segmented Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-5">
        {/* Modern Context Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">AI Yako Hackathon</span>
            <span className="text-neutral-600">•</span>
            <span className="text-indigo-400 font-medium">Tether QVAC Ecosystem & Node NBO</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">Track 1: Offline AI Apps</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edge Spec: 4GB RAM • Laptop / Android / Pi 5</span>
            </span>
            <span className="text-neutral-600">•</span>
            <button
              onClick={() => setIsPitchHUDOpen(!isPitchHUDOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/35 text-indigo-300 font-semibold cursor-pointer transition-all hover:scale-105"
            >
              <Video className="w-3.5 h-3.5 text-indigo-400" />
              <span>🎬 Pitch Teleprompter</span>
            </button>
            <span className="flex items-center gap-1 text-indigo-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Cloud Dependency</span>
            </span>
          </div>
        </div>

        {/* Tab 01: Translator Studio Workbench */}
        {activeTab === 'workbench' && (
          <TranslationWorkbench
            inputText={inputText}
            setInputText={setInputText}
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            targetLang={targetLang}
            setTargetLang={setTargetLang}
            onAddConversation={handleAddConversation}
          />
        )}

        {/* Tab 02: Bilateral Multi-Speaker Dialogue Mode */}
        {activeTab === 'conversation' && (
          <ConversationMode
            conversation={conversation}
            onAddMessage={handleAddDirectMessage}
            onClearConversation={handleClearConversation}
          />
        )}

        {/* Tab 03: Autonomous Offline Edge Copilot (Trade Arbitrage, Medical Triage, Voice Contract) */}
        {activeTab === 'copilot' && (
          <EdgeCopilot />
        )}

        {/* Tab 04: Full 30+ Phrase Matrix */}
        {activeTab === 'phrasebook' && (
          <PhrasebookDrawer onSelectPhrase={handleSelectPhrase} />
        )}

        {/* Tab 04: QVAC Hardware Telemetry & Daemon Setup */}
        {activeTab === 'hardware' && (
          <HardwareTelemetry />
        )}

        {/* Tab 05: Dedicated Packet Audit View */}
        {activeTab === 'auditor' && (
          <NetworkAuditView />
        )}
      </main>

      {/* Refined Minimalist Footer */}
      <footer className="border-t border-white/[0.07] bg-[#08090d]/80 py-4 px-6 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-4 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Afrispeak QVAC</span>
          <span className="text-neutral-600">•</span>
          <span>Sovereign Offline Pan-African Neural Translation Bridge</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-neutral-400">
          <span>Port: 5176</span>
          <span>Loopback: 127.0.0.1:8080</span>
          <span className="text-indigo-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Air-Gap Verified
          </span>
        </div>
      </footer>

      {/* On-Screen Screen-Recording Pitch Teleprompter HUD */}
      <PitchTeleprompter
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLoadWorkbenchDemo={handleLoadWorkbenchDemo}
        onLoadDialogueDemo={handleLoadDialogueDemo}
        isOpen={isPitchHUDOpen}
        onToggleOpen={() => setIsPitchHUDOpen(!isPitchHUDOpen)}
      />
    </div>
  );
}
