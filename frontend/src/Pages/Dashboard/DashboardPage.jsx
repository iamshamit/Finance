// src/Pages/Dashboard/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../../Context/TransactionContext';
import OverviewCards from '../../components/Dashboard/OverviewCards';
import TransactionChart from '../../components/Dashboard/TransactionChart';
import CategoryDistribution from '../../components/Dashboard/CategoryDistribution';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import MonthlyComparison from '../../components/Dashboard/MonthlyComparison';
import SpendingTrends from '../../components/Dashboard/SpendingTrends';


const DashboardPage = () => {
  const { incomes, expenses, getTotals, loading } = useTransactions();
  const { totalIncome, totalExpense, balance } = getTotals();
  const { 
    monthlyIncome,
    monthlyExpense,
    monthlyBalance 
  } = getTotals();
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your financial activity</p>
      </div>

      {/* Overview Cards */}
      <OverviewCards 
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionChart 
          incomes={incomes}
          expenses={expenses}
        />
        <CategoryDistribution 
          transactions={[...incomes, ...expenses]}
        />
      </div>

      {/* Monthly Comparison & Spending Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyComparison 
          incomes={incomes}
          expenses={expenses}
        />
        <SpendingTrends 
          expenses={expenses}
        />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions 
        transactions={[...incomes, ...expenses].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        )}
      />
    </div>
  );
};

export default DashboardPage;