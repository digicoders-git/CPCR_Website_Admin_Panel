import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  BarChart3, 
  PieChart, 
  Wallet, 
  Mail, 
  Boxes, 
  Users,
  UserCircle,
  LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavItem, { cn } from './NavItem';
import ConfirmModal from './ConfirmModal';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const isPathActive = (path) => location.pathname === path;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-50 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
      isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
    )}>
      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className="px-6 mb-10">
          <div className="flex items-center justify-center p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src="/logo.png" alt="Logo" className={cn("object-contain transition-all duration-300", isSidebarOpen ? "h-10 w-auto" : "h-6 w-6")} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 space-y-8 overflow-y-auto px-4 scrollbar-hide">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-4 opacity-70">Admin Panel</p>
            <div className="space-y-1.5">
              <NavItem 
                icon={Mail} 
                label="Manage Blogs" 
                active={isPathActive('/blogs')} 
                onClick={() => navigate('/blogs')} 
              />
              <NavItem 
                icon={Boxes} 
                label="Manage Assignments" 
                active={isPathActive('/assignments')} 
                onClick={() => navigate('/assignments')} 
              />
              <NavItem 
                icon={UserCircle} 
                label="My Profile" 
                active={isPathActive('/profile')} 
                onClick={() => navigate('/profile')} 
              />
            </div>
          </div>
        </div>

        {/* User Profile Summary */}
        {isSidebarOpen && (
          <div className="mx-4 mb-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Logged in as</p>
            <p className="text-sm font-bold text-gray-900 truncate">Admin</p>
          </div>
        )}

        {/* Logout */}
        <div className="px-4 mt-auto">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </div>

      <ConfirmModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to log out of your admin account?"
        confirmText="Logout"
        type="danger"
      />
    </aside>
  );
};

export default Sidebar;
