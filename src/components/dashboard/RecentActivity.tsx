import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MapPin, Clock, CheckCircle2, Briefcase, MessageSquare } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const RECENT_JOBS = [
  { id: 1, title: 'Plumbing repair', location: 'Lagos', date: 'Today', status: 'pending', color: 'bg-yellow-500' },
  { id: 2, title: 'Electrical fix', location: 'Abuja', date: 'Yesterday', status: 'completed', color: 'bg-secondary' },
  { id: 3, title: 'Office Painting', location: 'Port Harcourt', date: '3 days ago', status: 'in-progress', color: 'bg-primary' },
];

export const RecentActivityList = () => {
  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <div className="p-6 border-b border-outline flex justify-between items-center bg-surface-container-low/50">
        <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
        <button className="text-xs font-bold text-primary hover:underline transition-all">View All</button>
      </div>
      
      <div className="divide-y divide-outline">
        {RECENT_JOBS.map((job) => (
          <div key={job.id} className="p-5 hover:bg-surface-container/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{job.title}</h4>
              <Badge 
                variant={job.status === 'completed' ? 'success' : job.status === 'pending' ? 'warning' : 'outline'}
                className="text-[9px]"
              >
                {job.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-[11px] font-bold text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 opacity-60">
                <Clock className="h-3 w-3" />
                {job.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const ActivityFeed = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
       <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">System Logs</h3>
    </div>
    <div className="space-y-2">
       {[
         { icon: MessageSquare, label: 'Message from Samuel Jenkins', time: '2h ago', bg: 'bg-primary/10 text-primary' },
         { icon: CheckCircle2, label: 'Payment of ₦25,000 released', time: '5h ago', bg: 'bg-secondary/10 text-secondary' },
         { icon: Briefcase, label: 'Proposal accepted by TechFlow', time: '1d ago', bg: 'bg-accent/10 text-accent' },
       ].map((item, idx) => (
         <div key={idx} className="flex gap-4 p-4 rounded-xl border border-outline bg-surface hover:shadow-level-1 transition-all">
           <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm", item.bg)}>
             <item.icon className="h-5 w-5" />
           </div>
           <div className="min-w-0 flex-grow">
             <p className="text-sm font-bold truncate">{item.label}</p>
             <p className="text-[10px] text-on-surface-variant font-semibold mt-0.5">{item.time}</p>
           </div>
         </div>
       ))}
    </div>
  </div>
);
