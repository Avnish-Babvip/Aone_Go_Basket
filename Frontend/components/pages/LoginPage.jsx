import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. If using Laravel Sanctum, call the CSRF cookie first:
      // await axios.get('https://api.gobasket.babviphosting.com/sanctum/csrf-cookie', { withCredentials: true });

      // 2. The Login Request
const response = await axios.post('https://api.gobasket.babviphosting.com/api/admin/login', {
  login: email,
  password: password,
}, {
  withCredentials: true,
  headers: {
    'Accept': 'application/json', // <--- Force JSON response on error
    'Content-Type': 'application/json',
  }
});

      if (response.data.status) {
        // Save token or user data (if using JWT)
        localStorage.setItem('token', response.data.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle different error types
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#003d29] mb-8 font-primary">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-emerald-300"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <span className="text-emerald-600 cursor-pointer hover:underline">Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;