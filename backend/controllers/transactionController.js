// controllers/transactionController.js
const Transaction = require('../models/transactionModel');
const Category = require('../models/categoryModel');
// controllers/transactionController.js

// Get all transactions with optional filtering
exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, sort } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    
    // Add type filter if provided
    if (type) {
      filter.type = type;
    }
    
    // Add category filter if provided
    if (category) {
      filter.category = category;
    }
    
    // Add date range filter if provided
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }
    
    // Build sort object
    let sortOptions = { date: -1 }; // Default sort by date descending
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions = { [field]: order === 'asc' ? 1 : -1 };
    }
    
    const transactions = await Transaction.find(filter)
      .sort(sortOptions)
      .populate('category', 'name');
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this for debugging
    
    const { title, amount, description, category, date, type } = req.body;
    
    // Validate required fields
    if (!title || !amount || !category || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, category, and type'
      });
    }
    
    // Validate type
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({
        success: false,
        message: 'Type must be either income or expense'
      });
    }
    
    // Create transaction
    const transaction = await Transaction.create({
      title,
      amount,
      description,
      category,
      date: date || Date.now(),
      type,
      user: req.user.id
    });
    
    // Populate category details
    await transaction.populate('category', 'name');
    
    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Add Transaction Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this transaction'
      });
    }
    
    await transaction.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete Transaction Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    // Check if user owns the transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this transaction'
      });
    }
    
    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name');
    
    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Update Transaction Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
  try {
    // Get total income
    const incomeResult = await Transaction.aggregate([
      { $match: { user: req.user._id, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get total expense
    const expenseResult = await Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get category distribution for expenses
    const categoryDistribution = await Transaction.aggregate([
      { $match: { user: req.user._id, type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);
    
    // Populate category names
    const populatedCategories = await Category.populate(
      categoryDistribution,
      { path: '_id', select: 'name' }
    );
    
    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;
    const totalExpense = expenseResult.length > 0 ? expenseResult[0].total : 0;
    const balance = totalIncome - totalExpense;
    
    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        categoryDistribution: populatedCategories.map(item => ({
          category: item._id ? item._id.name : 'Uncategorized',
          categoryId: item._id ? item._id._id : null,
          amount: item.total
        }))
      }
    });
  } catch (error) {
    console.error('Get Transaction Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get monthly transactions for charts
exports.getMonthlyTransactions = async (req, res) => {
  try {
    const { year } = req.query;
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    
    // Get monthly income
    const monthlyIncome = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'income',
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Get monthly expense
    const monthlyExpense = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'expense',
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Format data for all 12 months
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const formattedData = months.map((month, index) => {
      const monthNumber = index + 1;
      const incomeData = monthlyIncome.find(item => item._id === monthNumber);
      const expenseData = monthlyExpense.find(item => item._id === monthNumber);
      
      return {
        month,
        income: incomeData ? incomeData.total : 0,
        expense: expenseData ? expenseData.total : 0
      };
    });
    
    res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Get Monthly Transactions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};