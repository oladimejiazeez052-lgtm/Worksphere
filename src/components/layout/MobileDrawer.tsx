import React from 'react';
import { X, User, Settings, CreditCard, HelpCircle, AlertCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/lib/routes';
import { APP_NAME } from '@/src/lib/constants';
import { cn } from '@/src/lib/utils';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-surface z-[70] md:hidden flex flex-col"
          >
            <div className="p-6 border-b border-outline bg-surface-container-low">
              <div className="flex justify-between items-start mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
                  alt="Avatar" 
                  className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" 
                />
                <button onClick={onClose} className="p-2 -mr-2 text-on-surface-variant hover:text-on-surface transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold">Musa Adewale</h3>
                <p className="text-sm text-on-surface-variant italic">alex.taylor@example.com</p>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-1">
               <DrawerItem icon={User} label="Profile" onClick={() => { router.push(ROUTES.PROFILE); onClose(); }} />
               <DrawerItem icon={Settings} label="Settings" onClick={() => { router.push(ROUTES.SETTINGS); onClose(); }} />
               <DrawerItem icon={CreditCard} label="Billing & Payments" onClick={onClose} />
               <div className="h-px bg-outline my-2 mx-4" />
               <DrawerItem icon={HelpCircle} label="Help Center" onClick={onClose} />
               <DrawerItem icon={AlertCircle} label="Report an Issue" onClick={onClose} />
            </div>

            <div className="p-4 border-t border-outline">
               <button className="flex items-center gap-4 w-full px-4 py-3 rounded-full text-error hover:bg-error/5 transition-colors font-bold text-sm">
                 <LogOut className="h-5 w-5" />
                 Log Out
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DrawerItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 w-full px-4 py-3 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all group"
  >
    <Icon className="h-5 w-5 group-hover:text-primary" />
    <span className="font-bold text-sm">{label}</span>
  </button>
);
