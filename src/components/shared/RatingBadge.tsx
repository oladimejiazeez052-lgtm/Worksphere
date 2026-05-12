import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export function RatingBadge({ rating, className = "" }: RatingBadgeProps) {
  return (
    <div className={`flex items-center gap-1 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm ${className}`}>
      <Star className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
      <span className="font-label-sm text-label-sm text-on-surface">{rating.toFixed(1)}</span>
    </div>
  );
}
