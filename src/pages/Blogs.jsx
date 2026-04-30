import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new/lib/index.js';
import 'quill/dist/quill.snow.css';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '../components/common/ConfirmModal';

const BASE_URL = (import.meta.env.VITE_API_URL || 'https://cpcr-website-backend.onrender.com').replace(/\/$/, '');
const API_URL = `${BASE_URL}/api/blogs`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentBlog, setCurrentBlog] = useState({ title: '', content: '', excerpt: '', category: 'Research' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    const cleanBaseUrl = BASE_URL.replace(/\/$/, '');
    const cleanImgPath = img.startsWith('/') ? img : `/${img}`;
    return `${cleanBaseUrl}${cleanImgPath}`;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
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
    if (!currentBlog.title || !currentBlog.content || (!selectedFile && !currentBlog.img)) {
      alert('Please fill in title, content and provide an image');
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append('title', currentBlog.title);
    formData.append('excerpt', currentBlog.excerpt);
    formData.append('category', currentBlog.category);
    formData.append('content', currentBlog.content);
    formData.append('date', new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    
    if (selectedFile) {
      formData.append('image', selectedFile);
    } else if (currentBlog.img) {
      formData.append('img', currentBlog.img);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Your session has expired. Please log in again.');
      setSaving(false);
      return;
    }

    try {
      if (currentBlog._id) {
        await axios.put(`${API_URL}/${currentBlog._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchBlogs();
      setIsEditing(false);
      resetForm();
    } catch (err) {
      console.error('Error saving blog:', err);
      const errorMsg = err.response?.data?.message || 'Failed to save blog';
      alert(`Error: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setCurrentBlog({ title: '', content: '', excerpt: '', category: 'Research' });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setPreviewUrl(blog.img.startsWith('http') ? blog.img : `${BASE_URL}${blog.img}`);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-tight">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Blog Management</h1>
          <p className="text-gray-500 mt-1">Create and manage your website articles</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-200"
          >
            <Plus size={20} />
            Add New Article
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-slide-up">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">{currentBlog._id ? 'Edit Article' : 'New Article'}</h2>
            <button onClick={() => { setIsEditing(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-8 space-y-6">
            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Title</label>
                <input 
                  type="text" 
                  value={currentBlog.title}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  placeholder="Enter article title..."
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary-50 outline-none transition-all text-lg font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Category</label>
                <select 
                  value={currentBlog.category}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary-50 outline-none transition-all text-lg font-medium"
                >
                  <option>Elections</option>
                  <option>Strategy</option>
                  <option>Research</option>
                  <option>Digital</option>
                  <option>Case Study</option>
                  <option>Analysis</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Cover Image</label>
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
                      <p className="text-sm text-gray-400 font-medium">Click to upload or drag & drop</p>
                    </div>
                  )}
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
                <div className="flex-1 text-sm text-gray-500 space-y-2">
                  <p>Recommended: 1200x630px or higher.</p>
                  <p>Max size: 5MB.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Excerpt (Brief Summary)</label>
              <textarea 
                value={currentBlog.excerpt}
                onChange={(e) => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                placeholder="Brief summary for list view..."
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary-50 outline-none transition-all h-24 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Content</label>
              <div className="h-[400px] mb-12">
                <ReactQuill 
                  theme="snow" 
                  value={currentBlog.content}
                  onChange={(content) => setCurrentBlog({ ...currentBlog, content })}
                  modules={quillModules}
                  className="h-full rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl disabled:opacity-70"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                {saving ? 'Saving...' : 'Save Article'}
              </button>
              <button 
                onClick={() => { setIsEditing(false); resetForm(); }}
                className="font-bold text-gray-500 hover:text-gray-700 px-6"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={getImageUrl(blog.img)} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">{blog.category}</span>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{blog.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>
              </div>
              <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-end gap-2">
                <button 
                  onClick={() => handleEdit(blog)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title="Edit"
                >
                  <Edit3 size={18} />
                </button>
                <button 
                  onClick={() => confirmDelete(blog._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full text-gray-300 mb-4">
                <ImageIcon size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Click the button above to create your first article.</p>
            </div>
          )}
        </div>
      )}

      <ConfirmModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Blogs;
