import React from 'react';
import { FiMoon, FiSun, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-2.5 group-hover:scale-105 transition-transform duration-200 shadow-md shadow-blue-500/20">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Intern<span className="gradient-text">shala</span></span>
          </Link>

          {/* Search Bar (Desktop) */}
          {setSearchQuery && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FiSearch className="text-zinc-400 w-4 h-4" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl leading-5 bg-white/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-sm transition-all duration-200"
                placeholder="Search internships by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none transition-all duration-200 hover:scale-105"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} 
                  className="hidden sm:flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
                >
                  <FiUser className="mr-1.5 w-4 h-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200"
                >
                  <FiLogOut className="mr-1.5 w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="hidden md:inline-flex items-center px-4 py-2.5 text-sm font-semibold rounded-xl text-white btn-premium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {setSearchQuery && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FiSearch className="text-zinc-400 w-4 h-4" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 text-sm transition-all"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
