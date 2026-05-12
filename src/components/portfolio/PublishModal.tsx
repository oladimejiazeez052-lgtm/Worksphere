import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Globe, Share2, ArrowRight } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export function PublishModal({ isOpen, onClose, url }: PublishModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-outline-variant p-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-h3 font-h3 text-on-surface">Portfolio Live!</h2>
              <p className="text-body-md text-on-surface-variant px-4">
                Your professional portfolio is now live and visible to potential clients worldwide.
              </p>
            </div>

            <div className="w-full space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-body-sm font-label-md text-on-surface truncate">
                    {url}
                  </span>
                </div>
                <button className="p-2 text-primary hover:bg-primary/10 rounded-lg shrink-0">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={onClose}
                  className="py-3 border-2 border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-variant transition-all"
                >
                  Edit More
                </button>
                <button 
                  className="py-3 bg-primary-container text-on-primary-container font-label-md rounded-xl shadow-lg hover:bg-primary-container/90 transition-all flex items-center justify-center gap-2"
                >
                  View Live
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
