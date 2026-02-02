import React from 'react';
import { Bot, User, AlertTriangle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

interface Message {
  sender: 'scammer' | 'agent';
  text: string;
  timestamp: string;
  flagged?: boolean;
}

const mockMessages: Message[] = [
  { 
    sender: 'scammer', 
    text: 'Congratulations! You have won ₹50,000 in our lucky draw. Please share your bank details to receive the prize.', 
    timestamp: '14:32:05',
    flagged: true
  },
  { 
    sender: 'agent', 
    text: 'Oh wow, that\'s amazing! I never win anything. How did I get selected for this?', 
    timestamp: '14:32:18' 
  },
  { 
    sender: 'scammer', 
    text: 'Your phone number was randomly selected by our computer system. Just share your account number and IFSC code.', 
    timestamp: '14:32:45',
    flagged: true
  },
  { 
    sender: 'agent', 
    text: 'That sounds great! But which company is this from? And why do you need my bank details?', 
    timestamp: '14:33:02' 
  },
  { 
    sender: 'scammer', 
    text: 'This is from Jio Lottery. We need bank details to transfer the winning amount. Also share your UPI ID: fraudster@ybl', 
    timestamp: '14:33:28',
    flagged: true
  },
];

const ConversationViewer: React.FC = () => {
  return (
    <CyberCard variant="glow" className="h-full flex flex-col">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle>Live Conversation</CyberCardTitle>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
            <span className="text-xs font-mono text-destructive uppercase">Session SES-7A3F</span>
          </span>
        </div>
      </CyberCardHeader>
      <CyberCardContent className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {mockMessages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.sender === 'agent' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.sender === 'scammer' 
                  ? "bg-destructive/20 border border-destructive/40" 
                  : "bg-primary/20 border border-primary/40"
              )}>
                {message.sender === 'scammer' ? (
                  <User className="w-4 h-4 text-destructive" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              
              <div className={cn(
                "max-w-[75%] space-y-1",
                message.sender === 'agent' && "text-right"
              )}>
                <div className={cn(
                  "inline-block p-3 rounded-lg",
                  message.sender === 'scammer' 
                    ? "bg-destructive/10 border border-destructive/20 rounded-tl-none" 
                    : "bg-primary/10 border border-primary/20 rounded-tr-none"
                )}>
                  <p className="text-sm text-foreground">{message.text}</p>
                  {message.flagged && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="font-mono">SCAM INDICATOR DETECTED</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-mono text-muted-foreground">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default ConversationViewer;
