import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

const EfficiencyChart = ({ efficiencyData }) => (
  <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
    <div className="bg-gradient-to-br from-[#1a1b1f] to-[#2d2e32] text-white rounded-2xl p-7 relative overflow-hidden group">
      <div className="relative z-10">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Current Progress</p>
        <h3 className="text-3xl font-black mb-8">$45,204 <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded ml-2">+12%</span></h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-white/60">Monthly Goal</span>
            <span>85%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '85%' }} 
              transition={{ duration: 1.5 }}
              className="h-full bg-primary shadow-[0_0_15px_rgba(155,197,61,0.4)]" 
            />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex-1">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Efficiency Focus</p>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie data={efficiencyData} innerRadius={35} outerRadius={50} paddingAngle={10} dataKey="value" stroke="none">
                {efficiencyData.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[14px] font-black text-gray-900 leading-none">A+</span>
            <span className="text-[8px] text-gray-400 font-bold uppercase mt-0.5">Rating</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {efficiencyData.slice(0, 3).map((e, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">{e.name}</span>
              </div>
              <span className="text-[11px] font-black text-gray-900">{e.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default EfficiencyChart;
