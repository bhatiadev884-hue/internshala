import React from 'react';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
        <FiSearch className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No internships found</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-sm mb-8">
        Try adjusting your filters or search query to discover more opportunities.
      </p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 transition-all duration-200"
      >
        <FiRefreshCw className="mr-2 w-4 h-4" /> Clear all filters
      </button>
    </div>
  );
};

export default EmptyState;
