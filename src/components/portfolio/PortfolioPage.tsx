import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '../layout/AppLayout';
import { PortfolioTemplateSelector } from './PortfolioTemplateSelector';
import { PortfolioPreview } from './PortfolioPreview';
import { User, Folder, Plus, Edit2, CheckCircle, Save, Sparkles } from 'lucide-react';
import { ROUTES } from '../../lib/routes';
import { motion } from 'motion/react';
import { PublishModal } from './PublishModal';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export function PortfolioPage() {
  const { user } = useAuth();
  const { success } = useToast();
  const [templateId, setTemplateId] = useState('modern');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "Alex Rivera",
    role: user?.role === 'Worker' ? "Senior UX/UI Designer" : "Professional Client",
    bio: "Crafting intuitive digital experiences that balance user needs with business goals. Over 8 years of experience in creating modern web and mobile applications.",
    skills: ["Figma", "User Research", "Prototyping", "React"],
    avatar: user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  });

  const handlePublish = () => {
    setIsPublishModalOpen(true);
    success('Portfolio draft published!');
  };

  const handleSave = () => {
    success('Portfolio draft saved successfully!');
  };

  return (
    <AppLayout>
      <div className="flex bg-surface-container-low h-[calc(100vh-64px)]">
        {/* Editor Side */}
        <div className="w-full md:w-[480px] lg:w-[560px] border-r border-outline-variant bg-surface overflow-y-auto px-8 py-10 flex flex-col gap-10">
          <header className="space-y-2">
            <h1 className="text-h2 font-h2 text-on-surface">Portfolio Builder</h1>
            <p className="text-body-md text-on-surface-variant">Customize your professional presence.</p>
          </header>

          <PortfolioTemplateSelector selectedId={templateId} onSelect={setTemplateId} />

          {/* Profile Section */}
          <section className="space-y-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
            <h3 className="text-h4 font-h4 text-on-surface flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Info
            </h3>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-variant overflow-hidden border-2 border-outline-variant relative group">
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                <button className="absolute inset-0 bg-on-surface/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Edit2 className="w-6 h-6 text-surface" />
                </button>
              </div>
              <button className="px-4 py-2 border-2 border-primary text-primary rounded-xl font-label-md hover:bg-primary/5 transition-all">
                Change Photo
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Full Name</label>
                <input 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Professional Title</label>
                <input 
                  value={profile.role} 
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Bio</label>
                  <Link 
                    href={ROUTES.AI_PROFILE}
                    className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Bio Generator
                  </Link>
                </div>
                <textarea 
                  value={profile.bio} 
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant mb-10">
            <div className="flex justify-between items-center">
              <h3 className="text-h4 font-h4 text-on-surface flex items-center gap-2">
                <Folder className="w-5 h-5 text-primary" />
                Featured Projects
              </h3>
              <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-surface border border-outline-variant p-3 rounded-xl flex gap-3 group hover:border-primary transition-all">
                  <div className="w-14 h-14 rounded-lg bg-surface-variant overflow-hidden shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-on-surface truncate">Project {i}</p>
                    <p className="text-xs text-on-surface-variant truncate">UI Design, Case Study</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 text-on-surface-variant hover:text-primary transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Action Bar Mobile/Sticky */}
          <div className="md:hidden sticky bottom-0 left-0 right-0 p-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant flex gap-4">
            <button className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-label-md">Save Draft</button>
            <button onClick={handlePublish} className="flex-1 py-3 bg-primary-container text-on-primary-container rounded-xl font-label-md shadow-sm">Publish</button>
          </div>
        </div>

        {/* Preview Side */}
        <div className="hidden md:block flex-1">
          <PortfolioPreview data={profile} templateId={templateId} />
          
          <div className="absolute bottom-8 right-8 flex gap-4">
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-label-md shadow-lg flex items-center gap-2"
             >
               <Save className="w-4 h-4" />
               Save Draft
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={handlePublish}
               className="px-8 py-3 bg-primary-container text-on-primary-container rounded-xl font-label-md shadow-xl flex items-center gap-2"
             >
               <CheckCircle className="w-4 h-4" />
               Publish Live
             </motion.button>
          </div>
        </div>
      </div>
      <PublishModal 
        isOpen={isPublishModalOpen} 
        onClose={() => setIsPublishModalOpen(false)} 
        url={`worksphere.com/${profile.name.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </AppLayout>
  );
}
