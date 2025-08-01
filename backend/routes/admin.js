const express = require('express');
const Personal = require('../models/Personal');
const Project = require('../models/Project');
const TechStack = require('../models/TechStack');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { uploadResume, uploadProfileImage, deleteFromCloudinary } = require('../config/cloudinary');
const { 
  projectValidation, 
  personalValidation, 
  techStackValidation, 
  handleValidationErrors 
} = require('../middleware/validation');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// ============= PROJECTS MANAGEMENT =============

// GET /api/admin/projects - Get all projects for admin
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ featured: -1, order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// POST /api/admin/projects - Create new project
router.post('/projects', projectValidation, handleValidationErrors, async (req, res) => {
  try {
    const projectData = req.body;
    
    // If featured is true, optionally unfeatured other projects (optional business logic)
    if (projectData.featured) {
      const featuredCount = await Project.countDocuments({ featured: true });
      if (featuredCount >= 3) {
        // Optionally limit featured projects to 3
        await Project.updateOne(
          { featured: true },
          { featured: false },
          { sort: { updatedAt: 1 } }
        );
      }
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

// PUT /api/admin/projects/:id - Update project
router.put('/projects/:id', projectValidation, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// DELETE /api/admin/projects/:id - Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

// ============= PERSONAL INFO MANAGEMENT =============

// GET /api/admin/personal - Get personal info for editing
router.get('/personal', async (req, res) => {
  try {
    let personal = await Personal.findOne();
    
    if (!personal) {
      // Create default personal data if none exists
      personal = new Personal({
        name: 'Naveen Agarwal',
        title: 'Front-End Web Developer',
        tagline: 'Building modern, responsive web experiences with clean code and creative design',
        bio: 'Passionate Front-End Developer with expertise in modern web technologies.',
        email: 'naveen.agarwal.dev@gmail.com',
        phone: '+91 98765 43210',
        location: 'India',
        socialLinks: {
          github: 'https://github.com/naveen-agarwal',
          linkedin: 'https://linkedin.com/in/naveen-agarwal-dev',
          twitter: 'https://twitter.com/naveen_dev',
          email: 'mailto:naveen.agarwal.dev@gmail.com'
        }
      });
      await personal.save();
    }

    res.json({
      success: true,
      data: personal
    });
  } catch (error) {
    console.error('Error fetching personal data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch personal information'
    });
  }
});

// PUT /api/admin/personal - Update personal info
router.put('/personal', personalValidation, handleValidationErrors, async (req, res) => {
  try {
    const updateData = req.body;

    let personal = await Personal.findOne();
    
    if (!personal) {
      personal = new Personal(updateData);
    } else {
      Object.assign(personal, updateData);
    }

    await personal.save();

    res.json({
      success: true,
      message: 'Personal information updated successfully',
      data: personal
    });
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update personal information'
    });
  }
});

// ============= FILE UPLOADS =============

// POST /api/admin/upload/resume - Upload resume
router.post('/upload/resume', uploadResume.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file provided'
      });
    }

    // Update personal info with new resume URL
    let personal = await Personal.findOne();
    
    // Delete old resume from Cloudinary if exists
    if (personal && personal.resumePublicId) {
      try {
        await deleteFromCloudinary(personal.resumePublicId, 'raw');
      } catch (deleteError) {
        console.error('Error deleting old resume:', deleteError);
      }
    }

    if (!personal) {
      personal = new Personal({
        name: 'Naveen Agarwal',
        title: 'Front-End Web Developer',
        tagline: 'Building modern, responsive web experiences',
        bio: 'Passionate Front-End Developer',
        email: 'naveen.agarwal.dev@gmail.com'
      });
    }

    personal.resumeUrl = req.file.path;
    personal.resumePublicId = req.file.public_id;
    await personal.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.public_id,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resume'
    });
  }
});

// POST /api/admin/upload/profile-image - Upload profile image
router.post('/upload/profile-image', uploadProfileImage.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No profile image provided'
      });
    }

    // Update personal info with new profile image URL
    let personal = await Personal.findOne();
    
    if (!personal) {
      personal = new Personal({
        name: 'Naveen Agarwal',
        title: 'Front-End Web Developer',
        tagline: 'Building modern, responsive web experiences',
        bio: 'Passionate Front-End Developer',
        email: 'naveen.agarwal.dev@gmail.com'
      });
    }

    personal.profileImageUrl = req.file.path;
    await personal.save();

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      data: {
        url: req.file.path,
        publicId: req.file.public_id
      }
    });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile image'
    });
  }
});

// ============= TECH STACK MANAGEMENT =============

// GET /api/admin/tech-stack - Get all tech stack items
router.get('/tech-stack', async (req, res) => {
  try {
    const techStack = await TechStack.find()
      .sort({ category: 1, order: 1, name: 1 });

    res.json({
      success: true,
      data: techStack
    });
  } catch (error) {
    console.error('Error fetching tech stack:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tech stack'
    });
  }
});

// POST /api/admin/tech-stack - Create new tech stack item
router.post('/tech-stack', techStackValidation, handleValidationErrors, async (req, res) => {
  try {
    const techItem = new TechStack(req.body);
    await techItem.save();

    res.status(201).json({
      success: true,
      message: 'Tech stack item created successfully',
      data: techItem
    });
  } catch (error) {
    console.error('Error creating tech stack item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create tech stack item'
    });
  }
});

// PUT /api/admin/tech-stack/:id - Update tech stack item
router.put('/tech-stack/:id', techStackValidation, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const techItem = await TechStack.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!techItem) {
      return res.status(404).json({
        success: false,
        message: 'Tech stack item not found'
      });
    }

    res.json({
      success: true,
      message: 'Tech stack item updated successfully',
      data: techItem
    });
  } catch (error) {
    console.error('Error updating tech stack item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update tech stack item'
    });
  }
});

// DELETE /api/admin/tech-stack/:id - Delete tech stack item
router.delete('/tech-stack/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const techItem = await TechStack.findByIdAndDelete(id);

    if (!techItem) {
      return res.status(404).json({
        success: false,
        message: 'Tech stack item not found'
      });
    }

    res.json({
      success: true,
      message: 'Tech stack item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tech stack item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete tech stack item'
    });
  }
});

// ============= DASHBOARD STATS =============

// GET /api/admin/dashboard - Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      aiProjects,
      webProjects,
      techStackCount,
      totalMessages,
      newMessages,
      recentProjects,
      recentMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Project.countDocuments({ category: 'AI' }),
      Project.countDocuments({ category: 'Web' }),
      TechStack.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          featuredProjects,
          aiProjects,
          webProjects,
          techStackCount,
          totalMessages,
          newMessages
        },
        recentProjects,
        recentMessages
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

module.exports = router;