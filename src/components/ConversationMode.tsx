import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Volume2,
  Trash2,
  Download,
  ShieldCheck,
  User,
  Users,
  Mic,
  MicOff,
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  translatorService,
  type ConversationMessage
} from '../services/translatorService';
import { audioEngine, type AudioVisualizerData } from '../services/audioEngine';

interface ConversationModeProps {
  conversation: ConversationMessage[];
  onAddMessage: (msg: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  onClearConversation: () => void;
}

function detectInputLanguage(text: string): 'en' | 'am' | 'sw' | 'yo' | 'ha' | null {
  const lower = text.toLowerCase().trim();

  // 1. Amharic Ge'ez script check
  if (/[\u1200-\u137F]/.test(text)) {
    return 'am';
  }

  // 2. Yoruba markers or accents
  if (/[ẹọṣáàéèíìóòúù]/.test(lower) || /\b(bawo|báwo|kini|kí ni|níbo|oogun|ounjẹ|igbó|àwọn|wọn|ṣe|lọ|wá)\b/i.test(lower)) {
    return 'yo';
  }

  // 3. Swahili specific markers
  if (/\b(habari|hujambo|jambo|asante|kwaheri|ndiyo|hapana|tafadhali|kituo|basi|polisi|maji|chakula|homa|pesa|kifaa|vifaa|mnyororo|badilisha|tupe|nipe|ilikuwa|tayari|imekamilika|hali|bila|mtandao|salama|soko|duka|daktari|zahanati)\b/i.test(lower)) {
    return 'sw';
  }

  // 4. Hausa specific markers
  if (/\b(sannu|ina|kwana|yake|take|wannan|kudin|asibiti|taimako|ruwa|abinci|magani|daji|fili|na gode|don allah|sai an jima)\b/i.test(lower)) {
    return 'ha';
  }

  // 5. English specific markers
  if (/\b(the|is|are|was|were|this|that|these|those|have|has|had|will|would|can|could|give|us|our|their|them|accessories|accessory|chain|settled|settle|device|offline|mode|online|convert|to|in|on|at|and|or|but|because|where|what|when|why|how|who|which|please|thank|thanks|you|we|they|hi|hello|hey|good|morning|afternoon|evening)\b/i.test(lower)) {
    return 'en';
  }

  return null;
}

export const ConversationMode = ({
  conversation,
  onAddMessage,
  onClearConversation
}: ConversationModeProps) => {
  const [activeSpeaker, setActiveSpeaker] = useState<'user_a' | 'user_b'>('user_a');
  const [speakerALang, setSpeakerALang] = useState('en'); // Host: English
  const [speakerBLang, setSpeakerBLang] = useState('sw'); // Partner: Swahili
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);

  // Voice Dictation State
  const [isDictating, setIsDictating] = useState(false);
  const [dictationStatus, setDictationStatus] = useState('IDLE');
  const [visualizerData, setVisualizerData] = useState<AudioVisualizerData>({
    volume: 0,
    isSpeaking: false,
    frequencyData: [0, 0, 0, 0, 0, 0, 0, 0]
  });
  const stopVoiceRef = useRef<(() => void) | null>(null);

  const currentSpeakerLang = activeSpeaker === 'user_a' ? speakerALang : speakerBLang;
  const targetSpeakerLang = activeSpeaker === 'user_a' ? speakerBLang : speakerALang;

  useEffect(() => {
    return () => {
      if (stopVoiceRef.current) stopVoiceRef.current();
    };
  }, []);

  const handleSwapSpeakers = () => {
    setActiveSpeaker((prev) => (prev === 'user_a' ? 'user_b' : 'user_a'));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;
    setIsProcessing(true);

    try {
      let finalSourceLang = currentSpeakerLang;
      let finalTargetLang = targetSpeakerLang;
      let finalSpeaker = activeSpeaker;

      // Smart Language Auto-Routing:
      // If user is set to Partner [SW -> EN] but types in English,
      // route as English -> Swahili so it translates properly without user friction!
      if (autoDetect) {
        const detected = detectInputLanguage(text);
        if (detected === 'en' && currentSpeakerLang !== 'en') {
          finalSourceLang = 'en';
          finalTargetLang = currentSpeakerLang;
          finalSpeaker = 'user_a';
        } else if (detected && detected !== 'en' && currentSpeakerLang === 'en') {
          finalSourceLang = detected;
          finalTargetLang = 'en';
          finalSpeaker = 'user_b';
        }
      }

      const res = await translatorService.translateOffline(
        text,
        finalSourceLang,
        finalTargetLang
      );

      onAddMessage({
        speaker: finalSpeaker,
        speakerLabel: finalSpeaker === 'user_a' ? 'Speaker 1 (Host)' : 'Speaker 2 (Partner)',
        sourceLang: finalSourceLang,
        targetLang: finalTargetLang,
        sourceText: text,
        translatedText: res.translatedText,
        engine: res.engine
      });

      setInputText('');
      // Alternate speaker for natural two-way conversation flow
      setActiveSpeaker((prev) => (prev === 'user_a' ? 'user_b' : 'user_a'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceDictation = async () => {
    if (isDictating) {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
        stopVoiceRef.current = null;
      }
      setIsDictating(false);
      setDictationStatus('IDLE');
      return;
    }

    setIsDictating(true);
    setDictationStatus(`Listening [${currentSpeakerLang.toUpperCase()}]...`);

    await audioEngine.startOfflineListening(
      (data) => setVisualizerData(data),
      (err) => setDictationStatus(`Mic error: ${err}`)
    );

    const canceller = await audioEngine.transcribeVoice(
      currentSpeakerLang,
      (transcribedText) => {
        setInputText(transcribedText);
        setDictationStatus('Transcribed');
      },
      (status) => setDictationStatus(status)
    );

    stopVoiceRef.current = () => {
      canceller();
      audioEngine.stopListening();
    };
  };

  const handleSpeak = (text: string, lang: string) => {
    translatorService.speakOffline(text, lang);
  };

  const handleExportTranscript = () => {
    const text = conversation
      .map(
        (m) =>
          `[${m.timestamp}] ${m.speakerLabel} (${m.sourceLang.toUpperCase()} → ${m.targetLang.toUpperCase()}):\nOriginal:   ${m.sourceText}\nTranslated: ${m.translatedText}\n`
      )
      .join('\n---\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afrispeak_transcript_${Date.now()}.txt`;
    a.click();
  };

  const currentSpeakerObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentSpeakerLang) || SUPPORTED_LANGUAGES[0];
  const targetSpeakerObj = SUPPORTED_LANGUAGES.find((l) => l.code === targetSpeakerLang) || SUPPORTED_LANGUAGES[1];

  return (
    <div className="glass-panel p-6 space-y-6">
      {/* Dialogue Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Bilateral Dialogue Terminal
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Two-Way Air-Gapped Audio
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 font-normal">
            Natural spoken and written conversation between cross-border traders, clinics, and transit officers.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:border-white/20 transition-colors">
            <input
              type="checkbox"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
              className="rounded accent-indigo-500 cursor-pointer"
            />
            <span>Auto-detect Language</span>
          </label>
          <button
            onClick={handleExportTranscript}
            disabled={conversation.length === 0}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 border border-white/10 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export</span>
          </button>
          <button
            onClick={onClearConversation}
            disabled={conversation.length === 0}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 disabled:opacity-30 border border-white/10 cursor-pointer transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Speaker Cards & Direction Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Speaker 1 Card (Host) */}
        <div
          onClick={() => setActiveSpeaker('user_a')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
            activeSpeaker === 'user_a'
              ? 'border-indigo-500/50 bg-indigo-500/[0.06] shadow-[0_0_24px_rgba(99,102,241,0.18)]'
              : 'border-white/[0.07] bg-[#121622]/60 hover:border-white/15'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${activeSpeaker === 'user_a' ? 'bg-indigo-400 animate-pulse' : 'bg-neutral-600'}`}></span>
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                Speaker 1 (Host / You)
              </span>
            </div>
            {activeSpeaker === 'user_a' && (
              <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-full border border-indigo-500/30">
                Active Turn
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.07]">
            <span className="text-xs text-neutral-400">Language:</span>
            <select
              value={speakerALang}
              onChange={(e) => setSpeakerALang(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="language-select text-xs py-1 px-2.5"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Speaker 2 Card (Partner) */}
        <div
          onClick={() => setActiveSpeaker('user_b')}
          className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
            activeSpeaker === 'user_b'
              ? 'border-amber-500/50 bg-amber-500/[0.06] shadow-[0_0_24px_rgba(245,158,11,0.12)]'
              : 'border-white/[0.07] bg-[#121622]/60 hover:border-white/15'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${activeSpeaker === 'user_b' ? 'bg-amber-400 animate-pulse' : 'bg-neutral-600'}`}></span>
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                Speaker 2 (Partner / Trader)
              </span>
            </div>
            {activeSpeaker === 'user_b' && (
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                Active Turn
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.07]">
            <span className="text-xs text-neutral-400">Language:</span>
            <select
              value={speakerBLang}
              onChange={(e) => setSpeakerBLang(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="language-select text-xs py-1 px-2.5"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Live Conversation Stream Box */}
      <div className="h-96 overflow-y-auto space-y-3.5 p-4 bg-[#0a0d14] rounded-xl border border-white/[0.07]">
        {conversation.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-xs space-y-2 text-center">
            <Users className="w-9 h-9 text-emerald-500/30" />
            <p className="text-neutral-300 font-semibold text-sm">Dialogue Buffer Ready</p>
            <p className="text-neutral-500 text-xs max-w-sm">
              Type or dictate below in {currentSpeakerObj.name}. The neural engine translates and reads aloud to your counterpart in {targetSpeakerObj.name}.
            </p>
          </div>
        ) : (
          conversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] space-y-2 p-4 rounded-xl border transition-all ${
                msg.speaker === 'user_a'
                  ? 'ml-auto bg-emerald-500/[0.08] border-emerald-500/30 text-white shadow-sm'
                  : 'mr-auto bg-[#141926] border-amber-500/30 text-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-xs border-b border-white/[0.08] pb-1.5">
                <span className={`font-semibold ${msg.speaker === 'user_a' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {msg.speakerLabel} [{msg.sourceLang.toUpperCase()} → {msg.targetLang.toUpperCase()}]
                </span>
                <span className="text-neutral-500 font-mono text-[11px]">{msg.timestamp}</span>
              </div>

              {/* Source Original Text */}
              <div className="text-xs text-neutral-400 italic">
                <span>"{msg.sourceText}"</span>
              </div>

              {/* Translated Output */}
              <div className="flex items-start justify-between gap-3 pt-1 border-t border-white/[0.05]">
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {msg.translatedText}
                </p>
                <button
                  onClick={() => handleSpeak(msg.translatedText, msg.targetLang)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer shrink-0 transition-colors"
                  title="Speak translation offline"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Composer Strip */}
      <div className="space-y-3">
        {/* Audio Waveform Meter when dictating */}
        {isDictating && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-xs text-rose-300 font-semibold font-mono">
                {dictationStatus}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {visualizerData.frequencyData.slice(0, 10).map((freq, idx) => (
                <span
                  key={idx}
                  className="w-1.5 bg-emerald-400 rounded-full transition-all duration-75"
                  style={{ height: `${Math.max(4, Math.min(22, (freq / 255) * 26))}px` }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {/* Swap Speaker Turn Button */}
          <button
            onClick={handleSwapSpeakers}
            className="px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-all"
            title="Switch who is speaking"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Swap Turn</span>
          </button>

          {/* Voice Dictate Button */}
          <button
            onClick={handleVoiceDictation}
            className={`px-4 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              isDictating
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
            }`}
            title="Click to dictate offline using Web Audio microphone"
          >
            {isDictating ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
            <span className="text-xs font-bold">
              {isDictating ? 'Stop' : 'Voice Dictate'}
            </span>
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Speak or type message in ${currentSpeakerObj.name}...`}
              className="w-full bg-[#121622] border border-white/10 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          {/* Send Action */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isProcessing || !inputText.trim()}
            className="btn-primary-glow disabled:opacity-40 px-5 py-3 rounded-xl flex items-center gap-2 text-xs"
          >
            <Send className="w-4 h-4" />
            <span>{isProcessing ? 'Translating...' : 'Send'}</span>
          </button>
        </div>
      </div>

      {/* Security & Airgap Footnote */}
      <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 border-t border-white/[0.07] pt-3">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Air-Gap Sovereignty: All audio and tokens processed locally on device</span>
        </span>
        <span className="text-neutral-500">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 font-mono text-[10px]">Enter ↵</kbd> to translate & send
        </span>
      </div>
    </div>
  );
};
