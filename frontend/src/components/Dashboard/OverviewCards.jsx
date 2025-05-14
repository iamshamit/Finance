// src/Pages/Dashboard/components/OverviewCards.jsx
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, IndianRupee } from 'lucide-react';

const OverviewCards = ({ totalIncome, totalExpense, balance }) => {
  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/20'
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#121917] p-6 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-gray-400">{card.title}</p>
              <motion.div 
                className="flex items-center gap-1 text-2xl font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <IndianRupee className={card.color} />
                <span className={card.color}>{card.amount.toFixed(2)}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;