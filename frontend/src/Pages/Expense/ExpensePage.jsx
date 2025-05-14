// For ExpensePage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../../Context/TransactionContext';
import TransactionForm from '../../components/Transactions/TransactionForm';
import TransactionList from '../../components/Transactions/TransactionList';
import TransactionStats from '../../components/Transactions/TransactionStats';
import TransactionFilters from '../../components/Transactions/TransactionFilters';
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const ExpensePage = () => {
  const { expenses, loading, error: expenseError, addExpense, deleteExpense, getTotals } = useTransactions();
  const [isAdding, setIsAdding] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    sortBy: "date"
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    transactionId: null,
    transactionTitle: '',
    isDeleting: false
  });

  // Update filteredExpenses whenever expenses or filters change
  useEffect(() => {
    applyFilters();
  }, [expenses, filters]);

  const applyFilters = () => {
    let filtered = [...expenses];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(searchTerm) ||
        expense.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) <= new Date(filters.endDate)
      );
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredExpenses(filtered);
  };

  const handleAddExpense = async (formData) => {
    try {
      setIsAdding(true);
      setError(null);

      // Ensure all required fields are present
      if (!formData.title || !formData.amount || !formData.category || !formData.date) {
        return { 
          success: false, 
          error: 'Please fill in all required fields' 
        };
      }

      // Validate amount
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        return { 
          success: false, 
          error: 'Amount must be a positive number' 
        };
      }

      // Prepare expense data
      const expenseData = {
        title: formData.title.trim(),
        amount: amount,
        category: formData.category,
        description: formData.description.trim(),
        date: formData.date
      };

      // Submit expense
      const response = await addExpense(expenseData);

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.error || 'Failed to add expense');
      }
    } catch (err) {
      return { 
        success: false, 
        error: err.message || 'Failed to add expense' 
      };
    } finally {
      setIsAdding(false);
    }
  };

  const openDeleteConfirmation = (transaction) => {
  // Check if transaction is a string (ID) or an object
  const transactionId = typeof transaction === 'string' ? transaction : transaction?._id;
  const transactionTitle = typeof transaction === 'string' ? 'this expense' : transaction?.title || 'this expense';
  
  // Validate that we have a valid ID
  if (!transactionId) {
    console.error("Invalid transaction data:", transaction);
    setError("Cannot delete: Invalid transaction data");
    return;
  }
  
  setDeleteConfirmation({
    isOpen: true,
    transactionId: transactionId,
    transactionTitle: transactionTitle,
    isDeleting: false
  });
};

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      transactionId: null,
      transactionTitle: '',
      isDeleting: false
    });
  };

  const handleDelete = async () => {
  try {
    // Validate transaction ID before attempting to delete
    if (!deleteConfirmation.transactionId) {
      setError("Cannot delete: Missing transaction ID");
      closeDeleteConfirmation();
      return;
    }
    
    setDeleteConfirmation(prev => ({ ...prev, isDeleting: true }));
    const result = await deleteExpense(deleteConfirmation.transactionId);
    
    if (!result.success) {
      setError(result.error);
    }
    
    // Close the confirmation dialog
    closeDeleteConfirmation();
  } catch (err) {
    console.error("Delete error:", err);
    setError('Failed to delete income'); // or 'Failed to delete expense'
    setDeleteConfirmation(prev => ({ ...prev, isDeleting: false }));
  }
};

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Expense Management</h1>
        <p className="text-gray-400">Track and manage your expenses</p>
      </div>

      {/* Expense Stats */}
      <TransactionStats transactions={expenses} type="expense" />

      {/* Expense Filters */}
      <TransactionFilters onFilterChange={handleFilterChange} />

      {/* Add Expense Form */}
      <div className="mb-8">
        <TransactionForm
          type="expense"
          onSubmit={handleAddExpense}
          isLoading={isAdding}
        />
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Expense List */}
      <TransactionList
        transactions={filteredExpenses}
        onDelete={openDeleteConfirmation}
        loading={loading}
        error={expenseError}
        type="expense"
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        title="Delete Expense"
        itemName={<span className="font-semibold text-white">{deleteConfirmation.transactionTitle}</span>}
        itemType="expense"
        isDeleting={deleteConfirmation.isDeleting}
      />
    </div>
  );
};

export default ExpensePage;