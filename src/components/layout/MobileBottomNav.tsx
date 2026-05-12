import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, PlusCircle, MessageSquare, User } from 'lucide-react';
import { ROUTES } from '@/src/lib/routes';
import { cn } from '@/src/lib/utils';

const MOBILE_NAV_ITEMS = [
  { label: 'Home', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
  { label: 'Jobs', icon: Briefcase, href: ROUTES.JOBS },
  { label: 'Post', icon: PlusCircle, href: ROUTES.CREATE_JOB },
  { label: 'Chat', icon: MessageSquare, href: '/messages', badge: true },
  { label: 'Profile', icon: User, href: '/profile' },
];

export const MobileBottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline flex items-center justify-around px-2 z-50">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-all duration-150 relative",
              isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            <div className={cn(
              "p-1 rounded-full transition-all",
              isActive && "bg-primary/10"
            )}>
              <item.icon className={cn("h-6 w-6", isActive && "fill-current")} />
            </div>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
            {item.badge && (
              <span className="absolute top-2 right-1/2 translate-x-4 h-2 w-2 bg-error rounded-full border-2 border-surface" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
