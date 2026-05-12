import { motion } from 'motion/react';
import { Bell, MessageSquare, Briefcase, CreditCard, ChevronRight, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';

export type NotificationType = 'job' | 'message' | 'payment' | 'system';

export interface NotificationCardProps {
  key?: string | number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  onClick?: () => void;
}

const ICON_MAP = {
  job: { icon: Briefcase, color: 'bg-primary-container/10 text-primary', label: 'Job Alert' },
  message: { icon: MessageSquare, color: 'bg-secondary-container/20 text-secondary', label: 'New Message' },
  payment: { icon: CreditCard, color: 'bg-tertiary-container/10 text-tertiary', label: 'Payment' },
  system: { icon: Bell, color: 'bg-surface-container-high text-on-surface-variant', label: 'Update' },
};

export function NotificationCard({ type, title, message, time, unread, onClick }: NotificationCardProps) {
  const config = ICON_MAP[type];

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all relative flex gap-4 ${
        unread 
          ? 'bg-surface border-primary ring-1 ring-primary/10 shadow-md' 
          : 'bg-surface/50 border-outline-variant hover:bg-surface'
      }`}
    >
      {unread && (
        <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
      )}
      
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
        <config.icon className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            {config.label}
          </span>
          <span className="text-xs text-on-surface-variant">{time}</span>
        </div>
        <h4 className={`font-label-md text-on-surface mb-1 ${unread ? 'font-bold' : ''}`}>{title}</h4>
        <p className="text-body-sm text-on-surface-variant line-clamp-2">{message}</p>
        
        {unread && (
          <div className="mt-4 flex items-center gap-2 text-primary font-label-sm text-xs hover:underline">
            Mark as read <Check className="w-3 h-3" />
          </div>
        )}
      </div>
      
      <ChevronRight className="w-5 h-5 text-outline-variant shrink-0 self-center" />
    </motion.button>
  );
}
