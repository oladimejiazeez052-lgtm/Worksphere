import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, HelpCircle } from 'lucide-react';
import { ROUTES } from '../../lib/routes';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl w-48 h-48 mx-auto -z-10"></div>
          <div className="w-40 h-40 bg-surface-container-low rounded-full flex items-center justify-center border border-outline-variant shadow-sm relative z-10 mx-auto">
            <Compass className="w-20 h-20 text-primary animate-pulse" />
          </div>
        </div>

        <h1 className="text-h1 font-h1 text-on-surface mb-4">Page Not Found</h1>
        <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-10">
          It looks like the page you are looking for has been moved, deleted, or simply never existed. Let's get you back to your workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-95"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <button 
            onClick={() => navigate('/help')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-surface border-2 border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container transition-all active:scale-95"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Visit Help Center
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant w-full max-w-xs mx-auto">
          <span className="text-h4 font-bold text-outline">WorkSphere</span>
        </div>
      </motion.div>
    </div>
  );
}
