import mongoose from 'mongoose';
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
