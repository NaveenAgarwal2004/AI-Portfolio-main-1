const mongoose = require('mongoose');

const techStackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Cloud', 'Mobile'],
    default: 'Frontend'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
techStackSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('TechStack', techStackSchema);