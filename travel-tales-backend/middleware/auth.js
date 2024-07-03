const express = require('express');
const app = express();
const blogRoutes = require('E:/TravelTales/travel-tales-backend/routes/blogRoutes.js');

// Add your middleware and routes
app.use('/api/posts', blogRoutes);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred when uploading
    res.status(400).json({ msg: err.message });
  } else if (err) {
    // Other errors
    res.status(500).json({ msg: err.message });
  } else {
    next();
  }
});
