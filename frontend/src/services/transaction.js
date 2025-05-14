// src/services/transactions.js
import api from './config';

export const transactionService = {
  // Income
  addIncome: async (incomeData) => {
    const response = await api.post('/api/v1/add-income', incomeData);
    return response.data;
  },

  getIncomes: async () => {
    const response = await api.get('/api/v1/get-incomes');
    return response.data;
  },

  deleteIncome: async (id) => {
    const response = await api.delete(`/api/v1/delete-income/${id}`);
    return response.data;
  },

  // Expense
  addExpense: async (expenseData) => {
    try {
      const response = await api.post('/api/v1/add-expense', expenseData);
      console.log('Add Expense Service Response:', response);
      return response;
    } catch (err) {
      console.error('Add Expense Service Error:', err);
      throw err;
    }
  },

  getExpenses: async () => {
    const response = await api.get('/api/v1/get-expenses');
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await api.delete(`/api/v1/delete-expense/${id}`);
    return response.data;
  }
};