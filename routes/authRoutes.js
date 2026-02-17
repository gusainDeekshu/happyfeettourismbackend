//routes\authRoutes.js

const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin, changePassword } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Remove or protect this after creating the first admin
router.post('/change-password', changePassword);
module.exports = router;