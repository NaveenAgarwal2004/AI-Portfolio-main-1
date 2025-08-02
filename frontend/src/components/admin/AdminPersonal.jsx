import React, { useState, useEffect } from 'react';
import { 
  User, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const AdminPersonal = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    tagline: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImageUrl: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      email: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPersonalData();
  }, []);

  const fetchPersonalData = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getPersonal();
      if (response.data.success) {
        const data = response.data.data;
        setFormData({
          name: data.name || '',
          title: data.title || '',
          tagline: data.tagline || '',
          bio: data.bio || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          profileImageUrl: data.profileImageUrl || '',
          resumeUrl: data.resumeUrl || '',
          socialLinks: {
            github: data.socialLinks?.github || '',
            linkedin: data.socialLinks?.linkedin || '',
            email: data.socialLinks?.email || '',
            twitter: data.socialLinks?.twitter || ''
          }
        });
        setOriginalData(data);
      }
    } catch (error) {
      console.error('Error fetching personal data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch personal information.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // URL validation for social links
    const urlPattern = /^https?:\/\/.+/;
    if (formData.socialLinks.github && !urlPattern.test(formData.socialLinks.github)) {
      newErrors['socialLinks.github'] = 'Please enter a valid URL';
    }
    if (formData.socialLinks.linkedin && !urlPattern.test(formData.socialLinks.linkedin)) {
      newErrors['socialLinks.linkedin'] = 'Please enter a valid URL';
    }
    if (formData.socialLinks.twitter && !urlPattern.test(formData.socialLinks.twitter)) {
      newErrors['socialLinks.twitter'] = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const response = await adminAPI.updatePersonal(formData);
      if (response.data.success) {
        toast({
          title: 'Personal Info Updated',
          description: 'Your personal information has been updated successfully.',
        });
        setOriginalData(formData);
      } else {
        toast({
          title: 'Update Failed',
          description: response.data.message || 'Failed to update personal information.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error updating personal info:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating personal information.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid File',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Resume file must be less than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploadingResume(true);
    try {
      const response = await adminAPI.uploadResume(file);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          resumeUrl: response.data.data.url
        }));
        toast({
          title: 'Resume Uploaded',
          description: 'Your resume has been uploaded successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload resume.',
        variant: 'destructive',
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please upload an image file.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Image file must be less than 2MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploadingImage(true);
    try {
      const response = await adminAPI.uploadProfileImage(file);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          profileImageUrl: response.data.data.url
        }));
        toast({
          title: 'Profile Image Uploaded',
          description: 'Your profile image has been uploaded successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload profile image.',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const hasChanges = originalData && JSON.stringify(formData) !== JSON.stringify(originalData);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-64"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-700 rounded"></div>
            <div className="h-96 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <User className="h-8 w-8 text-blue-400" />
            Personal Information
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your personal details, contact information, and social links.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button
            type="submit"
            form="personal-form"
            disabled={saving || !hasChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <Card className="bg-yellow-900/20 border-yellow-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm font-medium">You have unsaved changes</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="personal-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Front-End Developer"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="A brief, catchy description of what you do"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tagline ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.tagline && <p className="text-red-400 text-sm mt-1">{errors.tagline}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio *
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell your story, highlight your experience and passion..."
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      errors.bio ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="socialLinks.github"
                      value={formData.socialLinks.github}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['socialLinks.github'] ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors['socialLinks.github'] && <p className="text-red-400 text-sm mt-1">{errors['socialLinks.github']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['socialLinks.linkedin'] ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors['socialLinks.linkedin'] && <p className="text-red-400 text-sm mt-1">{errors['socialLinks.linkedin']}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Profile
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/username"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors['socialLinks.twitter'] ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                  </div>
                  {errors['socialLinks.twitter'] && <p className="text-red-400 text-sm mt-1">{errors['socialLinks.twitter']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="socialLinks.email"
                      value={formData.socialLinks.email}
                      onChange={handleChange}
                      placeholder="mailto:contact@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Files & Preview */}
        <div className="space-y-6">
          {/* File Uploads */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Files & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {formData.profileImageUrl ? (
                    <img 
                      src={formData.profileImageUrl} 
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image"
                    />
                    <label htmlFor="profile-image">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer"
                        disabled={uploadingImage}
                      >
                        {uploadingImage ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      Recommended: 400x400px, Max 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resume/CV
                </label>
                <div className="space-y-3">
                  {formData.resumeUrl && (
                    <div className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300 flex-1">Resume uploaded</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(formData.resumeUrl, '_blank')}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        View
                      </Button>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
                        disabled={uploadingResume}
                      >
                        {uploadingResume ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {formData.resumeUrl ? 'Replace Resume' : 'Upload Resume'}
                          </>
                        )}
                      </Button>
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF format only, Max 5MB
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {showPreview && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-750 border border-gray-600 rounded-lg p-6 space-y-4">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4">
                    {formData.profileImageUrl ? (
                      <img 
                        src={formData.profileImageUrl} 
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {formData.name || 'Your Name'}
                      </h3>
                      <p className="text-blue-400">
                        {formData.title || 'Your Title'}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-gray-300 italic">
                    "{formData.tagline || 'Your tagline will appear here...'}"
                  </p>

                  {/* Bio */}
                  <div>
                    <h4 className="text-white font-medium mb-2">About</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {formData.bio || 'Your bio will appear here...'}
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Contact</h4>
                    <div className="space-y-1 text-sm text-gray-400">
                      {formData.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{formData.email}</span>
                        </div>
                      )}
                      {formData.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{formData.phone}</span>
                        </div>
                      )}
                      {formData.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Social Links</h4>
                    <div className="flex gap-3">
                      {formData.socialLinks.github && (
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300" disabled>
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {formData.socialLinks.linkedin && (
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300" disabled>
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {formData.socialLinks.twitter && (
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300" disabled>
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {formData.socialLinks.email && (
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300" disabled>
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Resume */}
                  {formData.resumeUrl && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Resume</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                        onClick={() => window.open(formData.resumeUrl, '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPersonal;