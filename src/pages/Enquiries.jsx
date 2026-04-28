import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Mail, Phone, User, Clock, MessageSquare, CheckCircle2, Circle } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '../components/common/ConfirmModal';

const API_URL = import.meta.env.VITE_API_URL + '/api/enquiries';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(res.data);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Read': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Replied': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-tight">Loading enquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Enquiries</h1>
          <p className="text-gray-500 mt-1">Manage contact form submissions and leads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 flex-grow space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                        <Mail size={14} />
                        {item.email}
                      </a>
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                        <Phone size={14} />
                        {item.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <div className="text-gray-400 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                    <Clock size={14} />
                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-50">
                <div className="flex items-start gap-3 mb-2 text-gray-400">
                  <MessageSquare size={18} className="mt-0.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {item.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Quick Actions:</span>
                  <button 
                    onClick={() => updateStatus(item._id, 'Read')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-all border border-amber-100"
                  >
                    <Circle size={14} />
                    Mark as Read
                  </button>
                  <button 
                    onClick={() => updateStatus(item._id, 'Replied')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 transition-all border border-green-100"
                  >
                    <CheckCircle2 size={14} />
                    Mark as Replied
                  </button>
                </div>
                <button 
                  onClick={() => confirmDelete(item._id)}
                  className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full text-gray-300 mb-4">
              <Mail size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No enquiries found</h3>
            <p className="text-gray-500">Contact form submissions will appear here.</p>
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Enquiries;
