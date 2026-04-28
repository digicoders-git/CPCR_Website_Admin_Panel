import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Direct', value: 450, color: '#9BC53D' },
  { name: 'Organic', value: 300, color: '#01C79B' },
  { name: 'Referral', value: 200, color: '#F1F5F9' },
  { name: 'Social', value: 150, color: '#1A1B1F' },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Content Analytics</h2>
        <p className="text-gray-400 font-medium">Detailed tracking of user acquisition sources and channel performance.</p>
      </div>

      <div className="col-span-12 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94A3B8' }} />
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', fontSize: '11px', fontWeight: 'bold' }} 
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
