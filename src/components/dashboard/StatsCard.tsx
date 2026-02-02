import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CyberCard } from '@/components/ui/cyber-card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  variant?: 'default' | 'threat' | 'safe' | 'warning';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  variant = 'default',
}) => {
  const iconColors = {
    default: 'text-primary',
    threat: 'text-destructive',
    safe: 'text-success',
    warning: 'text-warning',
  };

  const bgColors = {
    default: 'bg-primary/10',
    threat: 'bg-destructive/10',
    safe: 'bg-success/10',
    warning: 'bg-warning/10',
  };

  return (
    <CyberCard variant={variant === 'default' ? 'glow' : variant} className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="font-orbitron text-3xl font-bold text-foreground">
            {value}
          </p>
          {change && (
            <p className={cn(
              "text-sm font-mono",
              trend === 'up' && "text-success",
              trend === 'down' && "text-destructive",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {trend === 'up' && '↑ '}
              {trend === 'down' && '↓ '}
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          bgColors[variant]
        )}>
          <Icon className={cn("w-6 h-6", iconColors[variant])} />
        </div>
      </div>
    </CyberCard>
  );
};

export default StatsCard;
