// src/components/Transactions/TransactionForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, IndianRupee, FileText, Tags, Loader2, AlertCircle } from 'lucide-react';
import { useCategories } from '../../Context/CategoryContext';

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

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  // Validate required fields
  if (!formData.title || !formData.amount || !formData.category || !formData.date || !formData.description) {
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
    console.error('Form submission error:', err);
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
          <label className="block text-gray-400 mb-2">Title *</label>
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
          <label className="block text-gray-400 mb-2">Amount *</label>
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
          <label className="block text-gray-400 mb-2">Category *</label>
          <div className="relative">
            <Tags className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#1A231F] rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Date *</label>
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
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#1A231F] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
            placeholder="Enter description (optional)"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Add {type === 'income' ? 'Income' : 'Expense'}
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default TransactionForm;