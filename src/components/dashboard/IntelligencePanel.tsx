import React from 'react';
import { CreditCard, Phone, Link, Fingerprint, Copy, CheckCircle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

interface IntelligenceItem {
  type: 'bank' | 'upi' | 'phone' | 'link';
  value: string;
  timestamp: string;
  sessionId: string;
}

const mockIntelligence: IntelligenceItem[] = [
  { type: 'upi', value: 'fraudster@ybl', timestamp: '2 min ago', sessionId: 'SES-7A3F' },
  { type: 'bank', value: 'XXXX XXXX 4521 7890', timestamp: '5 min ago', sessionId: 'SES-9B2E' },
  { type: 'phone', value: '+91 98765 43210', timestamp: '8 min ago', sessionId: 'SES-4C1D' },
  { type: 'link', value: 'fake-bank-login.xyz', timestamp: '12 min ago', sessionId: 'SES-5E8F' },
  { type: 'upi', value: 'scammer123@paytm', timestamp: '15 min ago', sessionId: 'SES-7A3F' },
  { type: 'phone', value: '+91 87654 32109', timestamp: '18 min ago', sessionId: 'SES-9B2E' },
];

const IntelligencePanel: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const getTypeConfig = (type: IntelligenceItem['type']) => {
    switch (type) {
      case 'bank':
        return { icon: CreditCard, label: 'BANK ACC', color: 'text-warning', bg: 'bg-warning/10' };
      case 'upi':
        return { icon: Fingerprint, label: 'UPI ID', color: 'text-accent', bg: 'bg-accent/10' };
      case 'phone':
        return { icon: Phone, label: 'PHONE', color: 'text-primary', bg: 'bg-primary/10' };
      case 'link':
        return { icon: Link, label: 'PHISH LINK', color: 'text-destructive', bg: 'bg-destructive/10' };
    }
  };

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <CyberCard variant="glow" className="h-full">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle>Extracted Intelligence</CyberCardTitle>
          <span className="text-sm font-mono text-muted-foreground">
            {mockIntelligence.length} items
          </span>
        </div>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {mockIntelligence.map((item, index) => {
            const config = getTypeConfig(item.type);
            const Icon = config.icon;
            
            return (
              <div
                key={index}
                className="group flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all"
              >
                <div className={cn("p-2 rounded", config.bg)}>
                  <Icon className={cn("w-4 h-4", config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-mono uppercase", config.color)}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.sessionId}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-foreground truncate mt-0.5">
                    {item.value}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    {item.timestamp}
                  </span>
                  <button
                    onClick={() => handleCopy(item.value, index)}
                    className="p-1.5 rounded hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default IntelligencePanel;
