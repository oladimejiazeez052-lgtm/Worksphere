import { Job, Worker, DashboardMetrics } from '../types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior UX Designer',
    company: 'WorkSphere',
    location: 'Lagos, Nigeria',
    salary: '$50 - $80/hr',
    type: 'Contract',
    status: 'open',
    postedAt: '2 days ago',
    description: 'Looking for a senior designer to revamp our core platform...',
    tags: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'TechFlow',
    location: 'Remote',
    salary: '$70 - $120/hr',
    type: 'Full-time',
    status: 'open',
    postedAt: '5 hours ago',
    description: 'Join a fast-growing team building the future of remote work...',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w1',
    name: 'Musa Adewale',
    role: 'Senior Product Designer',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    completedJobs: 124,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    verified: true,
    skills: ['UI Design', 'Figma', 'System Design'],
  },
  {
    id: 'w2',
    name: 'Chioma Okafor',
    role: 'Frontend Architect',
    location: 'Abuja, Nigeria',
    rating: 5.0,
    completedJobs: 89,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    verified: true,
    skills: ['React', 'TypeScript', 'Next.js'],
  },
];

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  totalEarnings: 15420.50,
  activeJobs: 4,
  completedTasks: 12,
  successRate: 98,
};
