import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Blogs from './pages/Blogs';
import Assignments from './pages/Assignments';
import Enquiries from './pages/Enquiries';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const USER_STORAGE_KEY = 'admin_panel_user';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/blogs" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/blogs" /> : <Register />} 
        />

        {/* Private Dashboard Routes inside AdminLayout */}
        <Route 
          path="/" 
          element={user ? <AdminLayout user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/blogs" />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="profile" element={<Profile user={user} onUpdate={handleLogin} />} />
        </Route>

        {/* Catch-all for redirects */}
        <Route path="*" element={<Navigate to="/blogs" />} />
      </Routes>
    </Router>
  );
};

export default App;
