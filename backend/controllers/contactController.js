const Contact = require('../models/Contact');

// @desc    Create a new contact (Public Website)
// @route   POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all inquiries (Admin Panel) - OPTIMIZED WITH SEARCH & PAGINATION
// @route   GET /api/inquiries
exports.getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Search Query (Debounced from frontend)
    const search = req.query.search || '';
    const statusFilter = req.query.status;

    // Build the database query
    let query = {};

    // 1. Search Logic
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Status Filter Logic
    if (statusFilter && statusFilter !== 'All') {
      query.status = statusFilter;
    }

    // 3. Parallel Execution: Get Data + Total Count
    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), 
      Contact.countDocuments(query)
    ]);

    res.json({
      data: contacts,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update status (Admin Panel)
// @route   PUT /api/inquiries/:id
exports.updateContactStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};