const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users/:walletAddress
// @desc    Get user profile
// @access  Public
router.get('/:walletAddress', async (req, res) => {
    try {
        const user = await User.findOne({ walletAddress: req.params.walletAddress });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/:walletAddress
// @desc    Update user profile
// @access  Private
router.put('/:walletAddress', auth, async (req, res) => {
    const { name, bio, social, avatar } = req.body;

    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (social) profileFields.social = social;
    if (avatar) profileFields.avatar = avatar;

    try {
        let user = await User.findOne({ walletAddress: req.params.walletAddress });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the authenticated user is the owner of the profile
        if (user.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        user = await User.findByIdAndUpdate(
            user.id,
            { $set: profileFields },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;