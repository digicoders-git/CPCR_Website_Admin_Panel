import React, { useMemo, useState } from 'react';

const Header = ({ user }) => {
  const [avatarError, setAvatarError] = useState(false);
  const displayName = user?.name || 'AJOY Sarker';
  const displayRole = user?.role || 'Super Admin';
  const initials = useMemo(
    () =>
      displayName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [displayName]
  );

  return (
    <header className="px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="hidden lg:block">
        <h1 className="text-xl font-black tracking-tight text-gray-900">Blog Management</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 opacity-70">
          Articles
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-black leading-none text-gray-900">{displayName}</p>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-1.5">
            {displayRole}
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
          {!avatarError ? (
            <img
              src="https://avatar.iran.liara.run/public/33"
              alt={displayName}
              className="w-full h-full object-cover"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <span className="text-xs font-bold text-gray-600">{initials}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
