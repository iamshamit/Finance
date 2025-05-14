// src/Pages/Income/IncomePage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useTransactions } from '../../Context/TransactionContext';
import TransactionForm from '../../components/Transactions/TransactionForm';
import TransactionList from '../../components/Transactions/TransactionList';
import TransactionStats from '../../components/Transactions/TransactionStats';
import TransactionFilters from '../../components/Transactions/TransactionFilters';

const IncomePage = () => {
  const { incomes, loading, error: incomeError, addIncome, deleteIncome, getTotals } = useTransactions();
  const [isAdding, setIsAdding] = useState(false);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    sortBy: "date"
  });

  // Update filteredIncomes whenever incomes or filters change
  useEffect(() => {
   
    applyFilters();
  }, [incomes, filters]);

  const applyFilters = () => {
    let filtered = [...incomes];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(income => 
        income.title.toLowerCase().includes(searchTerm) ||
        income.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(income => 
        new Date(income.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(income => 
        new Date(income.date) <= new Date(filters.endDate)
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

    setFilteredIncomes(filtered);
  };

  const handleAddIncome = async (formData) => {
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

      // Prepare income data
      const incomeData = {
        title: formData.title.trim(),
        amount: amount,
        category: formData.category,
        description: formData.description.trim(),
        date: formData.date
      };

      // Submit income
      const response = await addIncome(incomeData);
     

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.error || 'Failed to add income');
      }
    } catch (err) {
     
      return { 
        success: false, 
        error: err.message || 'Failed to add income' 
      };
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        const result = await deleteIncome(id);
        if (!result.success) {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to delete income');
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Income Management</h1>
        <p className="text-gray-400">Track and manage your income sources</p>
      </div>

      {/* Income Stats */}
      <TransactionStats transactions={incomes} type="income" />

      {/* Add Income Form */}
      <div className="mb-8">
        <TransactionForm
          type="income"
          onSubmit={handleAddIncome}
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
      
      {/* Income Filters */}
      <TransactionFilters onFilterChange={handleFilterChange} />

      {/* Income List */}
      <TransactionList
        transactions={filteredIncomes}
        onDelete={handleDelete}
        loading={loading}
        error={incomeError}
        type="income"
      />
    </div>
  );
};

export default IncomePage;