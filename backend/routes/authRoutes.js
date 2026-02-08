const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Remove or protect this after creating the first admin

module.exports = router;