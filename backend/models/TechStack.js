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
  color: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Cloud', 'Mobile']
  },
  logoUrl: {
    type: String,
    default: '',
    trim: true
  },
  logoPublicId: {
    type: String,
    default: '',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
techStackSchema.index({ category: 1, order: 1, name: 1 });

module.exports = mongoose.model('TechStack', techStackSchema);