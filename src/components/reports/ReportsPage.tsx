import { AppLayout } from '../layout/AppLayout';
import { EarningsChart, JobsBarChart } from './AnalyticsCharts';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUp, TrendingDown, Wallet, CheckCircle, Star, Users } from 'lucide-react';
import { motion } from 'motion/react';

const STATS = [
  { label: 'Total Earnings', value: '$12,450', trend: '+14.2%', up: true, icon: Wallet, color: 'text-primary' },
  { label: 'Jobs Completed', value: '48', trend: '+5', up: true, icon: CheckCircle, color: 'text-secondary' },
  { label: 'Success Rate', value: '98.5%', trend: 'Stable', up: true, icon: Star, color: 'text-tertiary' },
  { label: 'Profile Views', value: '1,204', trend: '-2.4%', up: false, icon: Users, color: 'text-primary' },
];

export function ReportsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-8">
        <header className="mb-10">
          <h1 className="text-h2 font-h2 text-on-surface">Analytics Overview</h1>
          <p className="text-body-lg text-on-surface-variant">Track your performance and financial activity.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-surface-container-high ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="font-label-md text-on-surface-variant">{stat.label}</span>
                </div>
                <h3 className="text-h3 font-h3 text-on-surface mb-2">{stat.value}</h3>
                <div className={`flex items-center gap-1 font-label-sm text-sm ${stat.up ? 'text-secondary' : 'text-error'}`}>
                  {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.trend} vs last period
                </div>
                {/* Abstract background icon */}
                <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-h4 font-h4 text-on-surface">Earnings Over Time</h3>
                <p className="text-body-sm text-on-surface-variant">Daily revenue for the current month</p>
              </div>
              <Badge variant="outline">June 2024</Badge>
            </div>
            <EarningsChart />
          </Card>

          <Card className="p-8">
            <h3 className="text-h4 font-h4 text-on-surface mb-6">Job Success Volume</h3>
            <p className="text-body-sm text-on-surface-variant mb-6">Volume of delivered projects this week</p>
            <JobsBarChart />
            <div className="mt-10 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Target met</span>
                <span className="font-bold text-secondary">85%</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full" style={{ width: '85%' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
