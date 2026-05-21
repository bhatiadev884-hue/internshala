import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { FiPlus, FiUsers, FiCheck } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('publish');
  
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', duration: '', stipend: '', wfh: false, profile: ''
  });
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    if (activeTab === 'applications') {
      axios.get('http://localhost:5000/api/applications?role=admin').then(res => setApplications(res.data)).catch(console.error);
    }
  }, [user, navigate, activeTab]);

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/internships', formData);
      setPublishSuccess(true);
      setFormData({ title: '', company: '', location: '', duration: '', stipend: '', wfh: false, profile: '' });
      setTimeout(() => setPublishSuccess(false), 3000);
    } catch (error) { console.error(error); }
  };

  const inputClass = "w-full px-3.5 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Employer Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">Manage postings and review candidates</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mb-8 max-w-xs animate-fade-in-up delay-100">
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'publish' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`}
            onClick={() => setActiveTab('publish')}
          >
            <FiPlus className="w-4 h-4" /> Publish
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'applications' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`}
            onClick={() => setActiveTab('applications')}
          >
            <FiUsers className="w-4 h-4" /> Applications
          </button>
        </div>

        {/* Publish Tab */}
        {activeTab === 'publish' && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 max-w-3xl animate-fade-in-up delay-200">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Create New Internship</h2>
            
            {publishSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-medium text-sm flex items-center border border-emerald-100 dark:border-emerald-900/50 animate-fade-in">
                <FiCheck className="mr-2 w-5 h-5" /> Internship published successfully!
              </div>
            )}

            <form onSubmit={handlePublish} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Job Title</label>
                  <input type="text" required className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. React Developer" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Company Name</label>
                  <input type="text" required className={inputClass} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Profile / Category</label>
                  <input type="text" required className={inputClass} value={formData.profile} onChange={e => setFormData({...formData, profile: e.target.value})} placeholder="e.g. Software Engineering" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Location</label>
                  <input type="text" className={`${inputClass} ${formData.wfh ? 'opacity-50 cursor-not-allowed' : ''}`} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} disabled={formData.wfh} placeholder="e.g. Bangalore" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Duration</label>
                  <input type="text" required className={inputClass} value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 6 Months" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Stipend</label>
                  <input type="text" required className={inputClass} value={formData.stipend} onChange={e => setFormData({...formData, stipend: e.target.value})} placeholder="e.g. ₹ 20,000 /month" />
                </div>
              </div>
              
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" checked={formData.wfh} onChange={e => setFormData({...formData, wfh: e.target.checked})} />
                  <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:tranzinc-x-4 transition-transform"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">Work From Home</span>
              </label>

              <div className="pt-2">
                <button type="submit" className="px-6 py-3 text-sm font-semibold text-white btn-premium rounded-xl">
                  Publish Internship
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-fade-in-up delay-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-zinc-400 text-sm">No applications received yet.</td>
                    </tr>
                  ) : (
                    applications.map(app => (
                      <tr key={app.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-white">{app.studentName}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{app.internshipTitle}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{app.company}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
