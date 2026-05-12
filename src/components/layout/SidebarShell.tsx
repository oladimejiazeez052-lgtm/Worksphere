import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, APP_NAME } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Menu, Search, Bell, LogOut } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROUTES } from '../../lib/routes';

export const SidebarShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { success } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
  };

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-surface border-b border-outline sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDrawerOpen(true)} 
            className="p-2 -ml-2 text-on-surface-variant hover:text-on-surface"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-xl font-bold text-primary tracking-tight">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative">
             <Bell className="h-5 w-5" />
             <span className="absolute top-2 right-2 h-2 w-2 bg-error rounded-full" />
           </button>
           <button className="p-1 border border-outline rounded-full">
             <img 
               src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
               alt="User" 
               className="h-8 w-8 rounded-full object-cover" 
             />
           </button>
        </div>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-outline flex-col">
        <div className="p-8 pb-12">
          <span className="text-2xl font-bold text-primary tracking-tight">{APP_NAME}</span>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">Professional Workspace</p>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-button text-sm font-bold transition-all relative group",
                isActive 
                  ? "bg-primary/10 text-primary scale-[1.02]" 
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "fill-current")} />
                  {item.label}
                  {isActive && <motion.div layoutId="active-nav" className="absolute left-0 w-1 h-6 bg-primary rounded-full" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full h-10 flex items-center gap-3 px-4 rounded-button text-sm font-bold text-error hover:bg-error/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
          <div className="p-4 rounded-card border border-outline bg-surface-container-low flex items-center gap-3">
             <img 
               src={user?.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"} 
               alt="User" 
               className="h-10 w-10 rounded-full border border-white shadow-sm object-cover" 
             />
             <div className="min-w-0">
               <p className="text-sm font-bold truncate">{user?.name || 'Musa Adewale'}</p>
               <p className="text-[10px] text-on-surface-variant truncate font-semibold uppercase tracking-tighter">{user?.role || 'Pro Freelancer'}</p>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};
