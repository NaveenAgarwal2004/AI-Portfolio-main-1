const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  profileImagePublicId: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  resumePublicId: {
    type: String,
    default: ''
  },
  frontendResumeUrl: {
    type: String,
    default: ''
  },
  frontendResumePublicId: {
    type: String,
    default: ''
  },
  backendResumeUrl: {
    type: String,
    default: ''
  },
  backendResumePublicId: {
    type: String,
    default: ''
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    email: { type: String, default: '' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Personal', personalSchema);