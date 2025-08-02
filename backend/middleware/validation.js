const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// Auth validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(), // Move normalizeEmail after validation
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

// Contact form validation rules - FIXED
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(), // Move normalizeEmail after validation
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Project validation rules
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['AI', 'Web'])
    .withMessage('Category must be either AI or Web'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('imagePublicId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Image public ID must be a string'),
  body('githubUrl')
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('liveUrl')
    .isURL()
    .withMessage('Live URL must be a valid URL'),
  body('techStack')
    .isArray({ min: 1 })
    .withMessage('Tech stack must be an array with at least one item'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// Personal info validation rules
const personalValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('title')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  body('tagline')
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage('Tagline must be between 10 and 300 characters'),
  body('bio')
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('Bio must be between 50 and 2000 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(), // Move normalizeEmail after validation
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('profileImageUrl')
    .optional()
    .isURL()
    .withMessage('Profile image must be a valid URL'),
  body('resumeUrl')
    .optional()
    .isURL()
    .withMessage('Resume must be a valid URL'),
  body('resumePublicId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Resume public ID must be a string'),
  body('profileImagePublicId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Profile image public ID must be a string'),
  body('socialLinks.github')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('socialLinks.linkedin')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be a valid URL'),
  body('socialLinks.twitter')
    .optional()
    .isURL()
    .withMessage('Twitter URL must be a valid URL'),
  body('socialLinks.email')
    .optional()
    .isEmail()
    .withMessage('Contact email must be a valid email')
];

// Tech stack validation rules
const techStackValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('icon')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Icon must be between 1 and 100 characters'),
  body('color')
    .isHexColor()
    .withMessage('Color must be a valid hex color'),
  body('category')
    .isIn(['Frontend', 'Backend', 'Database', 'Tools', 'Cloud', 'Mobile'])
    .withMessage('Category must be one of: Frontend, Backend, Database, Tools, Cloud, Mobile'),
  body('logoUrl')
    .optional()
    .isURL()
    .withMessage('Logo URL must be a valid URL'),
  body('logoPublicId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Logo public ID must be a string'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

module.exports = {
  handleValidationErrors,
  loginValidation,
  contactValidation,
  projectValidation,
  personalValidation,
  techStackValidation
};