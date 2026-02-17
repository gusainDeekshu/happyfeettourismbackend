// controllers/authController.js

const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ======================================================
// GENERATE JWT TOKEN
// ======================================================

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

// ======================================================
// LOGIN ADMIN
// @route POST /api/auth/login
// ======================================================

exports.loginAdmin = async (req, res) => {
  try {

    const { username, password } =
      req.body;

    // Find admin
    const admin =
      await Admin.findOne({
        username,
      });

    // Admin not found
    if (!admin) {
      console.warn(
        `[ADMIN LOGIN FAILED] User not found → ${username}`
      );

      return res.status(401).json({
        message:
          'Invalid username or password',
      });
    }

    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    // Wrong password
    if (!isMatch) {
      console.warn(
        `[ADMIN LOGIN FAILED] Wrong password → ${username}`
      );

      return res.status(401).json({
        message:
          'Invalid username or password',
      });
    }

    // Success
    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(
        admin._id
      ),
    });

  } catch (error) {
    console.error(
      `[ADMIN LOGIN ERROR] ${error.message}`
    );

    res.status(500).json({
      message:
        'Server error during login',
    });
  }
};

// ======================================================
// REGISTER ADMIN
// @route POST /api/auth/register
// ======================================================

exports.registerAdmin = async (req, res) => {
  try {

    const { secretKey } = req.body;

    if (
      secretKey !==
      process.env.ADMIN_SECRET_KEY
    ) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const username =
      req.body.username || 'admin';

    const password =
      req.body.password || 'password123';

    const adminExists =
      await Admin.findOne({
        username,
      });

    if (adminExists) {
      return res.status(400).json({
        message:
          'Admin already exists',
      });
    }

    // DO NOT HASH HERE
    const admin = await Admin.create({
      username,
      password,
    });

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(
        admin._id
      ),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

// ======================================================
// CHANGE PASSWORD
// @route POST /api/auth/change-password
// ======================================================

exports.changePassword = async (
  req,
  res
) => {
  try {

    console.log(
      '\n========== CHANGE PASSWORD START =========='
    );

    console.log(
      '[REQUEST BODY]',
      req.body
    );

    const {
      username,
      oldPassword,
      newPassword,
    } = req.body;

    console.log(
      '[STEP 1] Searching admin:',
      username
    );

    // FIND ADMIN
    const admin =
      await Admin.findOne({
        username,
      });

    // ADMIN NOT FOUND
    if (!admin) {

      console.log(
        '[ERROR] Admin not found'
      );

      return res.status(404).json({
        message: 'Admin not found',
      });
    }

    console.log(
      '[STEP 2] Admin found:',
      admin.username
    );

    console.log(
      '[STEP 3] Stored hashed password:',
      admin.password
    );

    console.log(
      '[STEP 4] Comparing old password'
    );

    // VERIFY OLD PASSWORD
    const isMatch =
      await bcrypt.compare(
        oldPassword,
        admin.password
      );

    console.log(
      '[COMPARE RESULT]',
      isMatch
    );

    // WRONG PASSWORD
    if (!isMatch) {

      console.log(
        '[ERROR] Old password incorrect'
      );

      return res.status(401).json({
        message:
          'Old password is incorrect',
      });
    }

    console.log(
      '[STEP 5] Old password verified'
    );

    console.log(
      '[STEP 6] Generating salt'
    );

    // HASH NEW PASSWORD
   
   admin.password = newPassword;

  



    await admin.save();

    console.log(
      '[SUCCESS] Password updated successfully'
    );

    console.log(
      '========== CHANGE PASSWORD END ==========\n'
    );

    // SUCCESS RESPONSE
    res.status(200).json({
      message:
        'Password changed successfully',
    });

  } catch (error) {

    console.error(
      '\n========== CHANGE PASSWORD ERROR =========='
    );

    console.error(
      '[ERROR MESSAGE]',
      error.message
    );

    console.error(
      '[STACK]',
      error.stack
    );

    console.error(
      '========== ERROR END ==========\n'
    );

    res.status(500).json({
      message:
        'Server error while changing password',
    });
  }
};