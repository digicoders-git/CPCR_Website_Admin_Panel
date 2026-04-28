import { motion } from 'framer-motion';
import { cn } from '../common/NavItem';

const StatCard = ({ title, value, change, trend, color, icon: Icon, idx }) => (
  <motion.div 
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: idx * 0.08 }}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{title}</p>
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', color)}>
        <Icon size={16} className={trend === 'up' ? 'text-primary' : 'text-rose-400'} />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
    <div className="flex items-center gap-2 mt-3">
      <span className={cn(
        'text-[11px] font-semibold px-2 py-0.5 rounded-md',
        trend === 'up' ? 'bg-primary/10 text-primary' : 'bg-rose-50 text-rose-500'
      )}>
        {change}
      </span>
      <span className="text-[11px] text-gray-400">vs last week</span>
    </div>
  </motion.div>
);

export default StatCard;
