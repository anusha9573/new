const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

// Define the absolute path for the uploads directory
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Upload a new media file
// @route   POST /api/media
exports.uploadMedia = async (req, res) => {
  console.log(req)
  try { console.log(req)
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const { filename } = req.file;

    const media = new Media({
      url: `/uploads/${filename}`,
      description: req.body.description,
      uploader: req.user.id // Assuming you have user authentication middleware
    });

    await media.save();

    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all media files
// @route   GET /api/media
exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get media by ID
// @route   GET /api/media/:id
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a media file
// @route   DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media not found' });
    }

    // Delete the media file from the server
    fs.unlinkSync(media.url);

    // Delete the media document from the database
    await media.remove();

    res.json({ msg: 'Media removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};