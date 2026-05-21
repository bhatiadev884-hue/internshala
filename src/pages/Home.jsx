import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import InternshipCard from '../components/InternshipCard';
import InternshipDetailsModal from '../components/InternshipDetailsModal';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { fetchInternships } from '../services/api';
import { FiTrendingUp } from 'react-icons/fi';

const Home = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedInternship, setSelectedInternship] = useState(null);
  
  const initialFilters = {
    profiles: [],
    locations: [],
    wfh: false,
    duration: 'Any duration',
    stipendRange: 0,
  };
  
  const [filters, setFilters] = useState(initialFilters);

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchInternships();
      setInternships(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  const availableProfiles = useMemo(() => {
    const profiles = internships.map(i => i.profile).filter(Boolean);
    return [...new Set(profiles)].sort();
  }, [internships]);

  const availableLocations = useMemo(() => {
    // Exclude 'Work From Home' from locations as we have a separate toggle
    const locations = internships.map(i => i.location).filter(Boolean).filter(l => l !== 'Work From Home');
    return [...new Set(locations)].sort();
  }, [internships]);

  const filteredAndSortedInternships = useMemo(() => {
    let result = [...internships];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.profile.toLowerCase().includes(query)
      );
    }

    if (filters.profiles.length > 0) {
      result = result.filter(item => 
        filters.profiles.includes(item.profile) || 
        filters.profiles.some(p => item.title.toLowerCase().includes(p.toLowerCase()))
      );
    }

    if (filters.locations.length > 0) {
      result = result.filter(item => 
        filters.locations.includes(item.location)
      );
    }

    if (filters.wfh) {
      result = result.filter(item => item.wfh === true);
    }

    if (filters.duration !== 'Any duration') {
      const maxMonths = parseInt(filters.duration);
      if (!isNaN(maxMonths)) {
        result = result.filter(item => item.numericDuration <= maxMonths && item.numericDuration > 0);
      }
    }

    if (filters.stipendRange > 0) {
      result = result.filter(item => item.numericStipend >= filters.stipendRange);
    }

    if (sortBy === 'stipendHigh') {
      result.sort((a, b) => b.numericStipend - a.numericStipend);
    } else if (sortBy === 'durationShort') {
      result.sort((a, b) => {
        if (a.numericDuration === 0) return 1;
        if (b.numericDuration === 0) return -1;
        return a.numericDuration - b.numericDuration;
      });
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [internships, filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <Filters 
              filters={filters} 
              setFilters={setFilters} 
              clearFilters={clearFilters}
              internshipsCount={filteredAndSortedInternships.length}
              availableProfiles={availableProfiles}
              availableLocations={availableLocations}
            />
          </aside>

          {/* Right Content Area */}
          <section className="flex-1 min-w-0">
            
            {/* Sorting Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center mb-3 sm:mb-0">
                <FiTrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Latest Internships
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Sort:</span>
                <select 
                  className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="stipendHigh">Highest Stipend</option>
                  <option value="durationShort">Shortest Duration</option>
                </select>
              </div>
            </div>

            {/* Internship Listings */}
            {loading ? (
              <Loader />
            ) : filteredAndSortedInternships.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSortedInternships.map((internship, index) => (
                  <div key={internship.id} style={{ animationDelay: `${index * 60}ms` }}>
                    <InternshipCard 
                      internship={internship} 
                      onViewDetails={setSelectedInternship}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={clearFilters} />
            )}

          </section>
        </div>
      </main>

      {/* Internship Details Modal */}
      {selectedInternship && (
        <InternshipDetailsModal 
          internship={selectedInternship} 
          onClose={() => setSelectedInternship(null)} 
        />
      )}
    </div>
  );
};

export default Home;
