import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface AIPromptFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "Describe your electrical installation experience",
  "Generate a professional artisan bio",
  "Create a plumbing service description",
  "Senior full-stack dev with 8 years React/Node exp",
  "Logo designer specializing in branding"
];

export function AIPromptForm({ onGenerate, isLoading }: AIPromptFormProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim().length >= 10) {
      onGenerate(prompt);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="space-y-2">
        <label htmlFor="ai-prompt" className="font-label-md text-on-surface">
          Describe your professional identity
        </label>
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., I'm a senior full-stack developer with 8 years of experience specializing in React and Node.js. I'm passionate about building scalable microservices..."
            rows={4}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3">
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               disabled={isLoading || prompt.trim().length < 10}
               className="bg-primary-container text-on-primary-container p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-container/90 transition-colors"
             >
               {isLoading ? (
                 <div className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
               ) : (
                 <Send className="w-5 h-5" />
               )}
             </motion.button>
          </div>
        </form>
        {prompt.trim().length > 0 && prompt.trim().length < 10 && (
          <p className="text-xs text-error">Please describe a bit more (min 10 characters)</p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-label-sm text-on-surface-variant flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Quick Suggestions
        </h3>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setPrompt(s)}
              className="bg-surface-container-high text-on-surface-variant font-label-sm text-xs px-3 py-2 rounded-xl hover:bg-surface-variant border border-outline-variant transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
