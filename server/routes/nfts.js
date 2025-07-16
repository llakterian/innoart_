const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Nft = require('../models/Nft');
const Artist = require('../models/Artist');

// @route   POST api/nfts
// @desc    Create an NFT
// @access  Private
router.post('/', auth, async (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    try {
        const artist = await Artist.findOne({ user: req.user.id });

        if (!artist) {
            return res.status(400).json({ msg: 'User is not a registered artist' });
        }

        const newNft = new Nft({
            artist: artist.id,
            name,
            description,
            price,
            imageUrl,
        });

        const nft = await newNft.save();
        res.json(nft);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/nfts
// @desc    Get all NFTs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const nfts = await Nft.find().populate('artist', ['name', 'walletAddress']);
        res.json(nfts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/nfts/:id/purchase
// @desc    Purchase an NFT
// @access  Private
router.post('/:id/purchase', auth, async (req, res) => {
    try {
        const nft = await Nft.findById(req.params.id);

        if (!nft) {
            return res.status(404).json({ msg: 'NFT not found' });
        }

        if (nft.owner) {
            return res.status(400).json({ msg: 'NFT has already been sold' });
        }

        // In a real application, you would handle the payment processing here.
        // For this example, we'll just update the owner.
        nft.owner = req.user.id;
        await nft.save();

        res.json(nft);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;