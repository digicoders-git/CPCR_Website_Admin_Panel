import React from 'react';
import { SectionHeader } from './RevenueChart';
import { cn } from '../common/NavItem';

const UserAvatar = ({ name, index }) => {
  const [hasError, setHasError] = React.useState(false);
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
      {!hasError ? (
        <img
          src={`https://avatar.iran.liara.run/public/${index + 20}`}
          className="w-full h-full object-cover"
          alt={name}
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-[11px] font-bold text-gray-600">{initials}</span>
      )}
    </div>
  );
};

const ActivityTable = ({ transactions }) => (
  <div className="col-span-12 xl:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-8">
      <SectionHeader title="Recent Activity" subtitle="Real-time audit log" />
      <button className="text-[11px] font-bold text-primary hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-all">View All</button>
    </div>
    <div className="hidden md:grid grid-cols-3 px-3 pb-3 text-[10px] font-black uppercase tracking-[0.16em] text-gray-400 border-b border-gray-100">
      <p>User</p>
      <p className="text-center">Date</p>
      <p className="text-right">Amount / Status</p>
    </div>
    <div className="space-y-1 pt-1">
      {transactions.map((t, i) => (
        <div key={i} className="flex items-center justify-between px-3 py-3.5 rounded-xl transition-all cursor-pointer group border-b border-gray-100/70 last:border-b-0 hover:bg-gray-50/60">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <UserAvatar name={t.name} index={i} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <div className={cn("w-2 h-2 rounded-full", i === 1 ? "bg-amber-400" : "bg-emerald-400")} />
              </div>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors">{t.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">Transaction ID: #SYNC-0{t.id}5{i}</p>
            </div>
          </div>
          <div className="flex-1 text-center hidden md:block">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{t.date}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-[13px] font-black text-gray-900">{t.amount}</p>
            <p className={cn(
              "text-[10px] font-bold mt-0.5",
              t.status === 'Completed' ? "text-emerald-500" : t.status === 'Pending' ? "text-amber-500" : "text-rose-500"
            )}>{t.status}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityTable;
