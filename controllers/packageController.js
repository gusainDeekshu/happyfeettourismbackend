const Package = require('../models/Package');

// Get all packages for the user website
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new package (Admin)
// @desc    Upload image to Cloudinary and Save Package to DB
// @route   POST /api/packages
exports.createPackage = async (req, res) => {
  try {
    const { title, price, location, duration, description, itinerary, category } = req.body;

    // image from multer
    const imageFile = req.file?.path;

    if (!imageFile) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageFile, {
      folder: 'happy_feet_tourism/packages',
    });

    const newPackage = await Package.create({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      price,
      location,
      duration,
      description,
      category,
      itinerary: JSON.parse(itinerary || '[]'),
      image: uploadResponse.secure_url,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Upload/Save Error:', error);
    res.status(500).json({ message: error.message });
  }
};
// Update an existing package (Admin)
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a package (Admin)
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};