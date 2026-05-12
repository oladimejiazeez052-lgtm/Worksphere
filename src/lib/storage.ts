
type StorageKey = 'user' | 'jobs' | 'portfolio' | 'notifications' | 'settings' | 'onboarding_data' | 'ai_history';

export const storage = {
  get: <T>(key: StorageKey): T | null => {
    const data = localStorage.getItem(`worksphere_${key}`);
    return data ? JSON.parse(data) : null;
  },
  set: <T>(key: StorageKey, value: T): void => {
    localStorage.setItem(`worksphere_${key}`, JSON.stringify(value));
  },
  remove: (key: StorageKey): void => {
    localStorage.removeItem(`worksphere_${key}`);
  },
  clear: (): void => {
    localStorage.clear();
  }
};

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'Worker' | 'Client' | 'Admin';
  avatar?: string;
  onboarded: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  description: string;
  postedBy: string;
  postedAt: string;
}

export interface Portfolio {
  bio: string;
  projects: Array<{
    id: string;
    title: string;
    image: string;
    tags: string[];
  }>;
}
