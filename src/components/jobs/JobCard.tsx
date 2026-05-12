import { MapPin, Clock, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface JobCardProps {
  key?: string | number;
  title: string;
  category: string;
  budget: string;
  location: string;
  postedAt: string;
  type: string;
  description: string;
  className?: string;
}

export function JobCard({
  title,
  category,
  budget,
  location,
  postedAt,
  type,
  description,
  className = ""
}: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-surface border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all group ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary font-label-sm text-xs mb-2">
            {category}
          </span>
          <h3 className="text-h4 font-h4 text-on-surface group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-on-surface font-label-md">
            <DollarSign className="w-4 h-4 text-secondary" />
            <span>{budget}</span>
          </div>
          <span className="text-xs text-on-surface-variant uppercase tracking-wider">{type}</span>
        </div>
      </div>

      <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4">
        {description}
      </p>

      <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-sm border-t border-outline-variant pt-4 mt-auto">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{postedAt}</span>
        </div>
      </div>
    </motion.div>
  );
}
