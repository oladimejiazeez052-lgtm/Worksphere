import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/src/lib/routes';
import { Button } from '@/src/components/ui/Button';
import { LayoutDashboard, Users, ShieldCheck, Zap, ArrowRight, Menu } from 'lucide-react';
import { TestimonialCard, PricingCard } from '@/src/components/marketing/MarketingUI';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-outline">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">WorkSphere</Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Success Stories</a>
            <a href="#pricing" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={ROUTES.LOGIN}>
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 py-20 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Connecting talent to <span className="text-primary italic">opportunity</span> everywhere
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                Hire trusted professionals or showcase your skills globally on the most secure, efficient marketplace for the modern corporate world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.REGISTER}>
                  <Button size="lg" className="w-full sm:w-auto px-8">Find Your Next Job</Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">Post a Project</Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-on-surface-variant font-medium">
                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-secondary" /> Secure Escrow</span>
                <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-accent" /> AI-Powered Matching</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Workspace" 
                className="rounded-card shadow-level-3 relative z-10 border border-outline"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Everything you need to grow</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Scalable solutions for independent professionals and growing enterprises.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-8 rounded-card border border-outline bg-surface hover:border-primary transition-colors group">
               <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                 <Users className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold mb-3">Vetted Talent Pool</h3>
               <p className="text-sm text-on-surface-variant leading-relaxed">Access top-tier workers from Abuja to Lagos and beyond, all verified for skill and reliability.</p>
             </div>
             <div className="p-8 rounded-card border border-outline bg-surface hover:border-primary transition-colors group">
               <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                 <Zap className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold mb-3">AI Recommendations</h3>
               <p className="text-sm text-on-surface-variant leading-relaxed">Smart job matching and proposal feedback to help you land the right opportunities faster.</p>
             </div>
             <div className="p-8 rounded-card border border-outline bg-surface hover:border-primary transition-colors group">
               <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                 <LayoutDashboard className="h-6 w-6" />
               </div>
               <h3 className="text-xl font-bold mb-3">Project Management</h3>
               <p className="text-sm text-on-surface-variant leading-relaxed">Integrated tools for tracking milestones, files, and communications in one clean dashboard.</p>
             </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 bg-surface-container/30 border-y border-outline">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="WorkSphere transformed how I find clients. The platform's trust system is the best I've used."
                author="Musa Adewale"
                role="Senior UI Designer"
                avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
              />
              <TestimonialCard 
                quote="As a client, I found a developer in Lagos within 24 hours. The AI matching is dangerously accurate."
                author="Chioma Okafor"
                role="Product Manager @ TechFlow"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              />
              <TestimonialCard 
                quote="Finally, a professional network built for high-end corporate projects. Clear, robust, and reliable."
                author="Samuel Ebuka"
                role="Full Stack Architect"
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
           <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Simple, transparent pricing</h2>
            <p className="text-on-surface-variant">Choose the plan that fits your professional needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Individual"
              price="$0"
              features={['Unlimited profile views', '5 Active proposals', 'Basic portfolio builder', 'Community support']}
            />
            <PricingCard 
              title="Professional"
              price="$19"
              features={['Everything in Individual', 'Unlimited proposals', 'AI profile optimizer', 'Priority job access', 'Advanced analytics']}
              recommended
            />
            <PricingCard 
              title="Enterprise"
              price="$149"
              features={['Everything in Pro', 'Unlimited team seats', 'Dedicated manager', 'API access', 'Custom contracts']}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-outline bg-surface">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <span className="text-2xl font-bold text-primary">WorkSphere</span>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Empowering the next generation of professional talent to work on their terms.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><Link href="/jobs" className="hover:text-primary">Find Work</Link></li>
                <li><Link href="/workers" className="hover:text-primary">Hire Talent</Link></li>
                <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Safety & Trust</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline text-center text-sm text-on-surface-variant">
            © {new Date().getFullYear()} WorkSphere Professional Services. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};
