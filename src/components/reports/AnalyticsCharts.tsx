import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const EARNINGS_DATA = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 2100 },
  { name: 'Mar', amount: 1800 },
  { name: 'Apr', amount: 3200 },
  { name: 'May', amount: 2500 },
  { name: 'Jun', amount: 4250 },
];

export function EarningsChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={EARNINGS_DATA}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e2ed" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#737686', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#737686', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#191b23', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff' 
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#004ac6" 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const JOBS_DATA = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 7 },
  { name: 'Wed', count: 5 },
  { name: 'Thu', count: 8 },
  { name: 'Fri', count: 6 },
  { name: 'Sat', count: 3 },
  { name: 'Sun', count: 5 },
];

export function JobsBarChart() {
  return (
    <div className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={JOBS_DATA}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e2ed" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#737686', fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 74, 198, 0.05)' }}
            contentStyle={{ 
              backgroundColor: '#191b23', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff' 
            }}
          />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
