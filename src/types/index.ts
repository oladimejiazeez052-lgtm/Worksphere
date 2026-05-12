export type JobStatus = 'open' | 'closed' | 'in-progress' | 'completed';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: JobStatus;
  postedAt: string;
  description: string;
  tags: string[];
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  completedJobs: number;
  avatar: string;
  verified: boolean;
  skills: string[];
}

export interface DashboardMetrics {
  totalEarnings: number;
  activeJobs: number;
  completedTasks: number;
  successRate: number;
}
