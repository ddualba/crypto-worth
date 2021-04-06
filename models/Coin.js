const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  exchange: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  }
});

module.exports = Coin = mongoose.model('coin', CoinSchema);
