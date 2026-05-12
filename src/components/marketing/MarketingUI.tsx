import React from 'react';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { ArrowRight } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const TestimonialCard = ({ quote, author, role, avatar }: TestimonialProps) => (
  <Card className="flex flex-col gap-4">
    <p className="text-on-surface-variant italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <img src={avatar} alt={author} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-bold text-on-surface">{author}</p>
        <p className="text-xs text-on-surface-variant">{role}</p>
      </div>
    </div>
  </Card>
);

interface PricingProps {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export const PricingCard = ({ title, price, features, recommended }: PricingProps) => (
  <Card className={cn("flex flex-col relative", recommended && "border-primary ring-1 ring-primary")}>
    {recommended && (
      <Badge variant="success" className="absolute -top-3 left-1/2 -translate-x-1/2">Recommended</Badge>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-3xl font-bold text-primary">{price}</span>
      <span className="text-on-surface-variant text-sm">/month</span>
    </div>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant">
          <ArrowRight className="h-3 w-3 text-secondary" /> {feature}
        </li>
      ))}
    </ul>
    <Button variant={recommended ? "primary" : "outline"} className="w-full">Choose Plan</Button>
  </Card>
);

import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
