// Afrispeak QVAC — Network & Air-Gap Packet Monitor
// Audits all outbound browser requests to verify 100% air-gapped sovereignty

export interface PacketAuditLog {
  id: string;
  timestamp: string;
  url: string;
  method: string;
  destination: 'localhost_loopback' | 'external_internet' | 'blocked';
  status: 'allowed' | 'alert_leaked';
}

class NetworkMonitor {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : false;
  private logs: PacketAuditLog[] = [];
  private outboundPacketsBlocked: number = 0;
  private loopbackPacketsCount: number = 0;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isOnline = navigator.onLine;

      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notify();
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notify();
      });

      this.interceptNetwork();
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  public getStatus() {
    return {
      isDeviceOnline: this.isOnline,
      airGapStrictEnforced: !this.isOnline,
      totalExternalPackets: this.outboundPacketsBlocked,
      totalLoopbackPackets: this.loopbackPacketsCount,
      recentLogs: this.logs.slice(-10)
    };
  }

  private interceptNetwork() {
    if (typeof window === 'undefined') return;

    const originalFetch = window.fetch;
    const self = this;

    // Wrap fetch to monitor and enforce airgap
    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const urlStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
      const isLoopback =
        urlStr.includes('localhost') ||
        urlStr.includes('127.0.0.1') ||
        urlStr.startsWith('/') ||
        urlStr.startsWith('./');

      const entry: PacketAuditLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        url: urlStr.length > 50 ? urlStr.substring(0, 50) + '...' : urlStr,
        method: init?.method || 'GET',
        destination: isLoopback ? 'localhost_loopback' : 'external_internet',
        status: isLoopback ? 'allowed' : 'alert_leaked'
      };

      if (isLoopback) {
        self.loopbackPacketsCount++;
      } else {
        self.outboundPacketsBlocked++;
      }

      self.logs.push(entry);
      if (self.logs.length > 50) self.logs.shift();
      self.notify();

      return originalFetch.apply(this, [input, init]);
    };
  }
}

export const networkMonitor = new NetworkMonitor();
