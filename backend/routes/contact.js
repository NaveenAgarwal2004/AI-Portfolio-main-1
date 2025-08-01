const express = require('express');
const Contact = require('../models/Contact');
const { sendContactEmail, sendAutoReply } = require('../config/resend');
const { contactValidation, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// 📩 POST /api/contact - Submit contact form
router.post('/', contactValidation, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');

    // 💾 Save contact submission to database
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress,
      userAgent
    });

    await contact.save();

    // 📧 Send admin notification
    try {
      await sendContactEmail({ name, email, message });
      console.log('✅ Admin email sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send admin email:', emailError.message);
    }

    // 🤖 Send auto-reply
    try {
      await sendAutoReply({ name, email });
      console.log('✅ Auto-reply sent successfully');
    } catch (replyError) {
      console.error('❌ Failed to send auto-reply:', replyError.message);
    }

    // 🎉 Final Response
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt
      }
    });

  } catch (error) {
    console.error('💥 Contact form submission error:', error);

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

// 📨 GET /api/contact/messages - Admin: View messages
router.get('/messages', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('💥 Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
});

// ✏️ PUT /api/contact/messages/:id/status - Admin: Update status
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

    const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });

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
    console.error('💥 Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router;
