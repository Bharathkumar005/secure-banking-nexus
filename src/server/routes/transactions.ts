import express from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get user balance and transactions
router.get('/account', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const transactions = await Transaction.find({
      $or: [{ sender: req.user.userId }, { recipient: req.user.userId }],
    }).sort({ date: -1 });

    res.json({ balance: user.balance, transactions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Transfer money
router.post('/transfer', authenticateToken, async (req, res) => {
  try {
    const { recipientAccountNumber, amount } = req.body;
    const sender = await User.findById(req.user.userId);
    const recipient = await User.findOne({ accountNumber: recipientAccountNumber });

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Update balances
    sender.balance -= amount;
    recipient.balance += amount;

    // Create transaction
    const transaction = new Transaction({
      sender: sender._id,
      recipient: recipient._id,
      type: 'transfer',
      amount,
      description: `Transfer to ${recipient.name}`,
    });

    await Promise.all([sender.save(), recipient.save(), transaction.save()]);

    res.json({ message: 'Transfer successful', balance: sender.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Deposit money
router.post('/deposit', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.userId);

    user.balance += amount;

    const transaction = new Transaction({
      sender: user._id,
      type: 'deposit',
      amount,
      description: 'Deposit',
    });

    await Promise.all([user.save(), transaction.save()]);

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw money
router.post('/withdraw', authenticateToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.userId);

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    user.balance -= amount;

    const transaction = new Transaction({
      sender: user._id,
      type: 'withdraw',
      amount,
      description: 'Withdrawal',
    });

    await Promise.all([user.save(), transaction.save()]);

    res.json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;