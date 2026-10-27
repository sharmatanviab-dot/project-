import { useState } from 'react';
import {
  BrainCircuit,
  TrendingUp,
  Stethoscope,
  FileCheck2,
  Volume2,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Download,
  Sparkles,
  RefreshCw,
  Scale
} from 'lucide-react';
import {
  copilotEngine,
  type TradeAnalysisRequest,
  type TradeAnalysisResult,
  type MedicalTriageRequest,
  type MedicalTriageResult,
  type TradeContract
} from '../services/copilotEngine';
import { translatorService, SUPPORTED_LANGUAGES } from '../services/translatorService';

export const EdgeCopilot = () => {
  const [activeMode, setActiveMode] = useState<'trade' | 'medical' | 'contract'>('trade');

  // 1. Trade State
  const [commodity, setCommodity] = useState('Arabica Coffee');
  const [quantity, setQuantity] = useState(50);
  const [unit, setUnit] = useState('kg');
  const [offeredPrice, setOfferedPrice] = useState(380);
  const [currency, setCurrency] = useState<'KES' | 'UGX' | 'TZS' | 'ETB' | 'NGN' | 'USDt'>('KES');
  const [borderCrossing, setBorderCrossing] = useState('Busia Border Checkpoint (KE-UG)');
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');
  const [counterpartyLang, setCounterpartyLang] = useState<'sw' | 'am' | 'yo' | 'ha' | 'en'>('sw');
  const [tradeResult, setTradeResult] = useState<TradeAnalysisResult | null>(null);

  // 2. Medical State
  const [patientAge, setPatientAge] = useState(4);
  const [patientWeight, setPatientWeight] = useState(16);
  const [hasFever, setHasFever] = useState(true);
  const [tempCelsius, setTempCelsius] = useState(39.2);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'High Fever > 39°C',
    'Sunken Eyes / Dehydration',
    'Cannot Drink Fluids'
  ]);
  const [patientLang, setPatientLang] = useState<'sw' | 'am' | 'yo' | 'ha' | 'en'>('sw');
  const [triageResult, setTriageResult] = useState<MedicalTriageResult | null>(null);

  // 3. Contract State
  const [contractTranscript, setContractTranscript] = useState(
    'Agreed with merchant Juma at Busia border to supply 25 bags of yellow maize for 750 USDt, delivery scheduled for Thursday morning, payable via Tether USDt P2P.'
  );
  const [contractResult, setContractResult] = useState<TradeContract | null>(null);

  // Interaction feedback states
  const [copiedTrade, setCopiedTrade] = useState(false);
  const [copiedTriage, setCopiedTriage] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);

  // Handlers
  const handleRunTradeAnalysis = () => {
    const res = copilotEngine.analyzeTrade({
      commodity,
      quantity,
      unit,
      offeredPrice,
      currency,
      borderCrossing,
      role,
      counterpartyLang
    });
    setTradeResult(res);
  };

  const handleRunMedicalTriage = () => {
    const res = copilotEngine.triageMedical({
      patientAgeYears: patientAge,
      patientWeightKg: patientWeight,
      gender: 'female',
      primarySymptoms: selectedSymptoms,
      durationDays: 2,
      hasFever,
      tempCelsius,
      patientLang
    });
    setTriageResult(res);
  };

  const handleExtractContract = () => {
    const res = copilotEngine.extractContract(contractTranscript);
    setContractResult(res);
  };

  const handleSpeakText = (text: string, lang: string) => {
    translatorService.speakOffline(text, lang);
  };

  const handleExportContract = () => {
    if (!contractResult) return;
    const text = `AFRISPEAK SOVEREIGN TRADE VOUCHER\nContract ID: ${contractResult.contractId}\nTimestamp: ${contractResult.timestamp}\nBuyer: ${contractResult.buyer}\nSeller: ${contractResult.seller}\nCommodity: ${contractResult.commodity} (${contractResult.quantity})\nTotal Settlement: ${contractResult.totalPriceUSDt} USDt\nBorder Point: ${contractResult.borderPoint}\nSHA-256 Seal: ${contractResult.sha256Seal}\nQR Payload: ${contractResult.qrPayload}\n`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract_${contractResult.contractId}.txt`;
    a.click();
  };

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const availableSymptoms = [
    'High Fever > 39°C',
    'Convulsions / Fits',
    'Cannot Drink Fluids',
    'Vomiting Everything',
    'Stiff Neck',
    'Chest Indrawing / Rapid Breathing',
    'Sunken Eyes / Dehydration',
    'Blood in Stool',
    'Persistent Cough > 2 Weeks'
  ];

  return (
    <div className="space-y-6">
      {/* Copilot Mode Segmented Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveMode('trade')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            activeMode === 'trade'
              ? 'bg-indigo-500/[0.12] border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
              : 'bg-[#121622]/80 hover:bg-[#161c2a] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${activeMode === 'trade' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-neutral-400'}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trade & Tariff Arbitrage</p>
              <p className="text-[11px] text-neutral-400">EAC STR rules, wholesale FX, counter-offers</p>
            </div>
          </div>
          {activeMode === 'trade' && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>}
        </button>

        <button
          onClick={() => setActiveMode('medical')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            activeMode === 'medical'
              ? 'bg-rose-500/[0.12] border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'bg-[#121622]/80 hover:bg-[#161c2a] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${activeMode === 'medical' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-neutral-400'}`}>
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Emergency Clinical Triage</p>
              <p className="text-[11px] text-neutral-400">WHO ETAT protocol, pediatric dosage & advice</p>
            </div>
          </div>
          {activeMode === 'medical' && <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>}
        </button>

        <button
          onClick={() => setActiveMode('contract')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            activeMode === 'contract'
              ? 'bg-amber-500/[0.12] border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
              : 'bg-[#121622]/80 hover:bg-[#161c2a] border-white/[0.08]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${activeMode === 'contract' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-neutral-400'}`}>
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Voice-to-USDt Contract</p>
              <p className="text-[11px] text-neutral-400">Structured agreement & SHA-256 seal</p>
            </div>
          </div>
          {activeMode === 'contract' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>}
        </button>
      </div>

      {/* ================= MODE 1: TRADE & TARIFF ARBITRAGE ================= */}
      {activeMode === 'trade' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Input Form Panel */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Cross-Border Deal Parameters
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-semibold border border-indigo-500/30">
                  EAC / COMESA Mode
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">100% Offline Model</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Commodity:</label>
                <input
                  type="text"
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Your Role:</label>
                <div className="flex rounded-lg overflow-hidden border border-white/10 p-0.5 bg-[#121622]">
                  <button
                    onClick={() => setRole('seller')}
                    className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${role === 'seller' ? 'bg-indigo-500/30 text-indigo-300' : 'text-neutral-400'}`}
                  >
                    Seller
                  </button>
                  <button
                    onClick={() => setRole('buyer')}
                    className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${role === 'buyer' ? 'bg-indigo-500/30 text-indigo-300' : 'text-neutral-400'}`}
                  >
                    Buyer
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Quantity ({unit}):</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Unit:</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="language-select w-full"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="bags">Bags (90kg)</option>
                  <option value="tons">Metric Tons</option>
                  <option value="pieces">Pieces / Apparel</option>
                  <option value="crates">Crates / Boxes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Offered Price (Per {unit}):</label>
                <input
                  type="number"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(Number(e.target.value))}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Settlement Currency:</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="language-select w-full"
                >
                  <option value="KES">KES (Kenya Shillings)</option>
                  <option value="UGX">UGX (Uganda Shillings)</option>
                  <option value="TZS">TZS (Tanzania Shillings)</option>
                  <option value="ETB">ETB (Ethiopian Birr)</option>
                  <option value="NGN">NGN (Nigerian Naira)</option>
                  <option value="USDt">USDt (Tether Stablecoin)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-neutral-400 font-medium">Border Checkpoint:</label>
              <select
                value={borderCrossing}
                onChange={(e) => setBorderCrossing(e.target.value)}
                className="language-select w-full"
              >
                <option value="Busia Border Checkpoint (KE-UG)">Busia Border (Kenya ⇄ Uganda)</option>
                <option value="Namanga Border (KE-TZ)">Namanga Border (Kenya ⇄ Tanzania)</option>
                <option value="Malaba Border (KE-UG)">Malaba Border (Kenya ⇄ Uganda)</option>
                <option value="Moyale Border (KE-ET)">Moyale Border (Kenya ⇄ Ethiopia)</option>
                <option value="Seme Border (NG-BJ)">Seme Border (Nigeria ⇄ Benin)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-neutral-400 font-medium">Counterparty Spoken Language:</label>
              <select
                value={counterpartyLang}
                onChange={(e) => setCounterpartyLang(e.target.value as any)}
                className="language-select w-full"
              >
                <option value="sw">Swahili (Kiswahili) — East Africa</option>
                <option value="am">Amharic (አማርኛ) — Ethiopia / Moyale</option>
                <option value="yo">Yoruba (Èdè Yorùbá) — Nigeria / West Africa</option>
                <option value="ha">Hausa (Harshen Hausa) — Sahel / West Africa</option>
                <option value="en">English — Lingua Franca</option>
              </select>
            </div>

            <button
              onClick={handleRunTradeAnalysis}
              className="w-full btn-primary-glow py-2.5 text-xs font-bold gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Trade & Formulate Counter-Offer</span>
            </button>
          </div>

          {/* Reasoning & Strategy Output Panel */}
          <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
            {tradeResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Arbitrage & Negotiation Advice
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ID: {tradeResult.tradeId}
                    </span>
                  </div>

                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    tradeResult.recommendation === 'ACCEPT'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : tradeResult.recommendation === 'COUNTER_OFFER'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  }`}>
                    {tradeResult.recommendation === 'COUNTER_OFFER' ? '⚡ Strategic Counter-Offer' : tradeResult.recommendation}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-[#121622] rounded-lg border border-white/5 space-y-0.5">
                    <p className="text-[10px] text-neutral-500 font-medium">USDt Equivalent</p>
                    <p className="text-sm font-bold text-white">${tradeResult.usdEquivalent.toFixed(2)}</p>
                    <p className="text-[10px] text-indigo-400">
                      {tradeResult.isStrEligible ? 'EAC STR Duty-Free (<$2k)' : 'Standard Commercial'}
                    </p>
                  </div>

                  <div className="p-3 bg-[#121622] rounded-lg border border-white/5 space-y-0.5">
                    <p className="text-[10px] text-neutral-500 font-medium">Customs Duty</p>
                    <p className="text-sm font-bold text-emerald-400">{tradeResult.estimatedTariffPct}%</p>
                    <p className="text-[10px] text-neutral-400">Saved: ${tradeResult.dutySavingsUSDt} USDt</p>
                  </div>

                  <div className="p-3 bg-[#121622] rounded-lg border border-white/5 space-y-0.5">
                    <p className="text-[10px] text-neutral-500 font-medium">Wholesale Index</p>
                    <p className="text-sm font-bold text-white">
                      {tradeResult.fairPriceRange.min.toLocaleString()} - {tradeResult.fairPriceRange.max.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-neutral-500">{currency} / {unit}</p>
                  </div>
                </div>

                {/* Rationale */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs space-y-1">
                  <span className="font-semibold text-neutral-300">Strategic Rationale:</span>
                  <p className="text-neutral-400 leading-relaxed">{tradeResult.strategicRationale}</p>
                </div>

                {/* Counterparty Negotiation Script */}
                <div className="space-y-2 p-3.5 rounded-xl bg-indigo-500/[0.06] border border-indigo-500/25">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-indigo-400" />
                      <span>Ready-to-Speak Negotiation Script ({counterpartyLang.toUpperCase()}):</span>
                    </span>
                    <button
                      onClick={() => handleSpeakText(tradeResult.counterOfferScriptNative, counterpartyLang)}
                      className="px-2.5 py-1 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-semibold text-[11px] border border-indigo-500/35 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Voice Offline</span>
                    </button>
                  </div>
                  <p className="text-sm font-medium text-white italic">"{tradeResult.counterOfferScriptNative}"</p>
                  <p className="text-xs text-neutral-400 border-t border-white/5 pt-1.5">En: "{tradeResult.counterOfferScriptEn}"</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-500 space-y-3">
                <Scale className="w-10 h-10 text-indigo-400/40" />
                <p className="text-sm font-semibold text-neutral-300">Offline Trade Copilot Ready</p>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Enter deal parameters on the left and click 'Evaluate Trade'. The edge model will check border duty exemptions, compute wholesale price bands, and generate a native counter-offer script.
                </p>
              </div>
            )}

            <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>Latency: {tradeResult ? `${tradeResult.latencyMs} ms` : '14 ms'}</span>
              <span>Tokens: {tradeResult ? `${tradeResult.tokensProcessed}` : '0'}</span>
              <span className="text-indigo-400 font-medium">Air-Gap Isolated</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: CLINICAL EMERGENCY TRIAGE ================= */}
      {activeMode === 'medical' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Medical Input Form */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Patient Presentation (Triage)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 font-semibold border border-rose-500/30">
                  WHO ETAT Protocol
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">Zero Cloud Network</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Age (Years):</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => {
                    const a = Number(e.target.value);
                    setPatientAge(a);
                    setPatientWeight((a * 2) + 8);
                  }}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Weight (kg):</label>
                <input
                  type="number"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(Number(e.target.value))}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Temperature (°C):</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempCelsius}
                  onChange={(e) => setTempCelsius(Number(e.target.value))}
                  className="w-full bg-[#151a26] border border-white/10 rounded-lg px-3 py-1.5 text-white font-medium focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 font-medium">Patient / Family Language:</label>
                <select
                  value={patientLang}
                  onChange={(e) => setPatientLang(e.target.value as any)}
                  className="language-select w-full"
                >
                  <option value="sw">Swahili (Kiswahili)</option>
                  <option value="am">Amharic (አማርኛ)</option>
                  <option value="yo">Yoruba (Èdè Yorùbá)</option>
                  <option value="ha">Hausa (Harshen Hausa)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            {/* Symptoms Tag Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 font-medium">Observed Danger Signs & Symptoms:</label>
              <div className="flex flex-wrap gap-1.5">
                {availableSymptoms.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      onClick={() => toggleSymptom(sym)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                          : 'bg-white/5 text-neutral-400 hover:text-white border-white/5'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRunMedicalTriage}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs gap-2 cursor-pointer shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all flex items-center justify-center"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Run Offline Clinical Emergency Triage</span>
            </button>
          </div>

          {/* Medical Output Panel */}
          <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
            {triageResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Triage Stratification
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ID: {triageResult.triageId}
                    </span>
                  </div>

                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    triageResult.severityLevel === 'RED_EMERGENCY'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : triageResult.severityLevel === 'YELLOW_PRIORITY'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {triageResult.severityLevel === 'RED_EMERGENCY' ? '🚨 EMERGENCY RED' : triageResult.severityLevel}
                  </span>
                </div>

                <div className="p-3 bg-rose-500/[0.08] border border-rose-500/20 rounded-xl space-y-1 text-xs">
                  <p className="font-bold text-white">{triageResult.severityTitle}</p>
                  <p className="text-neutral-300">{triageResult.primaryRiskAssessment}</p>
                  <p className="text-rose-300 font-semibold pt-1">Immediate Protocol: {triageResult.recommendedImmediateAction}</p>
                </div>

                {/* Weight-Adjusted Pediatric Dosages */}
                {triageResult.pediatricDosages && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-[#121622] rounded-lg border border-white/5 space-y-1">
                      <span className="text-[10px] text-neutral-400 font-medium">Paracetamol (Antipyretic):</span>
                      <p className="text-sm font-bold text-white">{triageResult.pediatricDosages.paracetamolDoseMg}</p>
                      <p className="text-[10px] text-neutral-500">Based on {patientWeight} kg weight</p>
                    </div>

                    <div className="p-3 bg-[#121622] rounded-lg border border-white/5 space-y-1">
                      <span className="text-[10px] text-neutral-400 font-medium">Oral Rehydration (ORS):</span>
                      <p className="text-sm font-bold text-white">{triageResult.pediatricDosages.orsVolumeMl}</p>
                      <p className="text-[10px] text-neutral-500">{triageResult.pediatricDosages.zincSupplementMg}</p>
                    </div>
                  </div>
                )}

                {/* Patient / Family Local Language Directives */}
                <div className="p-3.5 bg-black/50 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-rose-400" />
                      <span>Caregiver Instructions ({patientLang.toUpperCase()}):</span>
                    </span>
                    <button
                      onClick={() => handleSpeakText(triageResult.patientInstructionsNative, patientLang)}
                      className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-[11px] border border-rose-500/35 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Voice Offline</span>
                    </button>
                  </div>
                  <p className="text-sm font-medium text-white italic">"{triageResult.patientInstructionsNative}"</p>
                  <p className="text-xs text-neutral-400 border-t border-white/5 pt-1.5">En: "{triageResult.patientInstructionsEn}"</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-500 space-y-3">
                <Stethoscope className="w-10 h-10 text-rose-400/40" />
                <p className="text-sm font-semibold text-neutral-300">Offline Clinic Triage Ready</p>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Select danger signs and patient parameters. The offline model calculates WHO ETAT emergency stratification, weight-based pediatric ORS/paracetamol doses, and caregiver speech in native languages.
                </p>
              </div>
            )}

            <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>Protocol: WHO IMCI Guidelines</span>
              <span>Tokens: {triageResult ? `${triageResult.tokensProcessed}` : '0'}</span>
              <span className="text-rose-400 font-medium">Air-Gap Medical Copilot</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 3: VOICE-TO-USDt CONTRACT ================= */}
      {activeMode === 'contract' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Transcript Input */}
          <div className="glass-panel p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Spoken Trade Agreement Input
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                    Sovereign Settlement
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">Speech or Text</span>
              </div>

              <textarea
                value={contractTranscript}
                onChange={(e) => setContractTranscript(e.target.value)}
                rows={5}
                className="w-full bg-[#151a26] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                placeholder="Paste or dictate trade verbal agreement (e.g., 'Agreed with merchant Juma at Busia border to supply 25 bags of yellow maize for 750 USDt...')"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  onClick={() => setContractTranscript('Agreed with Juma at Busia border to sell 25 bags of yellow maize for 750 USDt on Thursday morning.')}
                  className="preset-pill"
                >
                  Busia Maize (750 USDt)
                </button>
                <button
                  onClick={() => setContractTranscript('Selling 100 kg Arabica coffee to Sarah in Moyale border for 480 USDt settled via Tether.')}
                  className="preset-pill"
                >
                  Moyale Coffee (480 USDt)
                </button>
                <button
                  onClick={() => setContractTranscript('Purchasing 50 pieces of cotton apparel from Chinedu at Seme border for 320 USDt cash upon arrival.')}
                  className="preset-pill"
                >
                  Seme Apparel (320 USDt)
                </button>
              </div>
            </div>

            <button
              onClick={handleExtractContract}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs gap-2 cursor-pointer shadow-lg hover:from-amber-500 hover:to-orange-500 transition-all flex items-center justify-center"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Extract Structured Agreement & Generate SHA-256 Voucher</span>
            </button>
          </div>

          {/* Generated Voucher Panel */}
          <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
            {contractResult ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Sovereign Trade Voucher
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                      {contractResult.contractId}
                    </span>
                  </div>

                  <button
                    onClick={handleExportContract}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Save Voucher</span>
                  </button>
                </div>

                {/* Contract Summary Card */}
                <div className="bg-[#121622] rounded-xl p-4 border border-white/10 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5">
                    <div>
                      <span className="text-neutral-500 text-[10px]">Buyer / Counterparty:</span>
                      <p className="font-bold text-white">{contractResult.buyer}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px]">Seller / Operator:</span>
                      <p className="font-bold text-white">{contractResult.seller}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/5">
                    <div>
                      <span className="text-neutral-500 text-[10px]">Commodity & Quantity:</span>
                      <p className="font-bold text-white">{contractResult.commodity} ({contractResult.quantity})</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 text-[10px]">Settlement Amount:</span>
                      <p className="font-bold text-emerald-400">{contractResult.totalPriceUSDt} USDt</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px]">Border Checkpoint:</span>
                    <p className="font-medium text-neutral-300">{contractResult.borderPoint}</p>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px]">SHA-256 Cryptographic Seal:</span>
                    <p className="font-mono text-[10px] text-amber-400 truncate">{contractResult.sha256Seal}</p>
                  </div>
                </div>

                {/* Offline QR Sync Payload */}
                <div className="p-3 bg-black/50 rounded-lg border border-white/5 space-y-1 text-xs">
                  <span className="text-[10px] text-neutral-400 font-mono">Offline P2P Mesh / Bluetooth Sync Payload:</span>
                  <pre className="font-mono text-[10px] text-neutral-300 overflow-x-auto whitespace-pre-wrap break-all bg-black/60 p-2 rounded">
                    {contractResult.qrPayload}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-500 space-y-3">
                <FileCheck2 className="w-10 h-10 text-amber-400/40" />
                <p className="text-sm font-semibold text-neutral-300">Voice Agreement Parser Ready</p>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Dictate or paste spoken deal terms on the left. The offline model extracts parties, commodities, border checkpoints, and generates an air-gapped cryptographic voucher for Tether USDt settlement.
                </p>
              </div>
            )}

            <div className="border-t border-white/[0.07] pt-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>Settlement: Tether USDt</span>
              <span>Standard: EAC Simplified Trade Regime</span>
              <span className="text-amber-400 font-medium">Air-Gap Verified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
