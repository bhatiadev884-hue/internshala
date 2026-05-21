import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiUserCheck, FiArrowRight, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-float delay-500"></div>
          <div className="absolute top-1/2 left-1/2 -tranzinc-x-1/2 -tranzinc-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 mb-8">
            <FiZap className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">#1 Internship Platform in India</span>
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
            Launch your career<br className="hidden md:block" />
            with <span className="gradient-text">Premium Internships</span>
          </h1>
          
          <p className="animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with top companies, track your applications, and land your dream role. Built for ambitious students and visionary employers.
          </p>
          
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/search" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-white btn-premium shadow-lg shadow-blue-500/25">
              <FiSearch className="mr-2.5 w-5 h-5 group-hover:scale-110 transition-transform" /> Find Internships
            </Link>
            <Link to="/signup" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-tranzinc-y-0.5">
              Sign Up Now <FiArrowRight className="ml-2 w-5 h-5 group-hover:tranzinc-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">10K+</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Internships</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">5K+</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">50K+</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Students</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative bg-white dark:bg-zinc-900 py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">Why choose <span className="gradient-text">Internshala</span>?</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">Everything you need to kickstart your career, all in one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <FiBriefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Verified Companies</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">We partner with top-tier startups and enterprises looking for fresh talent like you.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
                <FiShield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Secure & Trusted</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Your data is safe. Track applications, manage profiles, all in one organized portal.</p>
            </div>
            <div className="group p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 card-hover">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <FiTrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Fast Application</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Apply to multiple internships with just a single click. No endless forms, just results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Internshala. Built with ❤️ for students and employers.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
