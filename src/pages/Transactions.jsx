import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import ActivityTable from '../components/dashboard/ActivityTable';

const transactions = [
  { id: 1, name: 'AJOY Sarker', email: 'ajoy@example.com', date: 'Jan 10, 2024', amount: '$4,245.00', status: 'Completed' },
  { id: 2, name: 'Tarikul Islam', email: 'tarikul@example.com', date: 'Jan 12, 2024', amount: '$2,145.00', status: 'Pending' },
  { id: 3, name: 'Rakibul Hasan', email: 'rakibul@example.com', date: 'Jan 15, 2024', amount: '$1,234.00', status: 'Failed' },
  { id: 4, name: 'Imran Khan', email: 'imran@example.com', date: 'Jan 18, 2024', amount: '$5,900.00', status: 'Completed' },
  { id: 5, name: 'Shakil Ahmed', email: 'shakil@example.com', date: 'Jan 20, 2024', amount: '$900.00', status: 'Completed' },
];

const Transactions = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Transactions Log</h2>
        <p className="text-gray-400 font-medium">Manage and monitor all incoming and outgoing financial records with high precision.</p>
      </div>

      <ActivityTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
