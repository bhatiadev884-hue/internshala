import React from 'react';

const Loader = () => {
  return (
    <div className="w-full space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800" style={{ animationDelay: `${item * 100}ms` }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl animate-shimmer flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/5 rounded-lg animate-shimmer"></div>
              <div className="h-4 w-2/5 rounded-lg animate-shimmer"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-7 w-24 rounded-lg animate-shimmer"></div>
                <div className="h-7 w-20 rounded-lg animate-shimmer"></div>
                <div className="h-7 w-28 rounded-lg animate-shimmer"></div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="h-10 w-28 rounded-xl animate-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
