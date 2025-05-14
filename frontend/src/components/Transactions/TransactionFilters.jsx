// src/components/Transactions/TransactionFilters.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, SlidersHorizontal } from 'lucide-react';

const TransactionFilters = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-[#121917] rounded-xl p-4 mb-6">
      {/* Basic Search */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full bg-[#1A231F] rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="bg-[#1A231F] p-2 rounded-lg text-gray-400 hover:text-emerald-500"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Advanced Filters */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-emerald-950">
          <div>
            <label className="block text-gray-400 mb-2">Start Date</label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full bg-[#1A231F] rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">End Date</label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full bg-[#1A231F] rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full bg-[#1A231F] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionFilters;