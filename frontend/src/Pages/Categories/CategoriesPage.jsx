// src/Pages/Categories/CategoriesPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, Tags, Trash2, AlertCircle } from 'lucide-react';
import { useCategories } from '../../Context/CategoryContext';

const CategoriesPage = () => {
  const { categories, loading, error: categoryError, addCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState('expense'); // Default to expense
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setIsAdding(true);
    setError(null);

    try {
      const result = await addCategory(newCategory.trim(), categoryType);
      console.log('Add Category Result:', result); // Debug log

      if (result.success) {
        setNewCategory('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Add Category Error in Component:', err);
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
        <div className="flex gap-4">
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
          <div>
            <select
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className="bg-[#1A231F] rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={isAdding}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isAdding || !newCategory.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        {console.log('Rendering categories:', categories)} {/* Debug log */}
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
                  className="flex items-center justify-between p-4 hover:bg-emerald-500/5 transition-colors"
                >
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      category.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {category.type}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
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