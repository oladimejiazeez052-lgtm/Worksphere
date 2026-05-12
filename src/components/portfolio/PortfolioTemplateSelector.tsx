import { Palette, CheckCircle2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  previewColor: string;
}

interface PortfolioTemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern Minimal', description: 'Clean lines, lots of whitespace', previewColor: 'bg-primary' },
  { id: 'bento', name: 'Bento Grid', description: 'Organized blocks of content', previewColor: 'bg-secondary' },
  { id: 'portfolio', name: 'Classic Portfolio', description: 'Traditional sidebar and gallery', previewColor: 'bg-tertiary' },
];

export function PortfolioTemplateSelector({ selectedId, onSelect, className = "" }: PortfolioTemplateSelectorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-h4 font-h4 text-on-surface flex items-center gap-2">
        <Palette className="w-5 h-5 text-primary" />
        Choose Template
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all text-left group ${
              selectedId === template.id
                ? 'border-primary bg-primary-container/5 ring-1 ring-primary'
                : 'border-outline-variant hover:border-primary bg-surface'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg shrink-0 ${template.previewColor} opacity-20`} />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-label-md text-on-surface group-hover:text-primary">{template.name}</span>
                {selectedId === template.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
