const express = require('express');
const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactEmail, sendAutoReply } = require('../config/resend');
const { contactValidation, handleValidationErrors } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Contact form specific rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: 'Too many contact submissions. Please try again later.'
  },
  // Skip rate limiting in development or if bypass header is present
  skip: (req, res) => {
    return process.env.NODE_ENV === 'development' || 
           req.headers['x-bypass-rate-limit'] === 'true' ||
           req.query.bypassRateLimit === 'true' ||
           req.headers['x-render-proxy-verify'] !== undefined; // Render proxy verification
  }
});

const router = express.Router();

// Enhanced validation error handler with debugging
const handleValidationErrorsWithDebug = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Validation errors:', errors.array());
    console.log('📝 Request body:', req.body);
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// 📩 POST /api/contact - Submit contact form
router.post('/', contactLimiter, contactValidation, handleValidationErrorsWithDebug, async (req, res) => {
  try {
    console.log('📧 Processing contact form submission:', req.body);
    
    const { name, email, message } = req.body;

    // Get client IP and user agent
    // Check for headers that might contain the real client IP
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.ip || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    console.log('🔍 Client info:', { ipAddress, userAgent });
    
    // Get client IP for tracking submissions
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    Contact.countDocuments({ 
      ipAddress: ipAddress,
      createdAt: { $gte: oneHourAgo }
    })
    .catch(err => {
      console.error('Error tracking submissions:', err);
    });

    // 💾 Save contact submission to database
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress,
      userAgent
    });

    console.log('💾 Saving contact to database...');
    await contact.save();
    console.log('✅ Contact saved successfully');

    // 📧 Send admin notification
    try {
      console.log('📧 Sending admin notification...');
      await sendContactEmail({ name, email, message });
      console.log('✅ Admin notification sent');
    } catch (emailError) {
      console.error('❌ Failed to send admin email:', emailError);
    }

    // 🤖 Send auto-reply
    try {
      console.log('🤖 Sending auto-reply...');
      await sendAutoReply({ name, email });
      console.log('✅ Auto-reply sent');
    } catch (replyError) {
      console.error('❌ Failed to send auto-reply:', replyError);
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
    console.error('❌ Contact form submission error:', error);
    
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

module.exports = router;