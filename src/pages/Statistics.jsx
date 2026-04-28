import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', visits: 4000, orders: 2400 },
  { name: 'Tue', visits: 3000, orders: 1398 },
  { name: 'Wed', visits: 2000, orders: 9800 },
  { name: 'Thu', visits: 2780, orders: 3908 },
  { name: 'Fri', visits: 1890, orders: 4800 },
  { name: 'Sat', visits: 2390, orders: 3800 },
  { name: 'Sun', visits: 3490, orders: 4300 },
];

const Statistics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Traffic Statistics</h2>
        <p className="text-gray-400 font-medium leading-relaxed">Comprehensive detailed report of visits and orders across different days of the week.</p>
      </div>

      <div className="col-span-12 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9BC53D" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#9BC53D" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }} />
            <Area type="monotone" dataKey="visits" stroke="#9BC53D" fill="url(#colorVisits)" strokeWidth={3} />
            <Area type="monotone" dataKey="orders" stroke="#01C79B" fill="none" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
