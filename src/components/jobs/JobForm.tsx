import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Info, Plus, X, DollarSign, Clock, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/routes';
import { useToast } from '../../hooks/useToast';

import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const jobSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  locationType: z.enum(['worldwide', 'specific']),
  description: z.string().min(50, "Description must be at least 50 characters"),
  budgetType: z.enum(['fixed', 'hourly']),
  budget: z.string().min(1, "Budget is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export function JobForm() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>(['UI Design', 'Prototyping']);
  const [skillInput, setSkillInput] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const { success } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      locationType: 'worldwide',
      budgetType: 'fixed',
    }
  });

  const onSubmit = async (data: JobFormValues) => {
    if (!user) return;
    
    const { error } = await supabase.from('jobs').insert({
      title: data.title,
      category: data.category,
      budget: `${data.budgetType === 'hourly' ? '$' : ''}${data.budget}${data.budgetType === 'hourly' ? '/hr' : ''}`,
      location: data.locationType === 'worldwide' ? 'Remote' : 'Specific',
      type: data.budgetType,
      description: data.description,
      posted_by: user.id
    });

    if (error) {
      console.error('Error posting job:', error);
      return;
    }

    success("Job posted successfully!");
    router.push(ROUTES.JOBS);
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
      {/* Stepper */}
      <div className="w-full flex items-center justify-between relative before:absolute before:top-4 before:h-[2px] before:w-full before:bg-surface-variant before:z-0">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md ring-4 ring-surface bg-background transition-colors ${
              step >= i ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {i}
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${step >= i ? 'text-primary' : 'text-on-surface-variant'}`}>
              {['Basics', 'Details', 'Budget', 'Review'][i-1]}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-surface rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-h4 font-h4 text-on-surface flex items-center gap-2">
                Job Basics
                <Info className="w-4 h-4 text-on-surface-variant" />
              </h2>
              
              <div className="space-y-2">
                <label className="font-label-md text-on-surface">Job Title</label>
                <input
                  {...register('title')}
                  placeholder="e.g. Senior UX Designer needed for Fintech App"
                  className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                />
                {errors.title && <p className="text-error text-xs">{errors.title.message}</p>}
                <p className="text-xs text-on-surface-variant">Make it descriptive and clear.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface">Category</label>
                  <select {...register('category')} className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary">
                    <option value="">Select Category</option>
                    <option value="design">Design & Creative</option>
                    <option value="dev">Development & IT</option>
                  </select>
                  {errors.category && <p className="text-error text-xs">{errors.category.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface">Subcategory</label>
                  <select {...register('subcategory')} className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 outline-none focus:border-primary">
                    <option value="">Select Subcategory</option>
                    <option value="ui">UI/UX Design</option>
                    <option value="web">Web Development</option>
                  </select>
                  {errors.subcategory && <p className="text-error text-xs">{errors.subcategory.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-on-surface">Required Skills</label>
                <div className="flex flex-wrap gap-2 p-2 border border-outline-variant rounded-xl bg-surface-container-lowest">
                  {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1 px-3 py-1 bg-surface-container-high rounded-lg text-sm transition-all hover:bg-surface-variant">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}><X className="w-3 h-3 text-on-surface-variant" /></button>
                    </span>
                  ))}
                  <div className="flex-1 min-w-[120px] flex items-center">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="Add a skill..."
                      className="w-full bg-transparent border-none p-1 focus:ring-0 text-sm"
                    />
                    <button type="button" onClick={addSkill} className="p-1 px-2 text-primary hover:bg-primary/10 rounded-lg"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <h3 className="font-label-md text-on-surface">Location Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    watch('locationType') === 'worldwide' ? 'border-primary bg-primary-container/5' : 'border-outline-variant hover:border-primary'
                  }`}>
                    <input type="radio" value="worldwide" {...register('locationType')} className="mt-1" />
                    <div>
                      <span className="block font-label-md text-on-surface">Worldwide</span>
                      <span className="text-xs text-on-surface-variant">Any location can apply.</span>
                    </div>
                  </label>
                  <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    watch('locationType') === 'specific' ? 'border-primary bg-primary-container/5' : 'border-outline-variant hover:border-primary'
                  }`}>
                    <input type="radio" value="specific" {...register('locationType')} className="mt-1" />
                    <div>
                      <span className="block font-label-md text-on-surface">Specific Location</span>
                      <span className="text-xs text-on-surface-variant">Restrict to specific regions.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-h4 font-h4 text-on-surface">Job Description</h2>
              <textarea
                {...register('description')}
                rows={10}
                placeholder="Describe the job in detail, including key responsibilities and expectations..."
                className="w-full bg-transparent border border-outline-variant rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none placeholder:text-on-surface-variant/50"
              />
              {errors.description && <p className="text-error text-xs">{errors.description.message}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-h4 font-h4 text-on-surface">Budget & Payment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  watch('budgetType') === 'fixed' ? 'border-primary bg-primary-container/5' : 'border-outline-variant hover:border-primary'
                }`}>
                  <input type="radio" value="fixed" {...register('budgetType')} className="mt-1" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-container-high rounded-lg"><DollarSign className="w-5 h-5 text-primary" /></div>
                    <div>
                      <span className="block font-label-md text-on-surface">Fixed Price</span>
                      <span className="text-xs text-on-surface-variant lowercase">Negotiate a total amount.</span>
                    </div>
                  </div>
                </label>
                <label className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  watch('budgetType') === 'hourly' ? 'border-primary bg-primary-container/5' : 'border-outline-variant hover:border-primary'
                }`}>
                  <input type="radio" value="hourly" {...register('budgetType')} className="mt-1" />
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-container-high rounded-lg"><DollarSign className="w-5 h-5 text-secondary" /></div>
                    <div>
                      <span className="block font-label-md text-on-surface">Hourly Rate</span>
                      <span className="text-xs text-on-surface-variant lowercase">Pay per hour of work.</span>
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="font-label-md text-on-surface">Budget Amount ($)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</div>
                  <input
                    {...register('budget')}
                    placeholder="e.g. 500"
                    type="number"
                    className="w-full bg-transparent border border-outline-variant rounded-xl pl-10 pr-4 py-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                {errors.budget && <p className="text-error text-xs">{errors.budget.message}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-h4 font-h4 text-on-surface">Review Your Post</h2>
              <div className="space-y-6 bg-surface-container-low p-8 rounded-2xl border border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Title</label>
                    <p className="font-label-md text-on-surface">{watch('title') || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Budget</label>
                    <p className="font-label-md text-on-surface">
                      ${watch('budget') || '0'} ({watch('budgetType')})
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Category</label>
                    <p className="font-label-md text-on-surface">{watch('category')} &rsaquo; {watch('subcategory')}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Location</label>
                    <p className="font-label-md text-on-surface uppercase tracking-tight">{watch('locationType')}</p>
                  </div>
                </div>
                <div>
                   <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1 block">Description</label>
                   <p className="text-sm text-on-surface leading-relaxed line-clamp-4">{watch('description') || 'No description provided.'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
            <button
              type="button"
              className="text-on-surface-variant font-label-md hover:text-on-surface transition-colors"
              onClick={() => console.log("Canceled")}
            >
              Cancel
            </button>
            <div className="flex gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 rounded-xl font-label-md border-2 border-primary text-primary hover:bg-primary/5 transition-all"
                >
                  Previous
                </button>
              )}
              <button
                type={step === 4 ? "submit" : "button"}
                disabled={isSubmitting}
                onClick={() => step < 4 && setStep(step + 1)}
                className="px-8 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:bg-primary-container/90 flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {step === 4 ? 'Submit Job' : 'Next Step'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
        </div>
      </form>
    </div>
  );
}
