import React from 'react';
import { Search, Trash2, Archive, Star } from 'lucide-react';

const emails = [
  { id: 1, sender: 'Support Team', subject: 'Your Subscription Renewal', time: '10:45 AM', status: 'unread' },
  { id: 2, sender: 'Tarikul Islam', subject: 'Project Update: New Designs', time: 'Yesterday', status: 'read' },
  { id: 3, sender: 'Financial Office', subject: 'Invoice for March 2024', time: 'Monday', status: 'read' },
  { id: 4, sender: 'AJOY Sarker', subject: 'Invitation to meeting', time: 'Feb 10', status: 'read' },
];

const Inbox = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-600">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Inbox</h2>
          <p className="text-gray-400 font-medium tracking-tight">You have 12 unread messages today.</p>
        </div>
        <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search mail..." className="bg-transparent border-none text-[12px] px-3 focus:outline-none placeholder:text-gray-300" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-[40px_40px_180px_1fr_120px_90px] items-center px-5 py-3 border-b border-gray-100 bg-gray-50/70 text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
            <p />
            <p />
            <p>Sender</p>
            <p>Subject</p>
            <p>Time</p>
            <p className="text-right">Actions</p>
          </div>
          {emails.map((email, i) => (
            <div key={i} className="grid grid-cols-[40px_40px_180px_1fr_120px_90px] items-center px-5 py-4 border-b border-gray-100/80 last:border-b-0 hover:bg-gray-50/50 transition-colors group cursor-pointer">
              <input type="checkbox" className="accent-primary w-4 h-4 rounded cursor-pointer" />
              <Star size={18} className="text-gray-300 hover:text-amber-400 cursor-pointer" />
              <p className={`text-[13px] font-bold truncate pr-4 ${email.status === 'unread' ? 'text-gray-900' : 'text-gray-500'}`}>{email.sender}</p>
              <p className={`text-[13px] truncate pr-4 ${email.status === 'unread' ? 'font-black text-gray-900' : 'font-medium text-gray-400'}`}>{email.subject}</p>
              <p className="text-[11px] font-black text-gray-300 uppercase tracking-tighter">{email.time}</p>
              <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"><Trash2 size={16} /></button>
                <button className="text-gray-400 hover:text-sky-500 transition-colors cursor-pointer"><Archive size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
