// src/Pages/Dashboard/components/MonthlyComparison.jsx
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyComparison = ({ incomes, expenses }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getCurrentYearData = (transactions) => {
    const currentYear = new Date().getFullYear();
    return months.map(month => {
      const monthIndex = months.indexOf(month);
      return transactions
        .filter(t => {
          const date = new Date(t.date);
          return date.getFullYear() === currentYear && date.getMonth() === monthIndex;
        })
        .reduce((sum, t) => sum + t.amount, 0);
    });
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: getCurrentYearData(incomes),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: getCurrentYearData(expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
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
      },
      title: {
        display: false
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
      <h2 className="text-xl font-semibold mb-6">Monthly Comparison</h2>
      <div className="h-[300px]">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default MonthlyComparison;