import { User, Shield, Bell, CreditCard, ChevronRight } from 'lucide-react';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SECTIONS = [
  { id: 'profile', label: 'Public Profile', icon: User },
  { id: 'security', label: 'Security & Password', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
];

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`group flex items-center justify-between p-4 rounded-xl transition-all ${
            activeSection === section.id
              ? 'bg-primary-container text-on-primary-container shadow-md'
              : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
          }`}
        >
          <div className="flex items-center gap-3">
            <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-on-primary-container' : 'text-primary'}`} />
            <span className="font-label-md">{section.label}</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
        </button>
      ))}
    </aside>
  );
}
