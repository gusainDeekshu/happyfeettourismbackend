const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Upload File to Cloudinary
// @route   POST /api/upload
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Create a stream to upload directly from memory
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'hercules_projects', // Folder name in Cloudinary
    },
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Upload failed' });
      }
      // Return the secure URL
      res.json({ url: result.secure_url, public_id: result.public_id });
    }
  );

  // Pipe the file buffer to Cloudinary
  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
};

// @desc    Delete File
// @route   POST /api/upload/delete
exports.deleteFile = async (req, res) => {
  const { public_id } = req.body; // You must save public_id in DB if you want to delete later

  if (!public_id) return res.status(400).json({ message: 'No public_id provided' });

  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};