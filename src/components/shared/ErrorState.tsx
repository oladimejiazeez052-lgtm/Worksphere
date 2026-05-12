import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/routes';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  fullPage?: boolean;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We encountered an unexpected error while loading this content. Please try again or return to the dashboard.",
  onRetry,
  className,
  fullPage = false
}: ErrorStateProps) {
  const router = useRouter();

  const content = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        fullPage ? "min-h-[60vh]" : "bg-error-container/10 border border-error/20 rounded-2xl",
        className
      )}
    >
      <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-error" />
      </div>
      
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm max-w-md mb-8">{message}</p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-error text-on-error font-label-md rounded-xl hover:bg-error/90 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
        <button 
          onClick={() => router.push(ROUTES.DASHBOARD)}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-surface border border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container transition-all active:scale-95"
        >
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </button>
      </div>
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        {content}
      </div>
    );
  }

  return content;
}
