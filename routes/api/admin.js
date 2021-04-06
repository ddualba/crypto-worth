const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/admin/users
// @desc    Check user isAdmin and return list of users
// @access  Private

router.get('/users', adminAuth, async (req, res) => {
  // router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
