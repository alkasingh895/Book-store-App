import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import toast from 'react-hot-toast';

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/user/login', formData);
      const user = response.data.user;

      // Check if user is admin
      if (!user.isAdmin) {
        toast.error('🚫 Admin access only!');
        setLoading(false);
        return;
      }

      // Save admin user + token to localStorage
      localStorage.setItem('AdminUser', JSON.stringify({ ...user, token: response.data.token }));

      localStorage.setItem(
  "token",
  response.data.token
);
      toast.success('✅ Admin login successful!');
      
      // Redirect to admin panel
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="admin_login_modal" className="modal">
      <div className="modal-box w-96 bg-white dark:bg-slate-800">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">🔐 Admin Login</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={() => document.getElementById('admin_login_modal').close()}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary bg-blue-500 hover:bg-blue-600 border-none"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AdminLogin;
