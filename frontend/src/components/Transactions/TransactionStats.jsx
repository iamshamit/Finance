// src/components/Transactions/TransactionStats.jsx
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, PieChart, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { useCategories } from '../../Context/CategoryContext';

const TransactionStats = ({ transactions, type }) => {
  const { categories } = useCategories();
  const isExpense = type === 'expense';

  // Calculate total amount
  const totalAmount = transactions.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Calculate category-wise totals
  const categoryTotals = transactions.reduce((acc, curr) => {
    const categoryId = curr.category._id;
    acc[categoryId] = (acc[categoryId] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // Get top categories
  const topCategories = Object.entries(categoryTotals)
    .map(([categoryId, amount]) => ({
      category: categories.find(cat => cat._id === categoryId)?.name || 'Unknown',
      amount
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // Calculate monthly trend
  const currentMonth = new Date().getMonth();
  const currentMonthTotal = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const previousMonthTotal = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth - 1)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const monthlyChange = previousMonthTotal ? 
    ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Main Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121917] p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-lg ${
            isExpense ? 'bg-red-500/20' : 'bg-emerald-500/20'
          }`}>
            {isExpense ? (
              <TrendingDown className="w-6 h-6 text-red-500" />
            ) : (
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Total {isExpense ? 'Expenses' : 'Income'}
            </h3>
            <div className="flex items-center gap-1 text-2xl font-bold">
              <IndianRupee className="w-6 h-6" />
              <motion.span
                key={totalAmount}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={isExpense ? 'text-red-500' : 'text-emerald-500'}
              >
                {totalAmount.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-gray-400">
            <span>Monthly Change</span>
            <div className="flex items-center gap-1">
              {monthlyChange > 0 ? (
                <ArrowUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={monthlyChange > 0 ? 'text-emerald-500' : 'text-red-500'}>
                {Math.abs(monthlyChange).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Total Transactions</span>
            <span>{transactions.length}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Average Amount</span>
            <span>₹{(totalAmount / (transactions.length || 1)).toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#121917] p-6 rounded-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <PieChart className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold">Top Categories</h3>
        </div>
        <div className="space-y-4">
          {topCategories.map((cat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-400">{cat.category}</span>
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                <motion.span
                  key={cat.amount}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {cat.amount.toFixed(2)}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionStats;