import React, { useState } from 'react';
import { FiSliders, FiX, FiSearch } from 'react-icons/fi';

const Filters = ({ filters, setFilters, clearFilters, internshipsCount, availableProfiles = [], availableLocations = [] }) => {
  const [profileSearch, setProfileSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const handleProfileToggle = (profile) => {
    const newProfiles = filters.profiles.includes(profile)
      ? filters.profiles.filter(p => p !== profile)
      : [...filters.profiles, profile];
    setFilters({ ...filters, profiles: newProfiles });
  };

  const handleLocationToggle = (location) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    setFilters({ ...filters, locations: newLocations });
  };

  const filteredProfiles = availableProfiles.filter(p => p.toLowerCase().includes(profileSearch.toLowerCase()));
  const filteredLocations = availableLocations.filter(l => l.toLowerCase().includes(locationSearch.toLowerCase()));

  const durations = ['Any duration', '1 month', '2 months', '3 months', '4 months', '6 months'];
  
  const stipends = [
    { label: 'Any stipend', value: 0 },
    { label: '₹2,000+', value: 2000 },
    { label: '₹5,000+', value: 5000 },
    { label: '₹10,000+', value: 10000 },
    { label: '₹20,000+', value: 20000 },
    { label: '₹50,000+', value: 50000 }
  ];

  const sectionHeaderClass = "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3";

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-slide-in-left sticky top-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center text-zinc-800 dark:text-zinc-100">
          <FiSliders className="w-4 h-4 text-orange-500 mr-2" />
          <h2 className="font-bold text-base">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-semibold"
        >
          Clear all
        </button>
      </div>
      
      <div className="p-6 space-y-8 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
        
        {/* Profile */}
        <div>
          <h3 className={sectionHeaderClass}>PROFILE</h3>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search profiles..."
              value={profileSearch}
              onChange={e => setProfileSearch(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            {profileSearch && (
              <button onClick={() => setProfileSearch('')} className="absolute right-2 top-2.5 text-zinc-400 hover:text-zinc-600">
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {filteredProfiles.length === 0 ? (
              <p className="text-xs text-zinc-400">No profiles found</p>
            ) : (
              filteredProfiles.map(profile => (
                <label key={profile} className="flex items-start cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
                      checked={filters.profiles.includes(profile)}
                      onChange={() => handleProfileToggle(profile)}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="ml-3 text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {profile}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800"></div>

        {/* Location */}
        <div>
          <h3 className={sectionHeaderClass}>LOCATION</h3>
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search locations..."
              value={locationSearch}
              onChange={e => setLocationSearch(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            {locationSearch && (
              <button onClick={() => setLocationSearch('')} className="absolute right-2 top-2.5 text-zinc-400 hover:text-zinc-600">
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2 mb-3">
            {filteredLocations.length === 0 ? (
              <p className="text-xs text-zinc-400">No locations found</p>
            ) : (
              filteredLocations.map(location => (
                <label key={location} className="flex items-start cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
                      checked={filters.locations.includes(location)}
                      onChange={() => handleLocationToggle(location)}
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="ml-3 text-sm text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {location}
                  </span>
                </label>
              ))
            )}
          </div>
          <label className="flex items-start cursor-pointer group pt-2 border-t border-zinc-50 dark:border-zinc-800/50">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
                checked={filters.wfh}
                onChange={(e) => setFilters({...filters, wfh: e.target.checked})}
              />
              <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="ml-3 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Work from home
            </span>
          </label>
        </div>

        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800"></div>

        {/* Duration */}
        <div>
          <h3 className={sectionHeaderClass}>DURATION</h3>
          <div className="space-y-1">
            {durations.map(duration => {
              const isSelected = filters.duration === duration;
              return (
                <label key={duration} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="duration"
                      className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded-full bg-white dark:bg-zinc-800 checked:border-blue-500 transition-colors cursor-pointer"
                      checked={isSelected}
                      onChange={() => setFilters({...filters, duration})}
                    />
                    <div className="absolute w-2 h-2 rounded-full bg-blue-500 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`ml-3 text-sm ${isSelected ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-600 dark:text-zinc-300'}`}>
                    {duration}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800"></div>

        {/* Stipend */}
        <div>
          <h3 className={sectionHeaderClass}>STIPEND</h3>
          <div className="space-y-1">
            {stipends.map(stipend => {
              const isSelected = filters.stipendRange === stipend.value;
              return (
                <label key={stipend.value} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="stipend"
                      className="peer appearance-none w-4 h-4 border border-zinc-300 dark:border-zinc-600 rounded-full bg-white dark:bg-zinc-800 checked:border-blue-500 transition-colors cursor-pointer"
                      checked={isSelected}
                      onChange={() => setFilters({...filters, stipendRange: stipend.value})}
                    />
                    <div className="absolute w-2 h-2 rounded-full bg-blue-500 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className={`ml-3 text-sm ${isSelected ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-600 dark:text-zinc-300'}`}>
                    {stipend.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Filters;
