import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

const NavItem = ({ icon: Icon, label, active = false, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-500 hover:bg-primary/10 hover:text-primary"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? "text-white" : "text-gray-400 group-hover:text-primary"} />
      <span className="text-sm font-semibold tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-1.5">
      {badge && <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">{badge}</span>}
      {active && <div className="w-1 h-4 bg-white rounded-full ml-1 animate-pulse" />}
    </div>
  </button>
);

export default NavItem;
