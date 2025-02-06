import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['transfer', 'deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);