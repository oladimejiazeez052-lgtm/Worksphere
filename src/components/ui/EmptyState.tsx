import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon: Icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center', className)}>
      {Icon && <Icon className="h-12 w-12 text-on-surface-variant/30 mb-4" />}
      <h3 className="text-lg font-bold text-on-surface">{title}</h3>
      <p className="text-sm text-on-surface-variant mt-2 max-w-xs">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
