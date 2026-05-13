import { LayoutDashboard, Briefcase, UserCircle, Settings, Bell, BarChart3, PlusCircle, Search, Menu, X, ArrowUpRight, MessageSquare, Shield } from 'lucide-react';
import { ROUTES } from '../lib/routes';

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
  { label: 'Find Jobs', icon: Briefcase, href: ROUTES.JOBS },
  { label: 'Workers', icon: UserCircle, href: ROUTES.WORKERS },
  { label: 'Portfolio', icon: PlusCircle, href: ROUTES.PORTFOLIO },
  { label: 'Messages', icon: MessageSquare, href: ROUTES.MESSAGES },
  { label: 'Reports', icon: BarChart3, href: ROUTES.REPORTS },
  { label: 'Admin', icon: Shield, href: ROUTES.ADMIN },
  { label: 'Notifications', icon: Bell, href: ROUTES.NOTIFICATIONS },
  { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
];

export const APP_NAME = 'WorkSphere';
export const APP_DESCRIPTION = 'The high-trust marketplace for professionals.';
