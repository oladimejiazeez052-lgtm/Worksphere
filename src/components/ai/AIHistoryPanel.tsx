import { History, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: Date;
}

interface AIHistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function AIHistoryPanel({ history, onSelect }: AIHistoryPanelProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant h-fit">
      <div className="flex items-center gap-2 mb-6 text-on-surface">
        <History className="w-5 h-5 text-primary" />
        <h3 className="font-h4 text-lg">Prompt History</h3>
      </div>
      
      <div className="space-y-4">
        {history.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-xl hover:bg-surface-container-high group transition-colors border border-transparent hover:border-outline-variant"
          >
            <p className="text-sm text-on-surface line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              "{item.prompt}"
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                <Clock className="w-3 h-3" />
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
