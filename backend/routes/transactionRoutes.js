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

router.route('/')
  .get(getTransactions)
  .post(addTransaction);

router.get('/stats', getTransactionStats);
router.get('/monthly', getMonthlyTransactions);

router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;