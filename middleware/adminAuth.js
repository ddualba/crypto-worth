const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;

    // check user has admin property
    const currUser = await User.findById(req.user.id).select('-password');
    const isAdmin = currUser.isAdmin;
    if (!isAdmin) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
