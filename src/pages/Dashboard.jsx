import React from 'react';
import { Wallet, PieChart, BarChart3, PlusCircle, FileText, Users, Bell } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import ActivityTable from '../components/dashboard/ActivityTable';

// Mock Data within the page for simplicity in this version
const statsData = [
  { title: 'Total Earnings', value: '$7,245.00', change: '+3.5%', trend: 'up', color: 'bg-primary/10', icon: Wallet },
  { title: 'Total Spending', value: '$3,128.00', change: '-0.5%', trend: 'down', color: 'bg-rose-50', icon: PieChart },
  { title: 'Spending Goal', value: '$10,000.00', change: '+2.4%', trend: 'up', color: 'bg-primary/5', icon: BarChart3 },
];

const revenueData = [
  { name: 'Jan', signed: 10 }, { name: 'Feb', signed: 8 }, { name: 'Mar', signed: 15 },
  { name: 'Apr', signed: 12 }, { name: 'May', signed: 18 }, { name: 'Jun', signed: 22 },
  { name: 'Jul', signed: 15 }, { name: 'Aug', signed: 12 }, { name: 'Sep', signed: 14 },
  { name: 'Oct', signed: 10 }, { name: 'Nov', signed: 20 }, { name: 'Dec', signed: 18 },
];

const transactions = [
  { id: 1, name: 'AJOY Sarker', email: 'ajoy@example.com', date: 'Jan 10, 2024', amount: '$4,245.00', status: 'Completed' },
  { id: 2, name: 'Tarikul Islam', email: 'tarikul@example.com', date: 'Jan 12, 2024', amount: '$2,145.00', status: 'Pending' },
  { id: 3, name: 'Rakibul Hasan', email: 'rakibul@example.com', date: 'Jan 15, 2024', amount: '$1,234.00', status: 'Failed' },
];

const quickActions = [
  { label: 'Add Transaction', icon: PlusCircle },
  { label: 'Create Report', icon: FileText },
  { label: 'Manage Users', icon: Users },
];

const updates = [
  'Monthly finance report is ready for review.',
  '2 user-role change requests are pending approval.',
  'System backup completed successfully today.',
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-black text-gray-900">Welcome back, Admin</h2>
        <p className="text-sm text-gray-500 mt-1">
          Here is a quick summary of business performance and your latest updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {statsData.map((stat, idx) => (
          <StatCard key={idx} {...stat} idx={idx} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <RevenueChart revenueData={revenueData} />
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <action.icon size={16} className="text-primary" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={16} className="text-primary" />
              <h3 className="text-base font-black text-gray-900">Latest Updates</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              {updates.map((item, idx) => (
                <li key={idx} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 pb-6">
        <ActivityTable transactions={transactions} />
        <div className="col-span-12 xl:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-base font-black text-gray-900 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Approve vendor payout batch</p>
              <p className="text-xs text-gray-500 mt-1">Today, 4:00 PM</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Review weekly transaction exceptions</p>
              <p className="text-xs text-gray-500 mt-1">Tomorrow, 10:30 AM</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Team sync with support unit</p>
              <p className="text-xs text-gray-500 mt-1">Friday, 12:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
