import React from 'react';
import { User, Shield, ShieldCheck, UserPlus, MoreVertical } from 'lucide-react';

const users = [
  { name: 'AJOY Sarker', email: 'ajoy@example.com', role: 'Super Admin', status: 'Active', avatar: 33 },
  { name: 'Tarikul Islam', email: 'tarikul@example.com', role: 'Operator', status: 'Active', avatar: 65 },
  { name: 'Nasir Uddin', email: 'nasir@example.com', role: 'Support', status: 'Inactive', avatar: 22 },
  { name: 'Raju Ahmed', email: 'raju@example.com', role: 'Manager', status: 'Active', avatar: 45 },
];

const UserAvatar = ({ name, avatar }) => {
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
          src={`https://avatar.iran.liara.run/public/${avatar}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-[11px] font-bold text-gray-600">{initials}</span>
      )}
    </div>
  );
};

const UserRoles = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-600">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">User Access Control</h2>
          <p className="text-gray-400 font-medium tracking-tight">Assign roles and manage administrative access for your team.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white font-black uppercase text-[11px] px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <UserPlus size={16} />
          Create New Role
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="min-w-[760px]">
        <div className="bg-gray-50/70 p-4 border-b border-gray-100 hidden md:flex items-center text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">
          <div className="flex-1 px-4">User Information</div>
          <div className="flex-1 text-center">Role Status</div>
          <div className="flex-1 text-center">Current Status</div>
          <div className="w-20 text-right px-4">Actions</div>
        </div>
        
        {users.map((user, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center p-5 border-b border-gray-100/80 last:border-b-0 hover:bg-gray-50/30 transition-colors group min-w-[760px]">
            <div className="flex-1 flex items-center gap-4 px-4 w-full md:w-auto">
              <UserAvatar name={user.name} avatar={user.avatar} />
              <div>
                <p className="text-[13px] font-black text-gray-900">{user.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center py-4 md:py-0">
               <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${user.role === 'Super Admin' ? 'bg-amber-50 text-amber-500' : 'bg-gray-50 text-gray-400'}`}>
                  {user.role === 'Super Admin' ? <ShieldCheck size={14} /> : <User size={14} />}
                  <span className="text-[11px] font-black tracking-tighter uppercase">{user.role}</span>
               </div>
            </div>

            <div className="flex-1 flex justify-center py-4 md:py-0">
               <span className={`text-[10px] font-black tracking-widest uppercase ${user.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  ● {user.status}
               </span>
            </div>

            <div className="w-20 flex justify-end px-4">
              <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
