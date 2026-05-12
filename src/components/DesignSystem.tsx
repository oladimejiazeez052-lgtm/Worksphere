import React from 'react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Table } from '@/src/components/ui/Table';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Search, Mail, Filter } from 'lucide-react';

export const DesignSystemPage = () => {
  return (
    <div className="space-y-12">
      <SectionHeader 
        title="Design System" 
        description="Foundational UI components and tokens for WorkSphere."
        action={<Button icon={<Filter className="h-4 w-4" />}>Settings</Button>}
      />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-primary shadow-level-1"></div>
            <p className="text-xs font-semibold">Primary (#2563EB)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-secondary shadow-level-1"></div>
            <p className="text-xs font-semibold">Secondary (#10B981)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-accent shadow-level-1"></div>
            <p className="text-xs font-semibold">Accent (#F59E0B)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-background border border-outline shadow-level-1"></div>
            <p className="text-xs font-semibold">Background (#F9FAFB)</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-surface border border-outline shadow-level-1"></div>
            <p className="text-xs font-semibold">Surface (#FFFFFF)</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline Action</Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button disabled>Disabled Button</Button>
          <Button isLoading>Loading Button</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Inputs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Default Input" placeholder="Basic text field" />
          <Input label="Input with Icon" placeholder="Search components..." icon={<Search className="h-4 w-4" />} />
          <Input label="Email Input" type="email" placeholder="email@worksphere.com" icon={<Mail className="h-4 w-4" />} />
          <Input label="Error State" value="invalid-email" error="Please enter a valid email address." readOnly />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Status Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success / Verified</Badge>
          <Badge variant="warning">Warning / In Progress</Badge>
          <Badge variant="error">Error / Closed</Badge>
          <Badge variant="outline">Outline Tag</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Cards & Elevation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-bold mb-2">Standard Card</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Standard elevation (shadow-level-1) for content containers.
            </p>
          </Card>
          <Card hoverable>
            <h3 className="font-bold mb-2">Hoverable Card</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Expands on hover to shadow-level-2 with a primary border.
            </p>
          </Card>
          <Card className="bg-primary/5 border-primary/20 shadow-level-3">
            <h3 className="font-bold mb-2">High Elevation Card</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Shadow-level-3 for overlays or prominent content.
            </p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Table Primitive</h2>
        <Table 
          headers={['Job Title', 'Company', 'Status', 'Earnings']}
          data={[
            ['Senior Designer', 'WorkSphere', <Badge variant="success">Open</Badge>, '$8,400'],
            ['Backend dev', 'Globex', <Badge variant="warning">Pending</Badge>, '$6,200'],
            ['Mobile Lead', 'Acme', <Badge variant="error">Closed</Badge>, '$12,000'],
          ]}
        />
      </section>

      <section className="space-y-4 pb-12">
        <h2 className="text-xl font-bold">Skeleton Loading States</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
