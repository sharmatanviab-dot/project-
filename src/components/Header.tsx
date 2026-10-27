import { useState, useEffect } from 'react';
import {
  Shield,
  Cpu,
  WifiOff,
  Radio,
  Layers,
  Users,
  BookOpen,
  Activity,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import { translatorService } from '../services/translatorService';
import { networkMonitor } from '../services/networkMonitor';

export type AppTab = 'workbench' | 'conversation' | 'copilot' | 'phrasebook' | 'hardware' | 'auditor';

interface HeaderProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const Header = ({ activeTab, onSelectTab }: HeaderProps) => {
  const [isDaemon, setIsDaemon] = useState(translatorService.getDaemonStatus());
  const [networkStatus, setNetworkStatus] = useState(networkMonitor.getStatus());

  useEffect(() => {
    const unsub = networkMonitor.subscribe(() => {
      setIsDaemon(translatorService.getDaemonStatus());
      setNetworkStatus(networkMonitor.getStatus());
    });
    return unsub;
  }, []);

  const tabs: Array<{ id: AppTab; label: string; icon: any; badge?: string }> = [
    { id: 'workbench', label: 'Studio', icon: Layers },
    { id: 'conversation', label: 'Dialogue', icon: Users, badge: 'Live' },
    { id: 'copilot', label: 'Edge Copilot', icon: BrainCircuit, badge: 'AI' },
    { id: 'phrasebook', label: 'Phrasebook', icon: BookOpen },
    { id: 'hardware', label: 'QVAC & Hardware', icon: Cpu },
    { id: 'auditor', label: 'Packet Audit', icon: Activity }
  ];

  return (
    <header className="border-b border-white/[0.07] bg-[#08090d]/90 backdrop-blur-lg sticky top-0 z-40 px-5 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-600/15 border border-indigo-500/35 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                <span>Afrispeak</span>
                <span className="text-indigo-400 font-medium">QVAC</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                Track 1 • Offline AI
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-normal">
              Pan-African Sovereign Neural Voice & Translation
            </p>
          </div>
        </div>

        {/* Linear-Style Segmented Navigation Controller */}
        <nav className="nav-pill-container">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={`nav-tab-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-indigo-400 text-black' : 'bg-indigo-500/15 text-indigo-400'
                  }`}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Telemetry & Airgap Integrity Status */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-[#121622] border border-white/10 px-3 py-1.5 rounded-lg text-xs">
            <span className={`w-2 h-2 rounded-full ${isDaemon ? 'bg-indigo-400 animate-pulse' : 'bg-indigo-500'}`}></span>
            <span className="text-neutral-400">Engine:</span>
            <span className="text-white font-medium">
              {isDaemon ? 'QVAC Local Daemon (:8080)' : 'TranslatePsy-AfriSLM'}
            </span>
          </div>

          <div
            className={`badge-status border ${
              !networkStatus.isDeviceOnline
                ? 'border-indigo-500/40 text-indigo-300 bg-indigo-500/15 shadow-[0_0_16px_rgba(99,102,241,0.25)]'
                : 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Air-Gap Sovereign [0 Leaks]</span>
          </div>
        </div>
      </div>
    </header>
  );
};
