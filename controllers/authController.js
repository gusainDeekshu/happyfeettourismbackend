const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth Admin & get token
// @route   POST /api/auth/login
exports.loginAdmin = async (req, res) => {
  const { username } = req.body;

  try {
    console.log(`[ADMIN LOGIN] Attempt → username: ${username}`);

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.warn(
        `[ADMIN LOGIN FAILED] User not found → username: ${username}`
      );
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const isMatch = await admin.matchPassword(req.body.password);

    if (!isMatch) {
      console.warn(
        `[ADMIN LOGIN FAILED] Incorrect password → username: ${username}`
      );
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    console.log(`[ADMIN LOGIN SUCCESS] username: ${username}`);

    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error(
      `[ADMIN LOGIN ERROR] username: ${username} | error: ${error.message}`
    );

    res.status(500).json({
      message: 'Server error during login',
    });
  }
};


// @desc    Register a new Admin (Run this once via Postman to create your first admin)
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  const adminExists = await Admin.findOne({ username });

  if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

  const admin = await Admin.create({ username, password });
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};