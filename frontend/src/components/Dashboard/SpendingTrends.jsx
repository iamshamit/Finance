// src/Pages/Dashboard/components/SpendingTrends.jsx
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SpendingTrends = ({ expenses }) => {
  const calculateTrends = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Current month expenses
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    // Previous month expenses
    const previousMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === (currentMonth - 1) && 
             expenseDate.getFullYear() === currentYear;
    });

    // Calculate totals
    const currentTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const previousTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate percentage change
    const percentageChange = previousTotal === 0 ? 100 : 
      ((currentTotal - previousTotal) / previousTotal) * 100;

    // Get top spending categories for current month
    const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
      const category = expense.category.name;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {});

    const topCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      currentTotal,
      previousTotal,
      percentageChange,
      topCategories
    };
  };

  const trends = calculateTrends();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121917] p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-6">Spending Trends</h2>
      
      <div className="space-y-6">
        {/* Monthly Comparison */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1">This Month</p>
            <p className="text-2xl font-bold">₹ {trends.currentTotal.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-1">vs Last Month</p>
            <div className="flex items-center gap-1">
              {trends.percentageChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-emerald-500" />
              )}
              <span className={trends.percentageChange > 0 ? 'text-red-500' : 'text-emerald-500'}>
                {Math.abs(trends.percentageChange).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-gray-400 mb-3">Top Spending Categories</h3>
          <div className="space-y-3">
            {trends.topCategories.map(([category, amount], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A231F] p-3 rounded-lg flex justify-between items-center"
              >
                <span>{category}</span>
                <span className="font-semibold">₹ {amount.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingTrends;