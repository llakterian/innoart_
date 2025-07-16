const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Artist = require('../models/Artist');
const User = require('../models/User');

// @route   POST api/artists
// @desc    Register as an artist
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, bio, social, avatar } = req.body;

    try {
        const user = await User.findById(req.user.id);

        let artist = await Artist.findOne({ user: req.user.id });

        if (artist) {
            return res.status(400).json({ msg: 'Artist already registered' });
        }

        artist = new Artist({
            user: req.user.id,
            walletAddress: user.walletAddress,
            name,
            bio,
            social,
            avatar,
        });

        await artist.save();

        user.isArtist = true;
        await user.save();

        res.json(artist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/artists
// @desc    Get all artists
// @access  Public
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find().populate('user', ['name', 'walletAddress']);
        res.json(artists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;