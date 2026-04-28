import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-900 leading-tight">{title}</h2>
    {subtitle && <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-semibold">{subtitle}</p>}
  </div>
);

const RevenueChart = ({ revenueData }) => (
  <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-8">
      <SectionHeader title="Revenue Overview" subtitle="Total sales performance" />
      <div className="flex bg-gray-50 p-1 rounded-lg">
        <button className="px-3 py-1 text-[10px] font-bold bg-white shadow-sm rounded-md text-gray-900 transition-all">Monthly</button>
        <button className="px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-all">Yearly</button>
      </div>
    </div>
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F8FAFC" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} 
            dy={10} 
          />
          <YAxis hide domain={[0, 'dataMax + 10']} />
          <Tooltip 
            cursor={{ fill: '#F8FAFC' }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
              fontSize: '11px',
              fontWeight: 'bold'
            }} 
          />
          <Bar 
            dataKey="signed" 
            fill="#9BC53D" 
            radius={[6, 6, 0, 0]} 
            barSize={32} 
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;
export { SectionHeader };
