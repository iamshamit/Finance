// src/services/transaction.js
import api from './config';

export const transactionService = {
  // Income
  addIncome: async (incomeData) => {
    try {
      const response = await api.post('/api/v1/add-income', incomeData);
      console.log('Raw addIncome response:', response);
      return response.data;
    } catch (err) {
      console.error('Add Income Service Error:', err);
      throw err;
    }
  },

  getIncomes: async () => {
    try {
      const response = await api.get('/api/v1/get-incomes');
      console.log('Raw getIncomes response:', response);
      return response.data;
    } catch (err) {
      console.error('Get Incomes Service Error:', err);
      throw err;
    }
  },

  deleteIncome: async (id) => {
    try {
      const response = await api.delete(`/api/v1/delete-income/${id}`);
      console.log('Raw deleteIncome response:', response);
      return response.data;
    } catch (err) {
      console.error('Delete Income Service Error:', err);
      throw err;
    }
  },

  // Expense
  addExpense: async (expenseData) => {
    try {
      const response = await api.post('/api/v1/add-expense', expenseData);
      console.log('Raw addExpense response:', response);
      return response.data;
    } catch (err) {
      console.error('Add Expense Service Error:', err);
      throw err;
    }
  },

  getExpenses: async () => {
    try {
      const response = await api.get('/api/v1/get-expenses');
      console.log('Raw getExpenses response:', response);
      return response.data;
    } catch (err) {
      console.error('Get Expenses Service Error:', err);
      throw err;
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await api.delete(`/api/v1/delete-expense/${id}`);
      console.log('Raw deleteExpense response:', response);
      return response.data;
    } catch (err) {
      console.error('Delete Expense Service Error:', err);
      throw err;
    }
  }
};