import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Eye, EyeOff } from 'lucide-react';
import axiosInstance, { setupAxios } from '../lib/axios.config';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Login attempt:', { email });

      const response = await axiosInstance.post('/users/login', {
        email,
        password
      });

      console.log('Login successful:', {
        token: response.data.token ? 'present' : 'missing',
        user: response.data.user
      });

      const { token, user } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      // Set up axios with the new token
      setupAxios(token);
      
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('You must be an admin to access this area');
      }
    } catch (err: any) {
      console.error('Login error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
      <div className="bg-[#1A1E2C] p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center justify-center mb-6">
          <Activity className="w-12 h-12 text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-white">FinTech Pulse Network</h1>
          <h2 className="text-lg text-gray-400">Admin Portal</h2>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2E3C] rounded border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#2A2E3C] rounded border border-gray-700 text-white focus:outline-none focus:border-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Activity className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
