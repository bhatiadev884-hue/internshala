import React, { useState } from 'react';
import { FiX, FiMapPin, FiClock, FiDollarSign, FiPlayCircle, FiBriefcase, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternshipDetailsModal = ({ internship, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  if (!internship) return null;

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      setError('Only students can apply for internships.');
      return;
    }
    setApplying(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/applications', {
        studentId: user.id,
        studentName: user.name,
        internshipId: internship.id,
        internshipTitle: internship.title,
        company: internship.company
      });
      setApplied(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up border border-zinc-100 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-4 items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-2xl flex items-center justify-center border border-blue-100 dark:border-blue-900/50 flex-shrink-0">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">{internship.company.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">{internship.title}</h2>
              <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{internship.company}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl text-zinc-400 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50">
              {error}
            </div>
          )}

          <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 mb-6">
            <FiMapPin className="mr-2 h-4 w-4 text-zinc-400" />
            {internship.wfh ? 'Work From Home' : internship.location}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <div className="text-center">
              <div className="flex items-center justify-center text-xs text-zinc-400 uppercase font-semibold tracking-wider mb-2">
                <FiPlayCircle className="mr-1 w-3.5 h-3.5" /> Start
              </div>
              <div className="font-bold text-zinc-900 dark:text-white">Immediately</div>
            </div>
            <div className="text-center border-x border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-center text-xs text-zinc-400 uppercase font-semibold tracking-wider mb-2">
                <FiClock className="mr-1 w-3.5 h-3.5" /> Duration
              </div>
              <div className="font-bold text-zinc-900 dark:text-white">{internship.duration}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-xs text-zinc-400 uppercase font-semibold tracking-wider mb-2">
                <FiDollarSign className="mr-1 w-3.5 h-3.5" /> Stipend
              </div>
              <div className="font-bold text-zinc-900 dark:text-white">{internship.stipend}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">About the Internship</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
              As a {internship.title} at {internship.company}, you will be responsible for assisting the core team in daily operational tasks. This includes working on live projects, collaborating with cross-functional teams, and delivering high-quality outputs.
              <br/><br/>
              Ideal candidates should possess a strong foundational understanding of {internship.profile || 'the required skills'}, excellent communication abilities, and a drive to learn in a fast-paced environment.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">Who can apply</h3>
            <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li className="flex items-start"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>Available for the duration of {internship.duration}</li>
              <li className="flex items-start"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>Have relevant skills and interests</li>
              <li className="flex items-start"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>Can start the internship immediately</li>
              {internship.wfh && <li className="flex items-start"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>Reliable internet connection for remote work</li>}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex justify-between items-center">
          <span className="text-xs text-zinc-400">Posted: <span className="font-medium text-zinc-600 dark:text-zinc-300">{internship.posted}</span></span>
           
          {applied ? (
            <button disabled className="inline-flex items-center px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold rounded-xl border border-emerald-100 dark:border-emerald-900/50 cursor-default">
              <FiCheck className="mr-2 w-4 h-4" /> Applied
            </button>
          ) : (
            <button 
              onClick={handleApply}
              disabled={applying}
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white btn-premium rounded-xl disabled:opacity-70"
            >
              {applying ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              ) : null}
              {applying ? 'Applying...' : <>Apply Now <FiArrowRight className="ml-2 w-4 h-4" /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsModal;
