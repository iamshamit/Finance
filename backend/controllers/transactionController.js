// controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const Category = require('../models/categoryModel');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('category')
      .sort('-date');

    res.json({
      success: true,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions'
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body;

    // Validate category exists and belongs to user
    const categoryExists = await Category.findOne({
      _id: category,
      user: req.user.id
    });

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      description,
      user: req.user.id
    });

    await transaction.populate('category');

    res.status(201).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding transaction'
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting transaction'
    });
  }
};

exports.getTransactionStats = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = {
      income: 0,
      expense: 0,
      totalIncome: 0,
      totalExpense: 0
    };

    stats.forEach(stat => {
      if (stat._id === 'income') {
        formattedStats.income = stat.count;
        formattedStats.totalIncome = stat.total;
      } else {
        formattedStats.expense = stat.count;
        formattedStats.totalExpense = stat.total;
      }
    });

    res.json({
      success: true,
      stats: formattedStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction stats'
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, description } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findOne({
        _id: category,
        user: req.user.id
      });

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, amount, type, category, date, description },
      { new: true, runValidators: true }
    ).populate('category');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating transaction'
    });
  }
};

exports.getMonthlyTransactions = async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1
        }
      }
    ]);

    const monthlyData = stats.reduce((acc, curr) => {
      const year = curr._id.year;
      const month = curr._id.month;
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      
      if (!acc[key]) {
        acc[key] = {
          income: 0,
          expense: 0,
          totalIncome: 0,
          totalExpense: 0
        };
      }

      if (curr._id.type === 'income') {
        acc[key].income = curr.count;
        acc[key].totalIncome = curr.total;
      } else {
        acc[key].expense = curr.count;
        acc[key].totalExpense = curr.total;
      }

      return acc;
    }, {});

    res.json({
      success: true,
      data: monthlyData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly transactions'
    });
  }
};