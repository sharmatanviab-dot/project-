import { useState } from 'react';
import {
  BookOpen,
  ShoppingBag,
  HeartPulse,
  Bus,
  Shield,
  AlertTriangle,
  Search,
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { OFFLINE_PHRASEBOOK, type PhraseItem } from '../services/phrasebookData';
import { SUPPORTED_LANGUAGES } from '../services/translatorService';

interface PhrasebookDrawerProps {
  onSelectPhrase: (text: string, lang: string) => void;
}

export const PhrasebookDrawer = ({ onSelectPhrase }: PhrasebookDrawerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'trade' | 'medical' | 'customs' | 'transit' | 'emergency'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewLang, setPreviewLang] = useState('sw');

  const filtered = OFFLINE_PHRASEBOOK.filter((item: PhraseItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.en.toLowerCase().includes(query) ||
      item.sw.toLowerCase().includes(query) ||
      item.am.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Scenarios', count: OFFLINE_PHRASEBOOK.length, icon: Layers },
    { id: 'trade', label: 'Trade & Commerce', icon: ShoppingBag },
    { id: 'medical', label: 'Health & Clinic', icon: HeartPulse },
    { id: 'customs', label: 'Customs & Border', icon: Shield },
    { id: 'transit', label: 'Transit & Route', icon: Bus },
    { id: 'emergency', label: 'Emergency Triage', icon: AlertTriangle }
  ];

  return (
    <div className="glass-panel p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Cross-Border Phrasebook Matrix
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              {OFFLINE_PHRASEBOOK.length} Verified Phrases • 8 Languages
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 font-normal">
            Pre-compiled, offline verified sentences for trade checkpoints, clinic triage, and transit. Click any card to load into Studio.
          </p>
        </div>

        {/* Language Preview Selector */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-neutral-400 font-medium">Preview Language:</span>
          <select
            value={previewLang}
            onChange={(e) => setPreviewLang(e.target.value)}
            className="language-select"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name} ({l.code.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
                {c.count && <span className="text-[10px] opacity-60">({c.count})</span>}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords or domain..."
            className="bg-[#121622] border border-white/10 focus:border-emerald-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none w-64 transition-colors"
          />
        </div>
      </div>

      {/* Phrase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item: PhraseItem) => {
          const previewTranslation = (item as any)[previewLang] || item.en;
          return (
            <div
              key={item.id}
              onClick={() => onSelectPhrase(item.en, 'en')}
              className="p-4 bg-[#121622]/80 hover:bg-[#161c2c] border border-white/[0.07] hover:border-emerald-500/40 rounded-xl cursor-pointer transition-all space-y-3 group shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white group-hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 opacity-80" />
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      item.category === 'medical'
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : item.category === 'trade'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : item.category === 'customs'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : item.category === 'emergency'
                        ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                        : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-2">
                  "{item.en}"
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                <p className="text-xs text-emerald-400 font-medium line-clamp-1">
                  [{previewLang.toUpperCase()}]: {previewTranslation}
                </p>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
