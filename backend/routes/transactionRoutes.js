// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  getMonthlyTransactions
} = require('../controllers/transactionController');

router.use(protect);

// Keep the original routes
router.route('/')
  .get(getTransactions)
  .post(addTransaction);

router.get('/stats', getTransactionStats);
router.get('/monthly', getMonthlyTransactions);

router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

// Add new routes that match the frontend expectations
router.get('/get-incomes', async (req, res) => {
  req.query.type = 'income';
  return getTransactions(req, res);
});

router.get('/get-expenses', async (req, res) => {
  req.query.type = 'expense';
  return getTransactions(req, res);
});

router.post('/add-income', async (req, res) => {
  req.body.type = 'income';
  return addTransaction(req, res);
});

router.post('/add-expense', async (req, res) => {
  req.body.type = 'expense';
  return addTransaction(req, res);
});

router.delete('/delete-income/:id', async (req, res) => {
  return deleteTransaction(req, res);
});

router.delete('/delete-expense/:id', async (req, res) => {
  return deleteTransaction(req, res);
});

module.exports = router;