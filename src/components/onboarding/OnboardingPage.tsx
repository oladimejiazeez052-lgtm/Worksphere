import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/routes';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Check, ArrowRight, MapPin, Star, Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const STEPS = [
  { id: 1, title: 'Welcome', description: 'Account created' },
  { id: 2, title: 'Profile Setup', description: 'Tell us about yourself' },
  { id: 3, title: 'Expertise', description: 'Platform overview' },
  { id: 4, title: 'Complete', description: 'Ready to start' },
];

export const OnboardingPage = () => {
  const router = useRouter();
  const { updateUser } = useAuth();
  const { success } = useToast();
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({
    category: '',
    location: '',
    experience: 'Intermediate'
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      updateUser({ onboarded: true });
      success('Welcome to WorkSphere!');
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleBack = () => {
    if (currentStep > 2) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-surface border border-outline rounded-card shadow-level-1 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Progress */}
        <div className="w-full md:w-80 bg-surface-container p-8 border-r border-outline flex flex-col">
          <div className="mb-12">
            <span className="text-2xl font-bold text-primary tracking-tight">WorkSphere</span>
          </div>
          <div className="space-y-8 relative flex-grow">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-outline z-0" />
            {STEPS.map((step) => (
              <div key={step.id} className="relative z-10 flex items-start gap-4">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all",
                  currentStep > step.id ? "bg-primary border-primary text-white" : 
                  currentStep === step.id ? "bg-white border-primary text-primary ring-4 ring-primary/20" : 
                  "bg-white border-outline text-on-surface-variant"
                )}>
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{step.id}</span>}
                </div>
                <div>
                  <p className={cn("text-xs font-bold uppercase tracking-wider transition-colors", currentStep === step.id ? "text-primary" : "text-on-surface-variant")}>
                    {step.title}
                  </p>
                  <p className="text-xs text-on-surface-variant/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-8 md:p-12 flex flex-col">
          <AnimatePresence mode="wait">
            {currentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-grow"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight">Set up your profile</h1>
                  <p className="text-on-surface-variant">Help us personalize your WorkSphere experience by providing a few details.</p>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface opacity-80">Primary Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-surface border border-outline rounded-input px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                    >
                      <option value="" disabled>Select your field</option>
                      <option value="design">Design & Creative</option>
                      <option value="dev">Development & IT</option>
                      <option value="sales">Sales & Marketing</option>
                    </select>
                  </div>
                  <Input 
                    label="Location" 
                    placeholder="Lagos, Nigeria" 
                    icon={<MapPin className="h-4 w-4" />}
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                  <div className="space-y-3">
                     <label className="text-xs font-semibold uppercase tracking-wider text-on-surface opacity-80">Experience Level</label>
                     <div className="flex flex-wrap gap-3">
                        {['Entry Level', 'Intermediate', 'Expert'].map((level) => (
                          <button 
                            key={level} 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                            className={cn(
                              "px-4 py-2 rounded-chip text-sm font-semibold border transition-all",
                              formData.experience === level ? "bg-primary/10 border-primary text-primary" : "bg-white border-outline text-on-surface-variant hover:border-primary/50"
                            )}
                          >
                            {level}
                          </button>
                        ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 flex-grow"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight">Unlock Opportunities</h1>
                  <p className="text-on-surface-variant">Take a quick tour of our core features designed for your success.</p>
                </div>
                <div className="grid gap-4">
                  <Card className="flex items-center gap-4 bg-primary/5 border-primary/20">
                     <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                       <Rocket className="h-5 w-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm">Boost Proposal Exposure</p>
                       <p className="text-xs text-on-surface-variant">Your proposals get highlighted when they match closely with client needs.</p>
                     </div>
                  </Card>
                  <Card className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                       <Star className="h-5 w-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm">Earn Verified Status</p>
                       <p className="text-xs text-on-surface-variant">Pass our quality checks to earn the green badge and build trust faster.</p>
                     </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 flex flex-col items-center justify-center text-center flex-grow py-12"
              >
                <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <Check className="h-10 w-10 stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight">You're all set!</h1>
                  <p className="text-on-surface-variant max-w-sm">Welcome to WorkSphere. Your profile is ready for Nigeria's top premium jobs.</p>
                </div>
                <Button size="lg" className="px-12" onClick={handleNext}>
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {currentStep < 4 && (
            <div className="mt-auto pt-8 border-t border-outline flex justify-between items-center">
              <button 
                onClick={handleBack} 
                className="text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-0"
                disabled={currentStep === 2}
              >
                Back
              </button>
              <Button size="lg" onClick={handleNext} className="px-8">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
