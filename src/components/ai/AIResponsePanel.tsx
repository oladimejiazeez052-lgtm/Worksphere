import { Copy, Check, ThumbsUp, Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { GeneratedProfile } from '../../services/geminiService';

interface AIResponsePanelProps {
  key?: string | number;
  data: GeneratedProfile;
  onRetry: () => void;
  isLoading: boolean;
}

export function AIResponsePanel({ data, onRetry, isLoading }: AIResponsePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${data.role}\n\n${data.bio}\n\nSkills: ${data.skills.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 mt-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-label-md text-on-surface flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Generated Profile Draft
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-5 h-5 text-secondary" /> : <Copy className="w-5 h-5" />}
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button 
            onClick={onRetry}
            disabled={isLoading}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container disabled:opacity-50"
            title="Regenerate"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-outline-variant pb-6">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden shrink-0 border-2 border-outline-variant">
            <span className="text-primary font-bold text-xl">{data.name[0]}</span>
          </div>
          <div>
            <h3 className="font-h4 text-on-surface">{data.name}</h3>
            <p className="font-body-sm text-on-surface-variant">{data.role}</p>
            <div className="mt-2 inline-flex items-center bg-secondary-container text-on-secondary-container rounded-full px-2.5 py-1 gap-1.5 border border-secondary/20">
              <Check className="w-3.5 h-3.5" />
              <span className="font-label-sm text-[10px] uppercase font-bold tracking-wider text-secondary">AI Optimized</span>
            </div>
          </div>
        </div>

        <div className="font-body-md text-on-surface space-y-4 mb-6 leading-relaxed">
          {data.bio.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span 
              key={skill}
              className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-3 py-1.5 rounded-lg border border-outline-variant"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <button className="flex-1 bg-primary text-on-primary font-label-md py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-[0.98]">
          Apply to Public Profile
        </button>
        <button className="flex-1 bg-surface border border-outline text-on-surface font-label-md py-4 rounded-xl hover:bg-surface-container transition-all active:scale-[0.98]">
           Refine & Save
        </button>
      </div>
    </motion.div>
  );
}
