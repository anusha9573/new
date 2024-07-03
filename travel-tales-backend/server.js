const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const path = require('path');
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('E:/TravelTales/travel-tales-backend/routes/blogRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
