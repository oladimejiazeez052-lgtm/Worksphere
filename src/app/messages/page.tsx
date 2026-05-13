'use client';
import { AppLayout } from '../../components/layout/AppLayout';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="p-6 bg-primary/10 rounded-full">
          <MessageSquare className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-on-surface-variant max-w-md">
          Your conversation hub is being prepared. Soon you'll be able to chat with clients and collaborators here.
        </p>
      </div>
    </AppLayout>
  );
}
