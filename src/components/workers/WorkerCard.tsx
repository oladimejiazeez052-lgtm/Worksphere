import { MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { RatingBadge } from '../shared/RatingBadge';

interface WorkerCardProps {
  key?: string | number;
  name: string;
  role: string;
  location: string;
  rating: number;
  skills: string[];
  avatar: string;
  isVerified?: boolean;
  className?: string;
}

export function WorkerCard({
  name,
  role,
  location,
  rating,
  skills,
  avatar,
  isVerified,
  className = ""
}: WorkerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-surface border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col ${className}`}
    >
      <div className="relative h-48 w-full bg-surface-container">
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover"
        />
        <RatingBadge rating={rating} className="absolute top-3 right-3" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-h4 font-h4 text-on-surface">{name}</h3>
              {isVerified && <CheckCircle className="w-4 h-4 text-secondary fill-secondary-container" />}
            </div>
            <p className="text-body-sm text-on-surface-variant">{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-outline mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-body-sm text-xs">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 flex-grow content-start">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-label-md"
            >
              {skill}
            </span>
          ))}
        </div>

        <button className="w-full bg-primary-container text-on-primary-container font-label-md py-2.5 rounded-xl hover:bg-primary-container/90 active:scale-[0.98] transition-all">
          Hire Worker
        </button>
      </div>
    </motion.div>
  );
}
