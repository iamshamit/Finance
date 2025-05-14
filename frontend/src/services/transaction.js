// src/services/transaction.js
import api from './config';

export const transactionService = {
  // Income
  addIncome: async (incomeData) => {
    try {
      const response = await api.post('/api/v1/add-income', incomeData);
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  },

  getIncomes: async () => {
    try {
      const response = await api.get('/api/v1/get-incomes');
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  },

  deleteIncome: async (id) => {
    try {
      const response = await api.delete(`/api/v1/delete-income/${id}`);
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  },

  // Expense
  addExpense: async (expenseData) => {
    try {
      const response = await api.post('/api/v1/add-expense', expenseData);
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  },

  getExpenses: async () => {
    try {
      const response = await api.get('/api/v1/get-expenses');
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await api.delete(`/api/v1/delete-expense/${id}`);
     
      return response.data;
    } catch (err) {
     
      throw err;
    }
  }
};