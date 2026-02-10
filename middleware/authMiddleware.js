const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;
  console.log('[Auth Middleware] Checking for token in headers:', req.headers.authorization);
console.log('DEBUG: Current JWT Secret is:', process.env.JWT_SECRET);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('[Auth Middleware] Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };