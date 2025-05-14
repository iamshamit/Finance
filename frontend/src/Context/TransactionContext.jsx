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
      const response = await transactionService.getIncomes();
     
      
      // Extract data from response
      let data;
      if (response && response.data) {
        data = response.data;
      } else {
        data = response;
      }
      
     
      
      setIncomes(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
     
      setError(err.response?.data?.message || 'Failed to fetch incomes');
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getExpenses();
     
      
      // Extract data from response
      let data;
      if (response && response.data) {
        data = response.data;
      } else {
        data = response;
      }
      
     
      
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
     
      setError(err.response?.data?.message || 'Failed to fetch expenses');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (incomeData) => {
    try {
      setLoading(true);
     
      
      const response = await transactionService.addIncome(incomeData);
     
      
      // Try to extract the new transaction from the response
      let newIncome;
      if (response && response.data) {
        newIncome = response.data;
      } else if (response && response.success && response.data) {
        newIncome = response.data;
      } else {
        newIncome = response;
      }
      
     
      
      // Add the new income to the state immediately if we have valid data
      if (newIncome && newIncome._id) {
       
        setIncomes(prev => [...prev, newIncome]);
      } else {
       
        await fetchIncomes(); // Fallback to fetching all incomes
      }
      
      return { success: true, data: newIncome };
    } catch (err) {
     
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to add income' 
      };
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      setLoading(true);
     
      
      const response = await transactionService.addExpense(expenseData);
     
      
      // Try to extract the new transaction from the response
      let newExpense;
      if (response && response.data) {
        newExpense = response.data;
      } else if (response && response.success && response.data) {
        newExpense = response.data;
      } else {
        newExpense = response;
      }
      
     
      
      // Add the new expense to the state immediately if we have valid data
      if (newExpense && newExpense._id) {
       
        setExpenses(prev => [...prev, newExpense]);
      } else {
       
        await fetchExpenses(); // Fallback to fetching all expenses
      }
      
      return { success: true, data: newExpense };
    } catch (err) {
     
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to add expense' 
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
     
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete income' 
      };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await transactionService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      return { success: true };
    } catch (err) {
     
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete expense' 
      };
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
      getTotals
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);