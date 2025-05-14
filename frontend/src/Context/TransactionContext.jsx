// src/Context/TransactionContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { transactionService } from '../services/transaction';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getIncomes();
      setIncomes(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message);
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getExpenses();
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (data) => {
    try {
      const newIncome = await transactionService.addIncome(data);
      setIncomes(prev => [...prev, newIncome]);
      return { success: true, data: newIncome };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const addExpense = async (expenseData) => {
  try {
    setLoading(true);
    const response = await transactionService.addExpense(expenseData);
    
    if (response.success) {
      // Add the new expense to the state
      if (response.expense) {
        setExpenses(prev => [...prev, response.expense]);
      }
      // Optionally refresh the full list
      await fetchExpenses();
      return { success: true, data: response.expense };
    } else {
      throw new Error(response.message || 'Failed to add expense');
    }
  } catch (err) {
    console.error('Add Expense Error:', err);
    return { 
      success: false, 
      error: err.response?.data?.message || err.message || 'Failed to add expense'
    };
  } finally {
    setLoading(false);
  }
};

  const deleteIncome = async (id) => {
    try {
      await transactionService.deleteIncome(id);
      setIncomes(prev => prev.filter(income => income._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await transactionService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  // Add getTotals function
  const getTotals = () => {
    const totalIncome = incomes.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const balance = totalIncome - totalExpense;

    // Calculate monthly data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const thisMonthIncomes = incomes.filter(income => {
      const incomeDate = new Date(income.date);
      return incomeDate.getMonth() === currentMonth && 
             incomeDate.getFullYear() === currentYear;
    });

    const thisMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const monthlyIncome = thisMonthIncomes.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const monthlyExpense = thisMonthExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const monthlyBalance = monthlyIncome - monthlyExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
      monthlyIncome,
      monthlyExpense,
      monthlyBalance
    };
  };

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  return (
    <TransactionContext.Provider value={{
      incomes,
      expenses,
      loading,
      error,
      addIncome,
      addExpense,
      deleteIncome,
      deleteExpense,
      fetchIncomes,
      fetchExpenses,
      getTotals // Add getTotals to the context value
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);