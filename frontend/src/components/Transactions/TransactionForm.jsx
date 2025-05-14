// src/components/Transactions/TransactionForm.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  IndianRupee, 
  FileText, 
  Tags, 
  Loader2, 
  AlertCircle,
  ChevronDown,
  Check,
  Plus,
  Link as LinkIcon
} from 'lucide-react';
import { useCategories } from '../../Context/CategoryContext';
import { Link } from 'react-router-dom';

const TransactionForm = ({ onSubmit, type, isLoading }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter categories based on the current transaction type
  const filteredCategories = categories.filter(category => category.type === type);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get selected category name
  const getSelectedCategoryName = () => {
    if (!formData.category) return 'Select category';
    const category = filteredCategories.find(cat => cat._id === formData.category);
    return category ? category.name : 'Select category';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    try {
      const result = await onSubmit({
        ...formData,
        amount: amount
      });

      if (result.success) {
        // Reset form
        setFormData({
          title: '',
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0]
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-[#121917] p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-4">
        Add New {type === 'income' ? 'Income' : 'Expense'}
      </h2>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Title *</label>
          <div className="relative">
            <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter title"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">Amount *</label>
          <div className="relative">
            <IndianRupee className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">Category *</label>
          <div className="relative" ref={dropdownRef}>
            <Tags className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
            
            {/* Custom Dropdown Button */}
            <div
              className={`w-full bg-[#1A231F] rounded-lg py-3 px-10 pr-4 flex justify-between items-center cursor-pointer border ${
                dropdownOpen ? 'border-emerald-500' : 'border-transparent'
              } hover:border-emerald-500/50 transition-colors`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className={formData.category ? 'text-white' : 'text-gray-500'}>
                {getSelectedCategoryName()}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                dropdownOpen ? 'rotate-180' : ''
              }`} />
            </div>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 mt-1 w-full bg-[#1A231F] rounded-lg shadow-lg border border-emerald-900/50 max-h-60 overflow-y-auto"
                >
                  {filteredCategories.length > 0 ? (
                    <>
                      {filteredCategories.map((category) => (
                        <div
                          key={category._id}
                          className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-emerald-500/10 transition-colors ${
                            formData.category === category._id ? 'bg-emerald-500/20' : ''
                          }`}
                          onClick={() => {
                            setFormData({ ...formData, category: category._id });
                            setDropdownOpen(false);
                          }}
                        >
                          <span>{category.name}</span>
                          {formData.category === category._id && (
                            <Check className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                      ))}
                      
                      {/* Add Category Link */}
                      <Link 
                        to="/dashboard/categories"
                        className="px-4 py-2 border-t border-emerald-900/50 flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add new category</span>
                      </Link>
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-400 mb-3">No {type} categories available.</p>
                      <Link 
                        to="/dashboard/categories"
                        className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create a category</span>
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Hidden select for form submission */}
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="opacity-0 absolute pointer-events-none"
              required
            >
              <option value="">Select category</option>
              {filteredCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">Date *</label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-400 mb-2 text-sm">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#1A231F] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] resize-none"
            placeholder="Enter description (optional)"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading || filteredCategories.length === 0}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Add {type === 'income' ? 'Income' : 'Expense'}
          </>
        )}
      </motion.button>

      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 bg-amber-500/10 border border-amber-500 text-amber-500 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          <div className="flex-1">
            No {type} categories available. 
            <Link to="/dashboard/categories" className="ml-1 underline hover:text-amber-400">
              Create a category first
            </Link>.
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default TransactionForm; 