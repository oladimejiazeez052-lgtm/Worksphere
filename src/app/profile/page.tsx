'use client';
import { AppLayout } from '../../components/layout/AppLayout';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-surface p-8 rounded-card border border-outline shadow-sm flex flex-col md:flex-row items-center gap-8">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-primary/20 object-cover"
          />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{user?.name || 'Musa Adewale'}</h1>
            <p className="text-primary font-bold uppercase tracking-wider text-sm">{user?.role || 'Professional Freelancer'}</p>
            <p className="text-on-surface-variant">{user?.email || 'musa@example.com'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface p-6 rounded-card border border-outline shadow-sm">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-on-surface-variant">
              Experienced professional dedicated to delivering high-quality results. I specialize in creative problem solving and efficient project management.
            </p>
          </div>
          <div className="bg-surface p-6 rounded-card border border-outline shadow-sm">
            <h2 className="text-xl font-bold mb-4">Professional Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
