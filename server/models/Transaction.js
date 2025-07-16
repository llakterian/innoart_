const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    txHash: {
        type: String,
        required: true,
        unique: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['registration', 'purchase', 'royalty'],
        required: true,
    },
    nft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nft',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('transaction', TransactionSchema);