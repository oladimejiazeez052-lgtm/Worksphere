import React from 'react';
import { AuthLayout } from './AuthLayout';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { success, error } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'alex.designer@example.com' }
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      success('Successfully logged in!');
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      error('Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Please enter your details to access your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <Input 
          label="Email address" 
          placeholder="your@email.com" 
          icon={<Mail className="h-4 w-4" />}
          {...register('email')}
          error={errors.email?.message}
        />
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-on-surface uppercase tracking-wider">Password</label>
            <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
          </div>
          <Input 
            type="password"
            placeholder="••••••••" 
            icon={<Lock className="h-4 w-4" />}
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="rounded border-outline text-primary focus:ring-primary h-4 w-4" />
          <label htmlFor="remember" className="text-sm text-on-surface-variant font-medium cursor-pointer">Remember for 30 days</label>
        </div>

        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          Log In <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-center text-sm text-on-surface-variant font-medium">
          Don't have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary font-bold hover:underline">Sign up for free</Link>
        </p>
      </form>
    </AuthLayout>
  );
};
