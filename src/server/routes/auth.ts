import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate unique account number
    const accountNumber = Math.random().toString().slice(2, 12);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      accountNumber,
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
      expiresIn: '1d',
    });

    res.status(201).json({ token, user: { name, email, accountNumber } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        accountNumber: user.accountNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;