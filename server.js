// server.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 

// Import Routes
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // <--- 1. ADD THIS IMPORT
const { errorHandler } = require('./middleware/errmiddleware');
const serviceRoutes = require('./routes/serviceRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  // Use specific origins to allow credentials (cookies/headers) securely
  origin: ['http://localhost:3000', 'http://localhost:3001','https://admin-hercules-deployment.vercel.app','https://user-hercules-deployment.vercel.app'], 
  credentials: true
}));
app.use(express.json());

// --- ROUTES ---

// 1. Products (assuming productRoutes has /products)
app.use('/api', productRoutes); 
app.use('/api', categoryRoutes);
// 2. Auth (Login/Register)
app.use('/api/auth', authRoutes);

// 3. Content (Projects, Categories, Services)
app.use('/api/content', contentRoutes);

// 4. Contact & Inquiries 
// FIXED: Mount at '/api' so the internal routes (/contact, /inquiries) work correctly
app.use('/api', contactRoutes); 
app.use('/api', serviceRoutes);
// --- 2. REGISTER THE UPLOAD ROUTE ---
app.use('/api/upload', uploadRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Hercules Sports API is running...');
});

// --- ERROR HANDLER (MUST BE LAST) ---
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});