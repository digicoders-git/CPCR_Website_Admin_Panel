import React from 'react';
import { CreditCard, Wallet as WalletIcon, TrendingUp, History } from 'lucide-react';

const Wallet = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-600">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="col-span-2 bg-gradient-to-br from-[#1a1b1f] to-[#2d2e32] text-white p-10 rounded-3xl relative overflow-hidden shadow-xl shadow-gray-200">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                <WalletIcon size={28} className="text-primary" />
              </div>
              <p className="text-[10px] font-black tracking-widest opacity-40 uppercase">EcomSyncify Card</p>
            </div>
            
            <p className="text-[12px] font-bold opacity-60 uppercase tracking-widest mb-2">Total Balance</p>
            <h2 className="text-5xl font-black mb-10 tracking-tighter">$45,210.00</h2>
            
            <div className="flex items-center gap-10">
              <div>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">Account Holder</p>
                <p className="text-[13px] font-black uppercase">AJOY Sarker</p>
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">Expires</p>
                <p className="text-[13px] font-black uppercase">12 / 28</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: CreditCard, label: 'Add Card', color: 'bg-primary/10 text-primary' },
              { icon: TrendingUp, label: 'Income', color: 'bg-emerald-50 text-emerald-500' },
              { icon: History, label: 'History', color: 'bg-amber-50 text-amber-500' },
              { icon: WalletIcon, label: 'Transfer', color: 'bg-sky-50 text-sky-500' },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-50 hover:border-primary/20 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon size={20} />
                </div>
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
