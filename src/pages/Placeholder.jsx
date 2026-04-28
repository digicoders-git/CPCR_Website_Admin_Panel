import React from 'react';

const Placeholder = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      </div>
      <h2 className="text-2xl font-black text-gray-900">{title} Section</h2>
      <p className="text-gray-400 max-w-sm font-medium">This section is currently under development. Stay tuned for real-time data updates and advanced features.</p>
      <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">Go Back Home</button>
    </div>
  );
};

export default Placeholder;
