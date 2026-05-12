import React from 'react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/src/lib/constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageAlt?: string;
}

export const AuthLayout = ({ children, title, subtitle, imageAlt }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 md:px-24 bg-background">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="mb-12">
            <Link to="/" className="text-2xl font-bold text-primary">{APP_NAME}</Link>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-on-surface">{title}</h1>
            <p className="text-on-surface-variant">{subtitle}</p>
          </div>
          <div>{children}</div>
        </div>
      </div>

      {/* Right side: Image/Context (Desktop Only) */}
      <aside className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-end p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=1200&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
        <div className="relative z-10 max-w-lg">
           <div className="w-12 h-1 bg-green-400 mb-8 rounded-full" />
           <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
             "Grow your service business with {APP_NAME}."
           </h2>
           <p className="text-blue-100 text-lg">
             Join thousands of professionals scaling their independent careers on the world's most trusted marketplace.
           </p>
        </div>
      </aside>
    </div>
  );
};
