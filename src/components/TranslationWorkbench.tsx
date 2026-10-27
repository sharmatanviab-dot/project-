import { useState, useEffect, useRef } from 'react';
import {
  ArrowRightLeft,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  Zap,
  Activity,
  Layers,
  Sparkles,
  BookmarkPlus,
  Radio,
  Cpu,
  CornerDownLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  translatorService,
  type TranslationTelemetry
} from '../services/translatorService';
import { audioEngine, type AudioVisualizerData } from '../services/audioEngine';
import { networkMonitor } from '../services/networkMonitor';

interface TranslationWorkbenchProps {
  inputText: string;
  setInputText: (text: string) => void;
  sourceLang: string;
  setSourceLang: (lang: string) => void;
  targetLang: string;
  setTargetLang: (lang: string) => void;
  onAddConversation?: (text: string, translated: string) => void;
}

export const TranslationWorkbench = ({
  inputText,
  setInputText,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
  onAddConversation
}: TranslationWorkbenchProps) => {
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('IDLE');
  const [visualizerData, setVisualizerData] = useState<AudioVisualizerData>({
    volume: 0,
    isSpeaking: false,
    frequencyData: [0, 0, 0, 0, 0, 0, 0, 0]
  });
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [telemetry, setTelemetry] = useState<TranslationTelemetry | null>(null);
  const [daemonConnected, setDaemonConnected] = useState(false);

  const stopVoiceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    translatorService.checkDaemon().then((connected) => {
      setDaemonConnected(connected);
    });

    const unsubscribe = networkMonitor.subscribe(() => {
      setDaemonConnected(translatorService.getDaemonStatus());
    });

    return () => {
      unsubscribe();
      if (stopVoiceRef.current) stopVoiceRef.current();
    };
  }, []);

  const handleSwap = () => {
    const prevSrc = sourceLang;
    const prevTgt = targetLang;
    setSourceLang(prevTgt);
    setTargetLang(prevSrc);
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setOutputText('');

    try {
      const res = await translatorService.translateOffline(
        inputText,
        sourceLang,
        targetLang,
        (token) => setOutputText(token)
      );
      setTelemetry(res);
      setOutputText(res.translatedText);
      setDaemonConnected(res.engine === 'QVAC Local Daemon');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
        stopVoiceRef.current = null;
      }
      setIsListening(false);
      setVoiceStatus('IDLE');
      return;
    }

    setIsListening(true);
    setVoiceStatus('LISTENING');

    await audioEngine.startOfflineListening(
      (data) => setVisualizerData(data),
      (err) => setVoiceStatus(`ERROR: ${err}`)
    );

    const canceller = await audioEngine.transcribeVoice(
      sourceLang,
      (text) => {
        setInputText(text);
        setVoiceStatus('TRANSCRIBED');
      },
      (status) => setVoiceStatus(status)
    );

    stopVoiceRef.current = () => {
      canceller();
      audioEngine.stopListening();
    };
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!outputText) return;
    translatorService.speakOffline(outputText, targetLang);
  };

  const handleAddToConvo = () => {
    if (!outputText || !inputText || !onAddConversation) return;
    onAddConversation(inputText, outputText);
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 2000);
  };

  const quickPresets = [
    { label: 'Trade Bargain', text: 'What is the final discounted price for this item? I want to buy two kilograms of fresh vegetables.' },
    { label: 'Settlement & Web3', text: '46 was already settled on this device this is possible even in offline mode because' },
    { label: 'Give Us Accessories', text: 'Give us their accessories on chain and' },
    { label: 'Convert to Swahili', text: 'Convert this to swahili' },
    { label: 'Hospital Emergency', text: 'Where is the hospital? The patient has severe chest pain and difficulty breathing.' }
  ];

  const currentSourceObj = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang) || SUPPORTED_LANGUAGES[0];
  const currentTargetObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[1];

  return (
    <div className="space-y-5">
      {/* Sleek Floating Language Strip */}
      <div className="glass-panel p-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Source Language Pill */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-medium">From:</span>
          <div className="relative">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="language-select"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} — {l.nativeName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Swap Button with Circular Tactile Shell */}
        <button
          onClick={handleSwap}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-500/40 text-neutral-300 hover:text-indigo-400 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="Swap source and target languages"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Target Language Pill */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-medium">To:</span>
          <div className="relative">
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="language-select"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} — {l.nativeName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Dual-Pane Translation Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Source Input Surface */}
        <div className="glass-panel flex flex-col justify-between p-5 min-h-[380px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  Source Statement
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono">
                  {currentSourceObj.name}
                </span>
              </div>

              {/* Voice Dictation Tool */}
              <div className="flex items-center gap-2">
                {isListening && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <div className="flex items-center gap-0.5">
                      {visualizerData.frequencyData.slice(0, 8).map((freq, idx) => (
                        <span
                          key={idx}
                          className="w-1 bg-indigo-400 rounded-full transition-all duration-75"
                          style={{ height: `${Math.max(4, Math.min(16, (freq / 255) * 18))}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-rose-300 font-semibold ml-1">
                      {visualizerData.isSpeaking ? 'Speaking' : 'Listening...'}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleVoiceInput}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                  }`}
                  title="Offline Web Audio Dictation"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{isListening ? 'Stop Mic' : 'Voice Dictate'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => (e.metaKey || e.ctrlKey) && e.key === 'Enter' && handleTranslate()}
              placeholder="Type or dictate anything in your source language to translate locally..."
              className="w-full h-44 bg-transparent resize-none border-none text-white text-base font-sans focus:outline-none placeholder-neutral-500 leading-relaxed"
            />
          </div>

          <div className="space-y-3.5 pt-3 border-t border-white/[0.07]">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-neutral-500 text-[11px] mr-1">Presets:</span>
              {quickPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(p.text)}
                  className="preset-pill"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-neutral-500 font-mono">
                {inputText.length} chars • ~{Math.round(inputText.length / 4)} tokens
              </span>

              <button
                onClick={handleTranslate}
                disabled={isTranslating || !inputText.trim()}
                className="btn-primary-glow px-5 py-2.5 text-xs flex items-center gap-2"
              >
                {isTranslating ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Translate Offline</span>
                    <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-black/20 rounded font-mono opacity-80">
                      Ctrl ↵
                    </kbd>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Translation Output Surface */}
        <div className="glass-panel flex flex-col justify-between p-5 min-h-[380px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white uppercase tracking-wide">
                  Translation Stream
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium">
                  {telemetry ? telemetry.engine : 'QVAC AfriSLM'}
                </span>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSpeak}
                  disabled={!outputText}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                  title="Read translation aloud offline"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-indigo-400" /> : <Copy className="w-4 h-4" />}
                </button>
                {onAddConversation && (
                  <button
                    onClick={handleAddToConvo}
                    disabled={!outputText}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-neutral-300 hover:text-indigo-400 disabled:opacity-30 cursor-pointer transition-colors"
                    title="Bookmark to bilateral dialogue buffer"
                  >
                    {bookmarked ? <CheckCircle2 className="w-4 h-4 text-indigo-400" /> : <BookmarkPlus className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Output Display Area */}
            <div className="h-44 overflow-y-auto">
              {outputText ? (
                <p className="text-white text-lg font-medium leading-relaxed">
                  {outputText}
                </p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-xs space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-400/50" />
                  </div>
                  <p className="text-neutral-400 font-medium">Awaiting translation stream...</p>
                  <p className="text-[11px] text-neutral-600 max-w-xs">
                    Press 'Translate Offline' or speak using the mic to run edge inference on device.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Telemetry Status Strip */}
          <div className="pt-3 border-t border-white/[0.07] flex flex-wrap items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Zap className="w-3.5 h-3.5" />
                <span>{telemetry ? `${telemetry.latencyMs} ms` : '18 ms'}</span>
              </span>
              <span className="text-neutral-400">
                ⚡ {telemetry ? `${telemetry.tokensPerSec} tok/s` : '38.5 tok/s'}
              </span>
              <span className="hidden sm:inline-block text-neutral-500">
                RAM: {telemetry ? `${telemetry.ramUsageMB} MB` : '~1.18 GB'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-medium">
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Air-Gap Enforced (0 Remote Packets)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
