import { Mail, ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';

interface PortfolioPreviewProps {
  data: {
    name: string;
    role: string;
    bio: string;
    skills: string[];
    avatar: string;
  };
  templateId: string;
}

export function PortfolioPreview({ data, templateId }: PortfolioPreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col h-full bg-surface-container-highest relative overflow-hidden">
      {/* Device Toggle */}
      <div className="h-14 bg-surface border-b border-outline-variant flex items-center justify-center gap-4 px-4 sticky top-0 z-10">
        <button 
          onClick={() => setDevice('desktop')}
          className={`p-2 rounded-lg transition-all ${device === 'desktop' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setDevice('tablet')}
          className={`p-2 rounded-lg transition-all ${device === 'tablet' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Tablet className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setDevice('mobile')}
          className={`p-2 rounded-lg transition-all ${device === 'mobile' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
        >
          <Smartphone className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-outline-variant mx-2" />
        <span className="text-label-sm font-label-sm text-on-surface-variant">Live Preview</span>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-surface-container-low transition-all duration-300">
        <div 
          className={`bg-surface rounded-2xl shadow-xl border border-outline-variant overflow-hidden flex flex-col min-h-full transition-all duration-500 ${
            device === 'desktop' ? 'w-full max-w-[800px]' : device === 'tablet' ? 'w-[600px]' : 'w-[360px]'
          }`}
        >
          {/* Portfolio Content */}
          <div className="px-8 py-16 text-center border-b border-outline-variant bg-surface-container-lowest">
            <img 
              src={data.avatar} 
              alt={data.name} 
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-surface shadow-sm"
            />
            <h1 className="text-h2 font-h2 text-on-surface mb-2">{data.name}</h1>
            <p className="text-h4 font-h4 text-primary mb-4">{data.role}</p>
            <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto mb-8">
              {data.bio}
            </p>
            <div className="flex justify-center flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-surface-container-high rounded-xl text-body-sm text-on-surface">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-h3 font-h3 text-on-surface mb-8">Selected Work</h3>
            <div className={`grid grid-cols-1 gap-6 ${device !== 'mobile' ? 'md:grid-cols-2' : ''}`}>
              {[1, 2].map((i) => (
                <div key={i} className="group cursor-default bg-surface border border-outline-variant rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300">
                  <div className="aspect-video w-full bg-surface-variant overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80`} 
                      alt="Project" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-h4 font-h4 text-on-surface mb-1">Project {i}</h4>
                    <p className="text-body-sm text-on-surface-variant mb-4">A complete redesign of a complex data visualization dashboard.</p>
                    <button className="text-primary font-label-md flex items-center gap-1 hover:underline">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-8 text-center border-t border-outline-variant bg-surface-container-lowest">
            <button className="bg-primary-container text-on-primary-container font-label-md px-8 py-3 rounded-xl hover:bg-primary-container/90 transition-all flex items-center gap-2 mx-auto">
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
