const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Use the same fallback as the controller to ensure matching signatures
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');

      req.user = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(`[Auth Middleware] Verification failed: ${error.message}`);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };