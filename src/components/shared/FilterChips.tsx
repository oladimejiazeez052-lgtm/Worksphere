interface FilterChipsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
}

export function FilterChips({ options, selectedOption, onSelect, className = "" }: FilterChipsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`whitespace-nowrap px-4 py-2 rounded-lg font-label-md text-label-md transition-all border ${
            selectedOption === option
              ? 'bg-primary-container text-on-primary-container border-transparent shadow-sm'
              : 'bg-surface-container-high text-on-surface hover:bg-surface-variant border-outline-variant'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
