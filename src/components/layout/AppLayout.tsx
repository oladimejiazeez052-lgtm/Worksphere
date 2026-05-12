import React from 'react';
import { SidebarShell } from './SidebarShell';
import { MobileBottomNav } from './MobileBottomNav';
import { Search, Bell } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <SidebarShell />

      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header Desktop Only */}
        <header className="hidden md:flex h-16 bg-surface border-b border-outline px-8 items-center justify-between sticky top-0 z-30">
          <div className="w-full max-w-xl">
             <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant transition-colors group-focus-within:text-primary" />
               <input 
                 type="text" 
                 placeholder="Search jobs, clients, or messages..." 
                 className="w-full bg-surface-container-low border border-outline rounded-full pl-12 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
               />
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full relative transition-colors">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 h-2 w-2 bg-error rounded-full border-2 border-surface" />
             </button>
             <button className="h-8 w-8 rounded-full border border-outline overflow-hidden hover:opacity-80 transition-opacity">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
                  alt="Musa Adewale" 
                  className="h-full w-full object-cover"
                />
             </button>
          </div>
        </header>

        <main className="md:pl-0 transition-all duration-300 flex-grow">
          <div className="max-w-7xl mx-auto px-6 py-8 pb-32 md:pb-8 h-full">
            {children}
          </div>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};
