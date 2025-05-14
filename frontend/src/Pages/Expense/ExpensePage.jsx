// src/Pages/Expense/ExpensePage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, DollarSign } from 'lucide-react';
import { useTransactions } from '../../Context/TransactionContext';
import TransactionForm from '../../components/Transactions/TransactionForm';
import TransactionList from '../../components/Transactions/TransactionList';
import TransactionStats from '../../components/Transactions/TransactionStats';
import TransactionFilters from '../../components/Transactions/TransactionFilters';

const ExpensePage = () => {
  const { expenses, loading, error: expenseError, addExpense, deleteExpense, getTotals } = useTransactions();
  const [isAdding, setIsAdding] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [error, setError] = useState(null);

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
      console.log('Add Expense Response:', response);

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.error || 'Failed to add expense');
      }
    } catch (err) {
      console.error('Add Expense Error:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to add expense' 
      };
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const result = await deleteExpense(id);
        if (!result.success) {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleFilterChange = (filters) => {
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
        onDelete={handleDelete}
        loading={loading}
        error={expenseError}
        type="expense"
      />
    </div>
  );
};

export default ExpensePage;