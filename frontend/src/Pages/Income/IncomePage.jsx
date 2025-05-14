// src/Pages/Income/IncomePage.jsx
import { useState } from "react";
import { useTransactions } from "../../Context/TransactionContext";
import TransactionForm from "../../components/Transactions/TransactionForm";
import TransactionList from "../../components/Transactions/TransactionList";
import TransactionStats from "../../components/Transactions/TransactionStats";
import TransactionFilters from "../../components/Transactions/TransactionFilters";

const IncomePage = () => {
  const { incomes, loading, error, addIncome, deleteIncome } =
    useTransactions();
  const [isAdding, setIsAdding] = useState(false);
  const [filteredIncomes, setFilteredIncomes] = useState(incomes);

  const handleAddIncome = async (data) => {
    setIsAdding(true);
    const result = await addIncome(data);
    setIsAdding(false);
    return result;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      await deleteIncome(id);
    }
  };

  const handleFilterChange = (filters) => {
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
        onDelete={handleDelete}
        loading={loading}
        error={error}
        type="income"
      />
    </div>
  );
};

export default IncomePage;
