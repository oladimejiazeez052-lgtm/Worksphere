import React from 'react';
import { AppLayout } from '../layout/AppLayout';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { KPICard } from './KPICard';
import { ActivityChart } from './ActivityChart';
import { RecentActivityList, ActivityFeed } from './RecentActivity';
import { Send, CheckCircle2, Wallet, Eye, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

import { useAuth } from '../../hooks/useAuth';

export const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <SectionHeader 
          title={`Welcome back, ${user?.name?.split(' ')[0] || 'Alex'}`} 
          description="Here's what's happening with your freelance business today."
          action={
            <Button className="shadow-lg">
              <Plus className="mr-2 h-4 w-4" /> Find New Jobs
            </Button>
          }
        />

        {/* Dashboard Content for Mobile specifically might use different order in Stitch screens, 
            but for consistency we use a responsive grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <motion.div variants={item}>
              <KPICard 
                label="Jobs Applied" 
                value={24} 
                trend="+3 this week" 
                trendDirection="up" 
                icon={Send} 
                variant="primary"
              />
            </motion.div>
            <motion.div variants={item}>
              <KPICard 
                label="Jobs Completed" 
                value={12} 
                trend="+1 this week" 
                trendDirection="up" 
                icon={CheckCircle2} 
                variant="secondary"
              />
            </motion.div>
            <motion.div variants={item}>
              <KPICard 
                label="Earnings" 
                value="₦250k" 
                trend="+15% from last month" 
                trendDirection="up" 
                icon={Wallet} 
                variant="accent"
              />
            </motion.div>
            <motion.div variants={item}>
              <KPICard 
                label="Profile Views" 
                value={180} 
                trend="-5% this week" 
                trendDirection="down" 
                icon={Eye} 
                variant="default"
              />
            </motion.div>
          </div>

          {/* Main Visuals & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={item} className="lg:col-span-2">
              <ActivityChart />
            </motion.div>
            <motion.div variants={item}>
              <RecentActivityList />
            </motion.div>
          </div>

          {/* Bottom Feed */}
          <motion.div variants={item} className="max-w-3xl">
             <ActivityFeed />
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};
