import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Signup = () => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password, role });
      login(response.data.user, response.data.token);
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/search');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full animate-fade-in-up">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50 p-8 border border-zinc-100 dark:border-zinc-800">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">I</span>
              </div>
            </Link>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Create your account</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Start your journey with Internshala</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mb-6">
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${role === 'student' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${role === 'admin' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'}`}
              onClick={() => setRole('admin')}
            >
              Employer
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50 animate-fade-in">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -tranzinc-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -tranzinc-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -tranzinc-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Create account <FiArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
