import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Search...", value, onChange, className = "" }: SearchBarProps) {
  return (
    <div className={`relative flex items-center w-full max-w-2xl ${className}`}>
      <Search className="absolute left-4 w-5 h-5 text-on-surface-variant pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-surface-container-low border border-outline-variant rounded-full pl-12 pr-4 py-2 text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
      />
    </div>
  );
}
