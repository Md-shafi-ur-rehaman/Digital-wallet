const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  transactionType: {
    type: String,
    enum: ['SEND', 'RECEIVE', 'DEPOSIT', 'WITHDRAWAL'],
    required: true
  },
  method: {
    type: String,
    enum: ['QR', 'PHONE', 'EMAIL', 'INTERNAL'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  transactionFee: {
    type: Number,
    default: 0
  },
  metadata: {
    ipAddress: String,
    device: String,
    location: {
      latitude: Number,
      longitude: Number
    }
  }
}, { timestamps: true });

// Validation to prevent self-transactions
// TransactionSchema.pre('validate', function(next) {
//   if (this.sender.equals(this.recipient)) {
//     next(new Error('Cannot send money to yourself'));
//   }
//   next();
// });

module.exports = mongoose.model('Transaction', TransactionSchema);