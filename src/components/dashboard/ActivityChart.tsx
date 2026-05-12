import React from 'react';
import { Card } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', jobs: 3 },
  { name: 'Tue', jobs: 8 },
  { name: 'Wed', jobs: 2 },
  { name: 'Thu', jobs: 11 },
  { name: 'Fri', jobs: 5 },
  { name: 'Sat', jobs: 1 },
  { name: 'Sun', jobs: 6 },
];

export const ActivityChart = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold tracking-tight">Weekly Job Activity</h3>
        <select className="bg-transparent border-0 text-xs font-bold text-primary focus:ring-0 cursor-pointer">
          <option>This Week</option>
          <option>Last Month</option>
        </select>
      </div>
      
      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #E5E7EB', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="jobs" 
              stroke="#2563EB" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorJobs)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
