import React from 'react';
import { Server, Zap, Activity, Shield } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

interface StatusItem {
  label: string;
  status: 'online' | 'degraded' | 'offline';
  latency?: string;
  icon: React.ElementType;
}

const statusItems: StatusItem[] = [
  { label: 'Honeypot API', status: 'online', latency: '45ms', icon: Server },
  { label: 'AI Detection Engine', status: 'online', latency: '120ms', icon: Zap },
  { label: 'Session Manager', status: 'online', latency: '32ms', icon: Activity },
  { label: 'Callback Service', status: 'online', latency: '89ms', icon: Shield },
];

const APIStatus: React.FC = () => {
  const getStatusConfig = (status: StatusItem['status']) => {
    switch (status) {
      case 'online':
        return { color: 'bg-success', label: 'ONLINE', textColor: 'text-success' };
      case 'degraded':
        return { color: 'bg-warning', label: 'DEGRADED', textColor: 'text-warning' };
      case 'offline':
        return { color: 'bg-destructive', label: 'OFFLINE', textColor: 'text-destructive' };
    }
  };

  return (
    <CyberCard variant="glow">
      <CyberCardHeader>
        <CyberCardTitle>System Status</CyberCardTitle>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-3">
          {statusItems.map((item, index) => {
            const config = getStatusConfig(item.status);
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.latency && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.latency}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "relative flex h-2 w-2",
                      item.status === 'online' && "after:animate-ping"
                    )}>
                      <span className={cn(
                        "relative inline-flex rounded-full h-2 w-2",
                        config.color
                      )} />
                    </span>
                    <span className={cn("text-xs font-mono uppercase", config.textColor)}>
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* API Key Info */}
        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground uppercase">API Endpoint</span>
            <span className="text-xs font-mono text-success">Active</span>
          </div>
          <code className="text-sm font-mono text-primary break-all">
            POST /honeypot
          </code>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">x-api-key required</span>
            <span className="text-xs font-mono text-primary">••••••••9f8a7c6d</span>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default APIStatus;
