import React from 'react';
import { AuthLayout } from './AuthLayout';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { User, Mail, Lock, Briefcase, UserCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['worker', 'client']),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { success, error } = useToast();
  
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'worker' }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    try {
      const role = data.role === 'worker' ? 'Worker' : 'Client';
      await registerUser(`${data.firstName} ${data.lastName}`, data.email, role, data.password);
      success('Account created successfully!');
      navigate(ROUTES.ONBOARDING);
    } catch (e) {
      error('Failed to create account. Please try again.');
    }
  };

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Join the network of top professionals globally."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <label className="text-xs font-semibold text-on-surface uppercase tracking-wider block mb-4">I want to...</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setValue('role', 'worker')}
            className={cn(
              "flex flex-col p-4 rounded-xl border text-left transition-all relative overflow-hidden",
              selectedRole === 'worker' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-outline bg-surface hover:border-primary/50"
            )}
          >
            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mb-4 transition-colors", selectedRole === 'worker' ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant")}>
              <UserCircle className="h-5 w-5" />
            </div>
            <span className="font-bold text-sm">Find Work</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-bold mt-1 tracking-tight">Apply to jobs</span>
            {selectedRole === 'worker' && <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => setValue('role', 'client')}
            className={cn(
              "flex flex-col p-4 rounded-xl border text-left transition-all relative overflow-hidden",
              selectedRole === 'client' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-outline bg-surface hover:border-primary/50"
            )}
          >
            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mb-4 transition-colors", selectedRole === 'client' ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant")}>
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="font-bold text-sm">Hire Talent</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-bold mt-1 tracking-tight">Post jobs</span>
            {selectedRole === 'client' && <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-primary" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="First Name" 
            placeholder="Jane" 
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input 
            label="Last Name" 
            placeholder="Doe" 
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        <Input 
          label="Email address" 
          placeholder="your@email.com" 
          icon={<Mail className="h-4 w-4" />}
          {...register('email')}
          error={errors.email?.message}
        />

        <Input 
          label="Password"
          type="password"
          placeholder="••••••••" 
          icon={<Lock className="h-4 w-4" />}
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          Create Account <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-center text-sm text-on-surface-variant font-medium">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-bold hover:underline">Log In</Link>
        </p>
      </form>
    </AuthLayout>
  );
};
