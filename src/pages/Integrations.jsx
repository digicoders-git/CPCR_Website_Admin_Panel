import React from 'react';
import { Mail, Cloud, Globe, MessageSquare, Code, Zap } from 'lucide-react';

const apps = [
  { name: 'Slack', desc: 'Team communication and alerts.', icon: MessageSquare, status: 'connected', color: 'bg-purple-100 text-purple-600' },
  { name: 'GitHub', desc: 'Sync your code changes.', icon: Code, status: 'not-connected', color: 'bg-gray-100 text-gray-900' },
  { name: 'Zapier', desc: 'Automate repetitive workflows.', icon: Zap, status: 'connected', color: 'bg-amber-100 text-amber-600' },
  { name: 'Messaging', desc: 'Customer support messages.', icon: MessageSquare, status: 'not-connected', color: 'bg-sky-100 text-sky-600' },
  { name: 'Cloud Store', desc: 'Direct file storage access.', icon: Cloud, status: 'connected', color: 'bg-blue-100 text-blue-600' },
  { name: 'Analytics', desc: 'Website tracking analytics.', icon: Globe, status: 'not-connected', color: 'bg-emerald-100 text-emerald-600' },
];

const Integrations = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-600">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Integrations & Apps</h2>
        <p className="text-gray-400 font-medium">Extend your dashboard functionality with third-party applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${app.color} transition-transform group-hover:scale-110`}>
                <app.icon size={22} />
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${app.status === 'connected' ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                {app.status === 'connected' ? 'Connected' : 'Unavailable'}
              </span>
            </div>
            <h3 className="text-[14px] font-black text-gray-900 mb-2">{app.name}</h3>
            <p className="text-[12px] text-gray-400 font-medium leading-relaxed mb-6">{app.desc}</p>
            <button className={`w-full py-2.5 rounded-xl text-[11px] font-black uppercase transition-all ${app.status === 'connected' ? 'text-gray-400 border border-gray-100' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95'}`}>
              {app.status === 'connected' ? 'Manage Settings' : 'Connect Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
