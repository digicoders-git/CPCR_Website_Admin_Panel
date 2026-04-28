import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, Loader2, MapPin, User, Calendar } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '../components/common/ConfirmModal';

const API_URL = import.meta.env.VITE_API_URL + '/api/assignments';
const BASE_URL = import.meta.env.VITE_API_URL;

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentAssignment, setCurrentAssignment] = useState({ 
    title: '', 
    location: '', 
    category: 'Surveys', 
    client: '', 
    date: '', 
    description: '' 
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(API_URL);
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const { title, location, category, client, date, description } = currentAssignment;
    if (!title || !location || !client || !date || !description || (!selectedFile && !currentAssignment.img)) {
      alert('Please fill in all fields and provide an image');
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('client', client);
    formData.append('date', date);
    formData.append('description', description);
    
    const token = localStorage.getItem('token');

    if (selectedFile) {
      formData.append('image', selectedFile);
    } else if (currentAssignment.img) {
      formData.append('img', currentAssignment.img);
    }

    try {
      if (currentAssignment._id) {
        await axios.put(`${API_URL}/${currentAssignment._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchAssignments();
      setIsEditing(false);
      resetForm();
    } catch (err) {
      console.error('Error saving assignment:', err);
      alert('Failed to save assignment');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setCurrentAssignment({ 
      title: '', 
      location: '', 
      category: 'Surveys', 
      client: '', 
      date: '', 
      description: '' 
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleEdit = (assignment) => {
    setCurrentAssignment(assignment);
    setPreviewUrl(assignment.img.startsWith('http') ? assignment.img : `${BASE_URL}${assignment.img}`);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAssignments();
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-tight">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recent Assignments</h1>
          <p className="text-gray-500 mt-1">Manage your project showcase and case studies</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-200"
          >
            <Plus size={20} />
            Add New Assignment
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-slide-up">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">{currentAssignment._id ? 'Edit Assignment' : 'New Assignment'}</h2>
            <button onClick={() => { setIsEditing(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Project Title</label>
                <input 
                  type="text" 
                  value={currentAssignment.title}
                  onChange={(e) => setCurrentAssignment({ ...currentAssignment, title: e.target.value })}
                  placeholder="e.g. Assembly Election Survey"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                <select 
                  value={currentAssignment.category}
                  onChange={(e) => setCurrentAssignment({ ...currentAssignment, category: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all font-bold"
                >
                  <option>Surveys</option>
                  <option>Research</option>
                  <option>Analysis</option>
                  <option>Reports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="text" 
                    value={currentAssignment.location}
                    onChange={(e) => setCurrentAssignment({ ...currentAssignment, location: e.target.value })}
                    placeholder="e.g. Rajasthan | 2025"
                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Client</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="text" 
                    value={currentAssignment.client}
                    onChange={(e) => setCurrentAssignment({ ...currentAssignment, client: e.target.value })}
                    placeholder="e.g. Independent Candidate"
                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Date / Year</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input 
                    type="text" 
                    value={currentAssignment.date}
                    onChange={(e) => setCurrentAssignment({ ...currentAssignment, date: e.target.value })}
                    placeholder="e.g. March 2025"
                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Cover Image</label>
              <div className="flex items-start gap-6">
                <div className="relative w-full max-w-sm h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center group">
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Change Image</label>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-gray-300 mb-2" size={40} />
                      <p className="text-sm text-gray-400 font-medium">Click to upload image</p>
                    </div>
                  )}
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
              <textarea 
                value={currentAssignment.description}
                onChange={(e) => setCurrentAssignment({ ...currentAssignment, description: e.target.value })}
                placeholder="Describe the assignment details..."
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary outline-none transition-all h-32 resize-none font-medium"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl disabled:opacity-70"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                {saving ? 'Saving...' : 'Save Assignment'}
              </button>
              <button 
                onClick={() => { setIsEditing(false); resetForm(); }}
                className="font-bold text-gray-400 hover:text-gray-600 px-6"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.img.startsWith('http') ? item.img : `${BASE_URL}${item.img}`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">{item.category}</span>
                </div>
              </div>
              <div className="p-6 flex-grow space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <MapPin size={14} />
                  {item.location}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{item.description}</p>
              </div>
              <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-2">
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => confirmDelete(item._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {assignments.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full text-gray-300 mb-4">
                <ImageIcon size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No assignments found</h3>
              <p className="text-gray-500">Click the button above to add your first assignment.</p>
            </div>
          )}
        </div>
      )}

      <ConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Assignment"
        message="Are you sure you want to delete this assignment? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Assignments;
