// src/Pages/Dashboard/components/TransactionChart.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { format, subDays, startOfWeek, startOfMonth, startOfYear, eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionChart = ({ incomes, expenses }) => {
  const [timeframe, setTimeframe] = useState('week');

  // Helper function to group transactions by date
  const groupTransactionsByDate = (transactions, timeframe) => {
    const grouped = {};
    const today = new Date();
    let startDate;
    let dateFormat;

    switch (timeframe) {
      case 'week':
        startDate = startOfWeek(today);
        dateFormat = 'EEE'; // Mon, Tue, etc.
        break;
      case 'month':
        startDate = startOfMonth(today);
        dateFormat = 'd MMM'; // 1 Jan, 2 Jan, etc.
        break;
      case 'year':
        startDate = startOfYear(today);
        dateFormat = 'MMM'; // Jan, Feb, etc.
        break;
      default:
        startDate = subDays(today, 7);
        dateFormat = 'EEE';
    }

    // Initialize all dates with 0
    const dates = getLabels(timeframe).reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    // Sum transactions for each date
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const formattedDate = format(date, dateFormat);
      if (date >= startDate && date <= today) {
        dates[formattedDate] = (dates[formattedDate] || 0) + transaction.amount;
      }
    });

    return dates;
  };

  // Helper function to get labels based on timeframe
  const getLabels = (timeframe) => {
    const today = new Date();
    let dates;

    switch (timeframe) {
      case 'week':
        dates = eachDayOfInterval({
          start: startOfWeek(today),
          end: today
        });
        return dates.map(date => format(date, 'EEE'));

      case 'month':
        dates = eachDayOfInterval({
          start: startOfMonth(today),
          end: today
        });
        return dates.map(date => format(date, 'd MMM'));

      case 'year':
        dates = eachMonthOfInterval({
          start: startOfYear(today),
          end: today
        });
        return dates.map(date => format(date, 'MMM'));

      default:
        return [];
    }
  };

  const prepareData = () => {
    // Group transactions by date
    const groupedIncomes = groupTransactionsByDate(incomes, timeframe);
    const groupedExpenses = groupTransactionsByDate(expenses, timeframe);

    // Get labels based on timeframe
    const labels = getLabels(timeframe);

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: labels.map(label => groupedIncomes[label] || 0),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: labels.map(label => groupedExpenses[label] || 0),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          tension: 0.4
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#121917] p-6 rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === period
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1A231F] text-gray-400 hover:bg-emerald-500/20'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <Line data={prepareData()} options={options} />
      </div>
    </motion.div>
  );
};

export default TransactionChart;