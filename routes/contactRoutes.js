const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createContact, getAllContacts, updateContactStatus } = require('../controllers/contactController');

// Public Route (For Website Form)
router.post('/contact', createContact);

// Admin Routes (For Admin Panel)
// Note: We map '/inquiries' here because your Admin Hook calls '/api/inquiries'
router.get('/inquiries', protect, getAllContacts);
router.put('/inquiries/:id', protect, updateContactStatus);

module.exports = router;