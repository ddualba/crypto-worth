const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../../models/User');
const Coin = require('../../models/Coin');

// @route   POST api/coins
// @desc    Add new coin
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('exchange', 'Exchange or Wallet name is required').not().isEmpty(),
      check('symbol', 'Symbol is required').not().isEmpty(),
      check('name', 'Coin name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { exchange, symbol, name, quantity } = req.body;

    try {
      const newCoin = new Coin({
        symbol,
        name,
        exchange,
        quantity,
        user: req.user.id
      });

      const coin = await newCoin.save();
      res.json(coin);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/coins
// @desc    Get list of user's coins
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const coins = await Coin.find({ user: req.user.id });
    // add .sort({ symbol: 1})

    if (!coins) {
      return res.status(400).json({ msg: 'There are no coins for this user' });
    }
    res.json(coins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - Get coins by user');
  }
});

// @route   GET api/coins/:coin_id *** TESTED
// @desc    Get coin by id
// @access  Private

router.get('/:coin_id', auth, async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.coin_id);
    if (!coin) {
      return res.status(404).json({ msg: 'There is no coin with that id' });
    }
    res.json(coin);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Coin not found' });
    }
    res.status(500).send('Server Error - Get Coin by Id');
  }
});

// @route   PATCH api/coins/:id [x/]
// @desc    Update a coins exchange, quantity only
// @access  Private

router.patch(
  '/:id',
  [auth, [check('quantity', 'Quantity is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { exchange, quantity } = req.body;

    // build a Fields object
    const coinFields = {};
    if (exchange) coinFields.exchange = exchange;
    if (quantity) coinFields.quantity = quantity;

    try {
      const coin = await Coin.findById(req.params.id);

      // check coin exists
      if (!coin) {
        return res.status(404).json({ msg: 'Coin not found' });
      }

      // check user is authorized to update
      if (coin.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // update coin
      updatedCoin = await Coin.findByIdAndUpdate(
        req.params.id,
        { $set: coinFields },
        { new: true }
      );

      res.json(updatedCoin);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Coin object not found' });
      }
      res.status(500).send('Server Error - Updating Coin');
    }
  }
);

// @route   DELETE api/coins/:id  [x/]
// @desc    Delete a coin
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);

    if (!coin) {
      return res.status(404).json({ msg: 'Coin not found' });
    }

    // check that user deleting the Coin is the owner of Coin
    //  >> coin.user is an object, needs to be converted to string to check
    if (coin.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await coin.remove();

    res.json({ msg: 'Coin removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Coin object not found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;
