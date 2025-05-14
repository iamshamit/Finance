import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Calendar,
  IndianRupee,
  Tag,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

// Create a new component for animated numbers
const AnimatedNumber = ({ value }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={value} // This ensures the animation runs when the value changes
    >
      {value.toFixed(2)}
    </motion.span>
  );
};

const TransactionList = ({ transactions, onDelete, loading, error, type }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 p-8 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center p-8 text-gray-400">
        <FileText className="w-12 h-12 mx-auto mb-2" />
        <p>
          No {type}s found. Add your first {type} using the form above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {transactions.map((transaction) => (
          <motion.div
            key={transaction._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#121917] rounded-xl p-4 hover:bg-[#1A231F] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  {transaction.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(transaction.date), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {transaction.category.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <AnimatedNumber value={transaction.amount} />
                  </div>
                </div>
                {transaction.description && (
                  <p className="mt-2 text-gray-400">
                    {transaction.description}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(transaction._id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;