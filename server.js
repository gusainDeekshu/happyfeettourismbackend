require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const { errorHandler } = require('./middleware/errmiddleware');

const authRoutes = require('./routes/authRoutes'); 
const packageRoutes = require('./routes/packageRoutes'); // New
const contactRoutes = require('./routes/contactRoutes'); 
const uploadRoutes = require('./routes/uploadRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const adminGalleryRoutes = require('./routes/adminGalleryRoutes');
connectDB();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001', 'https://happy-feet-tourism.vercel.app'], 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
// Public User Routes
app.use('/api/gallery', galleryRoutes);

// Protected Admin Routes
app.use('/api/admin/gallery', adminGalleryRoutes);
app.get('/', (req, res) => res.send('Happy Feet Tourism API Running...'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));