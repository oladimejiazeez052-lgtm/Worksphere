import React from 'react';
import { Skeleton } from '../ui/Skeleton';
import { Card } from '../ui/Card';
import { AppLayout } from '../layout/AppLayout';

export function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-8 md:py-12 space-y-10">
        <header className="space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96 opacity-60" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-1.5 w-full opacity-30" />
            </Card>
          ))}
        </div>

        <Card className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-64 w-full opacity-40" />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-8 space-y-6">
            <Skeleton className="h-6 w-40" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-2">
                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4 opacity-60" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </Card>
          <Card className="p-8 space-y-6 flex flex-col items-center justify-center">
            <Skeleton className="h-6 w-32 self-start" />
            <Skeleton className="h-40 w-40 rounded-full border-8 border-surface-container-highest" />
            <Skeleton className="h-10 w-full mt-4" />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i} className="p-4 flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2 opacity-60" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </Card>
      ))}
    </div>
  );
}
