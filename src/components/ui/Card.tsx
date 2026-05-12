import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  hoverable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ className, children, hoverable = false, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-surface rounded-card border border-outline p-6 shadow-level-1 transition-all',
        hoverable && 'hover:shadow-level-2 hover:border-primary cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
