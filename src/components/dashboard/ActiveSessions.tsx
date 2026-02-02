import React from 'react';
import { MessageSquare, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  status: 'active' | 'monitoring' | 'terminated';
  scamType: string;
  messages: number;
  duration: string;
  channel: string;
}

const mockSessions: Session[] = [
  { id: 'SES-7A3F', status: 'active', scamType: 'UPI Fraud', messages: 12, duration: '4m 32s', channel: 'WhatsApp' },
  { id: 'SES-9B2E', status: 'active', scamType: 'Bank Phishing', messages: 8, duration: '2m 15s', channel: 'SMS' },
  { id: 'SES-4C1D', status: 'monitoring', scamType: 'KYC Scam', messages: 23, duration: '8m 45s', channel: 'Email' },
  { id: 'SES-5E8F', status: 'terminated', scamType: 'Lottery Fraud', messages: 31, duration: '12m 08s', channel: 'WhatsApp' },
];

const ActiveSessions: React.FC = () => {
  const getStatusConfig = (status: Session['status']) => {
    switch (status) {
      case 'active':
        return { color: 'text-success', bg: 'bg-success/10', label: 'ACTIVE', icon: MessageSquare };
      case 'monitoring':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'MONITORING', icon: AlertTriangle };
      case 'terminated':
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'TERMINATED', icon: CheckCircle };
    }
  };

  return (
    <CyberCard variant="glow" className="h-full">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle>Active Sessions</CyberCardTitle>
          <span className="flex items-center gap-2 text-sm font-mono text-success">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            {mockSessions.filter(s => s.status === 'active').length} Live
          </span>
        </div>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-3">
          {mockSessions.map((session) => {
            const statusConfig = getStatusConfig(session.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={session.id}
                className="group p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm text-primary font-semibold">
                    {session.id}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono uppercase",
                    statusConfig.bg,
                    statusConfig.color
                  )}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="font-mono">{session.scamType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-mono">{session.messages} msgs</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{session.duration}</span>
                  </div>
                  <div className="text-right text-muted-foreground font-mono">
                    {session.channel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default ActiveSessions;
