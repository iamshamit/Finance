// src/Pages/Dashboard/components/RecentTransactions.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';

const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions
    .slice(0, 5) // Get only the 5 most recent transactions
    .map(transaction => ({
      ...transaction,
      type: transaction.hasOwnProperty('income') ? 'income' : 'expense'
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121917] p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
      
      <div className="space-y-4">
        <AnimatePresence>
          {recentTransactions.map((transaction, index) => (
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
                    <TrendingUp className={`w-5 h-5 ${
                      transaction.type === 'income' 
                        ? 'text-emerald-500' 
                        : 'text-red-500'
                    }`} />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{transaction.title}</h3>
                  <p className="text-sm text-gray-400">{transaction.category.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;