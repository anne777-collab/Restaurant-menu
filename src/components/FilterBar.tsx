import React from 'react';
import { CATEGORIES, DIETARY_FILTERS } from '../data/menuData';
import { Search, SlidersHorizontal, Leaf, Sprout, Flame, ShieldCheck, Sparkles } from 'lucide-react';

// Map string icon name to Lucide components for robust display
const getDietaryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Leaf': return <Leaf size={14} className="mr-1.5" />;
    case 'Sprout': return <Sprout size={14} className="mr-1.5" />;
    case 'Flame': return <Flame size={14} className="mr-1.5" fill="currentColor" />;
    case 'ShieldCheck': return <ShieldCheck size={14} className="mr-1.5" />;
    case 'Sparkles': return <Sparkles size={14} className="mr-1.5" />;
    default: return <Leaf size={14} className="mr-1.5" />;
  }
};

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  activeDietaryFilters: string[];
  toggleDietaryFilter: (filterId: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeDietaryFilters,
  toggleDietaryFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-5">
      
      {/* Top Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input Box */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our gourmet recipes (e.g. Wagyu, Miso, Avocado, Truffle)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 bg-slate-200/80 hover:bg-slate-200 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <SlidersHorizontal size={13} />
            <span>Sort By</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          >
            <option value="popular">Most Requested ★</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time-asc">Prep Time: Quickest</option>
          </select>
        </div>
      </div>

      {/* Category Tabs Strip */}
      <div>
        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Browse by Course
        </span>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap tracking-wide transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/50'
                }`}
                title={category.description}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Toggle Filters Pill Matrix */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Dietary Filters & Preferences
          </span>
          {activeDietaryFilters.length > 0 && (
            <button
              onClick={() => activeDietaryFilters.forEach(f => toggleDietaryFilter(f))}
              className="text-[11px] font-semibold text-amber-600 hover:text-amber-800"
            >
              Reset Filters ({activeDietaryFilters.length})
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {DIETARY_FILTERS.map((filter) => {
            const isActive = activeDietaryFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => toggleDietaryFilter(filter.id)}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${filter.color.split(' ')[0]} ring-2 ring-slate-800/20 font-bold border-slate-400 scale-[1.02] shadow-xs`
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {getDietaryIcon(filter.icon)}
                <span>{filter.name}</span>
                {isActive && (
                  <span className="ml-1.5 text-[9px] bg-slate-900 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-sans font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
