const express = require('express');
const Contact = require('../models/Contact');
const { sendContactEmail, sendAutoReply } = require('../config/resend');
const { contactValidation, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', contactValidation, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Get client IP and user agent for security
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Save contact submission to database
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Send email notification to admin
    try {
      await sendContactEmail({ name, email, message });
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
      // Continue execution - don't fail the request if email fails
    }

    // Send auto-reply to user
    try {
      await sendAutoReply({ name, email });
      console.log('Auto-reply email sent successfully');
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError);
      // Continue execution - auto-reply failure is not critical
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// GET /api/contact/messages - Get all contact messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const contacts = await Contact.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: options.page,
          limit: options.limit,
          total,
          pages: Math.ceil(total / options.limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
});

// PUT /api/contact/messages/:id/status - Update contact message status
router.put('/messages/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, read, replied'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router;