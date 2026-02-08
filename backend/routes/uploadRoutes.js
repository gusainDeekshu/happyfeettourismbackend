const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, deleteFile } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', protect, upload.single('file'), uploadFile);
router.post('/delete', protect, deleteFile);

module.exports = router;