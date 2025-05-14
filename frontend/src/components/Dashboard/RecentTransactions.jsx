// src/components/Dashboard/RecentTransactions.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions, loading, showViewAll = false }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121917] p-6 rounded-xl flex justify-center items-center h-64"
      >
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </motion.div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#121917] p-6 rounded-xl text-center"
      >
        <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
        <p className="text-gray-400 py-8">No transactions found. Start tracking your finances!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121917] p-6 rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        {showViewAll && (
          <Link to="/dashboard/transactions" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 text-sm">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A231F] p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-500/20' 
                    : 'bg-red-500/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{transaction.title}</h3>
                  <p className="text-sm text-gray-400">
                    {transaction.category?.name || 'Uncategorized'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{Number(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No recent transactions found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;