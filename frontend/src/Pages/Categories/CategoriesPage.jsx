// src/Pages/Categories/CategoriesPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Loader2, 
  Tags, 
  Trash2, 
  AlertCircle, 
  ChevronDown, 
  Edit2, 
  Eye,
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useCategories } from '../../Context/CategoryContext';
import { useTransactions } from '../../Context/TransactionContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const { categories, loading, error: categoryError, addCategory, deleteCategory } = useCategories();
  const { incomes, expenses } = useTransactions();
  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState('expense'); // Default to expense
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get transactions for the selected category
  const getCategoryTransactions = (categoryId) => {
    const allTransactions = [...incomes, ...expenses];
    return allTransactions.filter(transaction => 
      transaction.category && transaction.category._id === categoryId
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setIsAdding(true);
    setError(null);

    try {
      const result = await addCategory(newCategory.trim(), categoryType);

      if (result.success) {
        setNewCategory('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to add category');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const result = await deleteCategory(id);
      if (!result.success) {
        setError(result.error);
      }
      // Close the transaction view if the deleted category was selected
      if (selectedCategory && selectedCategory._id === id) {
        setSelectedCategory(null);
      }
    }
  };

  const toggleCategoryTransactions = (category) => {
    if (selectedCategory && selectedCategory._id === category._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-gray-400">Manage your transaction categories</p>
      </div>

      {/* Add Category Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-[#121917] p-6 rounded-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full bg-[#1A231F] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isAdding}
            />
          </div>
          
          {/* Enhanced Dropdown */}
          <div className="relative">
            <div 
              className="bg-[#1A231F] rounded-lg py-3 px-4 pr-10 cursor-pointer flex items-center justify-between min-w-[140px]"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center gap-2">
                {categoryType === 'income' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className="capitalize">{categoryType}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full bg-[#1A231F] rounded-lg shadow-lg overflow-hidden"
              >
                <div 
                  className={`py-2 px-4 cursor-pointer flex items-center gap-2 ${categoryType === 'expense' ? 'bg-[#121917]' : 'hover:bg-[#121917]'}`}
                  onClick={() => {
                    setCategoryType('expense');
                    setDropdownOpen(false);
                  }}
                >
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span>Expense</span>
                </div>
                <div 
                  className={`py-2 px-4 cursor-pointer flex items-center gap-2 ${categoryType === 'income' ? 'bg-[#121917]' : 'hover:bg-[#121917]'}`}
                  onClick={() => {
                    setCategoryType('income');
                    setDropdownOpen(false);
                  }}
                >
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Income</span>
                </div>
              </motion.div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isAdding || !newCategory.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Category
              </>
            )}
          </motion.button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-2 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}
      </motion.form>

      {/* Categories List */}
      <div className="bg-[#121917] rounded-xl">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : categoryError ? (
          <div className="p-8 text-red-500 flex items-center gap-2 justify-center">
            <AlertCircle className="w-6 h-6" />
            {categoryError}
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-gray-400 flex flex-col items-center gap-2">
            <Tags className="w-12 h-12" />
            <p>No categories found. Add your first category above!</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="divide-y divide-emerald-950"
          >
            <AnimatePresence>
              {categories.map((category) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col"
                >
                  <div className="flex items-center justify-between p-4 hover:bg-emerald-500/5 transition-colors">
                    <div className="flex items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        category.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {category.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleCategoryTransactions(category)}
                        className="text-emerald-500 hover:text-emerald-400 p-2"
                        title="View transactions"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(category._id)}
                        className="text-red-500 hover:text-red-600 p-2"
                        title="Delete category"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Category Transactions */}
                  <AnimatePresence>
                    {selectedCategory && selectedCategory._id === category._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#1A231F] overflow-hidden"
                      >
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Tags className="w-5 h-5 mr-2 text-emerald-500" />
                            Transactions in {category.name}
                          </h3>
                          
                          {getCategoryTransactions(category._id).length > 0 ? (
                            <div className="space-y-3">
                              {getCategoryTransactions(category._id).slice(0, 5).map(transaction => (
                                <div 
                                  key={transaction._id} 
                                  className="bg-[#121917] p-3 rounded-lg flex justify-between items-center"
                                >
                                  <div>
                                    <div className="font-medium">{transaction.title}</div>
                                    <div className="text-sm text-gray-400">
                                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                                    </div>
                                  </div>
                                  <div className={`font-semibold ${
                                    transaction.type === 'income' ? 'text-emerald-500' : 'text-red-500'
                                  }`}>
                                    {transaction.type === 'income' ? '+' : '-'}₹{Number(transaction.amount).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                              
                              {getCategoryTransactions(category._id).length > 5 && (
                                <Link 
                                  to={`/dashboard/${category.type === 'income' ? 'income' : 'expenses'}`}
                                  className="flex items-center justify-center gap-1 text-emerald-500 hover:text-emerald-400 py-2 text-sm"
                                >
                                  <span>View all {getCategoryTransactions(category._id).length} transactions</span>
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-400">
                              No transactions found in this category.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;