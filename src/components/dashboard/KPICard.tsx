import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
}

export const KPICard = ({ label, value, trend, trendDirection, icon: Icon, variant = 'default' }: KPICardProps) => {
  const colorMap = {
    primary: 'bg-primary/5 text-primary icon-bg:bg-primary/20',
    secondary: 'bg-secondary/5 text-secondary icon-bg:bg-secondary/20',
    accent: 'bg-accent/5 text-accent icon-bg:bg-accent/20',
    default: 'bg-surface text-on-surface'
  };

  return (
    <Card className={cn("relative overflow-hidden group transition-all hover:shadow-level-2", colorMap[variant])}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{label}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        </div>
        <div className="h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-current shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className={cn(
        "flex items-center gap-1.5 text-xs font-bold",
        trendDirection === 'up' ? "text-secondary" : "text-error"
      )}>
        {trendDirection === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{trend}</span>
      </div>
    </Card>
  );
};
