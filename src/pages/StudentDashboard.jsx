import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { FiClock, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'student') { navigate('/login'); return; }
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/applications?role=student&userId=${user.id}`);
        setApplications(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchApplications();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">My Applications</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Welcome back, <span className="font-semibold text-zinc-700 dark:text-zinc-300">{user?.name}</span></p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-white btn-premium"
          >
            <FiBriefcase className="mr-2 w-4 h-4" /> Browse Internships
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-fade-in-up delay-100">
          {loading ? (
            <div className="p-12 text-center text-zinc-400">
              <div className="w-8 h-8 border-2 border-zinc-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              Loading your applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiBriefcase className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No applications yet</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">Start exploring internships and apply to your dream roles.</p>
              <button onClick={() => navigate('/search')} className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Find Internships <FiArrowRight className="ml-1.5 w-4 h-4" />
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {applications.map((app, index) => (
                <li key={app.id} className="p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-900/50 flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{app.company?.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white">{app.internshipTitle}</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{app.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                        <FiClock className="mr-1.5 w-3 h-3" /> {app.status}
                      </span>
                      <span className="text-xs text-zinc-400 hidden sm:block">{new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
