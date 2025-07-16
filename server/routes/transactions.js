const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// @route   GET api/transactions/:walletAddress
// @desc    Get all transactions for a user
// @access  Private
router.get('/:walletAddress', auth, async (req, res) => {
    try {
        // Check if the authenticated user is the owner of the transactions
        if (req.user.walletAddress !== req.params.walletAddress) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const transactions = await Transaction.find({
            $or: [
                { from: req.params.walletAddress },
                { to: req.params.walletAddress },
            ],
        }).sort({ date: -1 });

        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;