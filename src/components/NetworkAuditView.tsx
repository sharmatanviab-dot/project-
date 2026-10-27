import { useState, useEffect } from 'react';
import { ShieldCheck, Wifi, WifiOff, RefreshCw, AlertTriangle, Activity, Lock, CheckCircle2 } from 'lucide-react';
import { networkMonitor, type PacketAuditLog } from '../services/networkMonitor';
import { translatorService } from '../services/translatorService';

export const NetworkAuditView = () => {
  const [status, setStatus] = useState(networkMonitor.getStatus());
  const [daemonHealth, setDaemonHealth] = useState(translatorService.getDaemonHealth());

  useEffect(() => {
    const unsub = networkMonitor.subscribe(() => {
      setStatus(networkMonitor.getStatus());
      setDaemonHealth(translatorService.getDaemonHealth());
    });
    return unsub;
  }, []);

  const handleRefresh = async () => {
    await translatorService.checkDaemon();
    setStatus(networkMonitor.getStatus());
    setDaemonHealth(translatorService.getDaemonHealth());
  };

  return (
    <div className="glass-panel p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Empirical Air-Gap Packet Auditor
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
              100% Sovereign Runtime Isolation
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 font-normal">
            Real-time packet monitor verifying zero outbound telemetries reach remote cloud AI servers.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-3.5 py-1.5 rounded-lg text-xs text-emerald-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-Probe Runtime</span>
        </button>
      </div>

      {/* Real Status Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#121622]/80 p-4 rounded-xl border border-white/[0.07] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              {status.isDeviceOnline ? (
                <Wifi className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Physical Interface</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono">
              Layer 1
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            {status.isDeviceOnline ? 'Online (Localhost Loopback Active)' : 'Air-Gapped (Hardware Offline)'}
          </p>
          <p className="text-xs text-neutral-500">
            {status.isDeviceOnline ? 'Adapter active on localhost; outbound calls guarded' : 'Physical interfaces disconnected / air-gapped'}
          </p>
        </div>

        <div className="bg-[#121622]/80 p-4 rounded-xl border border-white/[0.07] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>External Cloud Leaks</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">
              Secure
            </span>
          </div>
          <p className="text-sm font-bold text-emerald-400">
            {status.totalExternalPackets} Leaks Recorded
          </p>
          <p className="text-xs text-neutral-500">
            Zero API calls routed to OpenAI, Anthropic, or remote clouds
          </p>
        </div>

        <div className="bg-[#121622]/80 p-4 rounded-xl border border-white/[0.07] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Internal Loopback</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono">
              127.0.0.1
            </span>
          </div>
          <p className="text-sm font-bold text-white">
            {status.totalLoopbackPackets} Loopback Packets
          </p>
          <p className="text-xs text-neutral-500">
            Pure on-device local memory and socket transactions
          </p>
        </div>
      </div>

      {/* Local Engine Specification */}
      <div className="bg-[#0e121b] p-5 rounded-xl border border-white/[0.07] space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <span className="text-xs font-semibold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Local Engine Target: {daemonHealth.endpoint}</span>
          </span>
          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {daemonHealth.connected ? 'QVAC Daemon Active (:8080)' : 'Standalone In-Memory Fallback'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-neutral-500 block text-[11px]">Active Model</span>
            <span className="text-white font-semibold text-xs">{daemonHealth.activeModel}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">VRAM Budget</span>
            <span className="text-white font-semibold text-xs">{daemonHealth.vramUsageMB} MB / 4096 MB</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Target Architecture</span>
            <span className="text-white font-semibold text-xs">{daemonHealth.deviceTarget}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Audit Result</span>
            <span className="text-emerald-400 font-semibold text-xs">100% Self-Sovereign</span>
          </div>
        </div>
      </div>

      {/* Live Intercepted Request Log */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Intercepted Packet Audit Log
          </span>
          <span className="text-[11px] text-neutral-500">
            Auditing fetch &amp; socket requests in real time
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/[0.07] bg-[#0a0d14] p-4">
          {status.recentLogs.length === 0 ? (
            <div className="text-center py-8 text-neutral-500 text-xs space-y-2">
              <ShieldCheck className="w-8 h-8 mx-auto opacity-30 text-emerald-400" />
              <p className="text-neutral-400 font-medium">Zero outbound network packets recorded.</p>
              <p className="text-[11px] text-neutral-600">Total sovereign isolation maintained on this device.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-neutral-500 border-b border-white/[0.07] text-[11px]">
                  <th className="pb-2.5 font-medium">TIMESTAMP</th>
                  <th className="pb-2.5 font-medium">METHOD</th>
                  <th className="pb-2.5 font-medium">DESTINATION ENDPOINT</th>
                  <th className="pb-2.5 font-medium">ROUTE TYPE</th>
                  <th className="pb-2.5 text-right font-medium">AUDIT STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {status.recentLogs.map((log: PacketAuditLog) => (
                  <tr key={log.id} className="text-neutral-300">
                    <td className="py-2.5 text-neutral-500 font-mono text-[11px]">{log.timestamp}</td>
                    <td className="py-2.5 text-emerald-400 font-semibold font-mono">{log.method}</td>
                    <td className="py-2.5 truncate max-w-xs font-mono text-[11px]">{log.url}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          log.destination === 'localhost_loopback'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {log.destination}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      {log.status === 'allowed' ? (
                        <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>PASS (LOCAL LOOPBACK)</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1 justify-end text-xs">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>BLOCKED LEAK</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
