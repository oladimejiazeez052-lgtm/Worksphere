import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, description, action, className }: SectionHeaderProps) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8', className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">{title}</h1>
        {description && <p className="text-on-surface-variant max-w-2xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
