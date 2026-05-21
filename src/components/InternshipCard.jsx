import React from 'react';
import { FiMapPin, FiClock, FiDollarSign, FiHome, FiArrowRight } from 'react-icons/fi';

const InternshipCard = ({ internship, onViewDetails }) => {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 card-hover animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          {/* Title & Company */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/50">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{internship.company.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {internship.title}
              </h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{internship.company}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <FiMapPin className="mr-1.5 w-3 h-3" />
              {internship.location}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <FiClock className="mr-1.5 w-3 h-3" />
              {internship.duration}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              <FiDollarSign className="mr-1.5 w-3 h-3" />
              {internship.stipend}
            </span>
            {internship.wfh && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border border-violet-100 dark:border-violet-900/50">
                <FiHome className="mr-1.5 w-3 h-3" />
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Right Action */}
        <div className="flex flex-col items-end gap-3 sm:ml-4">
          <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{internship.posted}</span>
          <button
            onClick={() => onViewDetails(internship)}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 transition-all duration-200 group/btn"
          >
            View Details
            <FiArrowRight className="ml-1.5 w-4 h-4 group-hover/btn:tranzinc-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
