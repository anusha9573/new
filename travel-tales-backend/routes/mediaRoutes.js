const express = require('express');
const mediaController = require('../controllers/mediaController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'uploads')); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes with authentication middleware applied
router.post('/', authMiddleware, upload.single('file'), mediaController.uploadMedia);
router.get('/', mediaController.getAllMedia);
router.get('/:id', authMiddleware, mediaController.getMediaById);
router.delete('/:id', authMiddleware, mediaController.deleteMedia);

module.exports = router;
