import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIPromptForm } from './AIPromptForm';
import { AIResponsePanel } from './AIResponsePanel';
import { AIHistoryPanel } from './AIHistoryPanel';
import { generateProfileDraft, GeneratedProfile } from '../../services/geminiService';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: Date;
  result: GeneratedProfile;
}

export function AIProfileBuilderPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<GeneratedProfile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastPrompt, setLastPrompt] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('ai_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (data) {
        setHistory(data.map(item => ({
          id: item.id,
          prompt: item.prompt,
          timestamp: new Date(item.created_at),
          result: item.result
        })));
      }
    };
    
    fetchHistory();
  }, [user]);

  const handleGenerate = async (prompt: string) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    setLastPrompt(prompt);
    
    try {
      const result = await generateProfileDraft(prompt);
      setCurrentResult(result);
      
      const { data } = await supabase.from('ai_history').insert({
        user_id: user.id,
        prompt,
        result
      }).select().single();
      
      if (data) {
        const newItem: HistoryItem = {
          id: data.id,
          prompt: data.prompt,
          timestamp: new Date(data.created_at),
          result: data.result
        };
        setHistory(prev => [newItem, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      console.error(err);
      setError("AI was unable to generate a response. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setCurrentResult(item.result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-10">
        <Link 
          to={ROUTES.PORTFOLIO}
          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6 group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-label-md">Back to Portfolio</span>
        </Link>
        <h1 className="text-h2 font-h2 text-on-surface mb-3">AI Profile Builder</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Describe your skills, experience, and what you're looking for. Our AI will craft a 
          professional profile to help you stand out to premium clients.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
            <AIPromptForm 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
            />
          </div>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-20 gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-on-surface-variant font-label-md animate-pulse">
                  Crafting your professional profile...
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20 flex gap-4"
              >
                <AlertCircle className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-h4 text-lg mb-1">Generation Failed</h4>
                  <p className="text-body-sm mb-4">{error}</p>
                  <button 
                    onClick={() => handleGenerate(lastPrompt)}
                    className="bg-on-error-container text-error-container px-4 py-2 rounded-lg font-label-sm hover:opacity-90 transition-opacity"
                  >
                    Retry Generation
                  </button>
                </div>
              </motion.div>
            )}

            {currentResult && !isLoading && (
              <AIResponsePanel 
                key="result"
                data={currentResult} 
                onRetry={() => handleGenerate(lastPrompt)}
                isLoading={isLoading}
              />
            )}
          </AnimatePresence>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6">
          <AIHistoryPanel 
            history={history} 
            onSelect={handleHistorySelect} 
          />
          
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-label-md text-primary mb-2">Pro Tip</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              For the best results, include specific tools you use, years of experience, and 
              one key achievement.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
