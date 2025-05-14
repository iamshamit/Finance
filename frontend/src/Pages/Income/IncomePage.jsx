// For IncomePage.jsx
import { useState, useEffect } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionForm from "../../components/Transactions/TransactionForm";
import TransactionList from "../../components/Transactions/TransactionList";
import TransactionStats from "../../components/Transactions/TransactionStats";
import TransactionFilters from "../../components/Transactions/TransactionFilters";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const IncomePage = () => {
  const { incomes, loading, error: incomeError, addIncome, deleteIncome } = useTransactions();
  const [isAdding, setIsAdding] = useState(false);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
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

  // Update filteredIncomes whenever incomes or filters change
  useEffect(() => {
    applyFilters();
  }, [incomes, filters]);

  const handleAddIncome = async (data) => {
    setIsAdding(true);
    const result = await addIncome(data);
    setIsAdding(false);
    return result;
  };

  const openDeleteConfirmation = (transaction) => {
  // Check if transaction is a string (ID) or an object
  const transactionId = typeof transaction === 'string' ? transaction : transaction?._id;
  const transactionTitle = typeof transaction === 'string' ? 'this income' : transaction?.title || 'this income';
  
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
    const result = await deleteIncome(deleteConfirmation.transactionId); // or deleteExpense
    
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

  const applyFilters = () => {
    let filtered = [...incomes];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (income) =>
          income.title.toLowerCase().includes(searchTerm) ||
          income.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        (income) => new Date(income.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (income) => new Date(income.date) <= new Date(filters.endDate)
      );
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "amount":
          return b.amount - a.amount;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredIncomes(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Income Management</h1>
        <p className="text-gray-400">Track and manage your income sources</p>
      </div>

      {/* Enhanced Stats Section */}
      <TransactionStats transactions={incomes} type="income" />

      {/* Add Income Form */}
      <div className="mb-8">
        <TransactionForm
          type="income"
          onSubmit={handleAddIncome}
          isLoading={isAdding}
        />
      </div>

      {/* Filters */}
      <TransactionFilters onFilterChange={handleFilterChange} />

      {/* Income List */}
      <TransactionList
        transactions={filteredIncomes}
        onDelete={openDeleteConfirmation}
        loading={loading}
        error={incomeError}
        type="income"
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        title="Delete Income"
        itemName={<span className="font-semibold text-white">{deleteConfirmation.transactionTitle}</span>}
        itemType="income"
        isDeleting={deleteConfirmation.isDeleting}
      />
    </div>
  );
};

export default IncomePage;