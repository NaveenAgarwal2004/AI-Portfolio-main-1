const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Personal = require('../models/Personal');
const Project = require('../models/Project');
const TechStack = require('../models/TechStack');

// Updated data for fresher/new developer profile
const mockData = {
  personal: {
    name: "Naveen Agarwal",
    title: "Front-End Developer",
    tagline: "Passionate fresher eager to build modern, responsive web experiences with clean code and innovative design",
    bio: "Recent graduate and enthusiastic Front-End Developer with a strong foundation in modern web technologies. I'm passionate about creating responsive, user-friendly interfaces using React.js, Tailwind CSS, and JavaScript. Currently learning the MERN stack and exploring AI-powered web applications. Looking for opportunities to grow and contribute to exciting projects.",
    email: "naveen.agarwal.dev@gmail.com",
    phone: "+91 98765 43210",
    location: "India",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    resumeUrl: "",
    socialLinks: {
      github: "https://github.com/naveen-agarwal",
      linkedin: "https://linkedin.com/in/naveen-agarwal-dev",
      twitter: "https://twitter.com/naveen_dev",
      email: "mailto:naveen.agarwal.dev@gmail.com"
    }
  },

  projects: [
    {
      title: "Personal Portfolio Website",
      description: "A responsive personal portfolio website built with React.js and Tailwind CSS, featuring smooth animations and modern design principles.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      techStack: ["React", "Tailwind CSS", "JavaScript", "HTML5"],
      githubUrl: "https://github.com/naveen/portfolio-website",
      liveUrl: "https://naveen-portfolio.vercel.app",
      featured: true,
      order: 1
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that fetches real-time weather data using a public API, showcasing API integration skills.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      techStack: ["JavaScript", "CSS3", "Weather API", "Bootstrap"],
      githubUrl: "https://github.com/naveen/weather-dashboard",
      liveUrl: "https://naveen-weather-app.netlify.app",
      featured: true,
      order: 2
    },
    {
      title: "Landing Page Clone",
      description: "A pixel-perfect recreation of a modern landing page to practice CSS layout techniques and responsive design principles.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      githubUrl: "https://github.com/naveen/landing-page-clone",
      liveUrl: "https://naveen-landing-clone.netlify.app",
      featured: true,
      order: 3
    },
    {
      title: "Todo List App",
      description: "A simple yet functional todo list application with local storage, built to practice JavaScript fundamentals and DOM manipulation.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
      techStack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      githubUrl: "https://github.com/naveen/todo-app",
      liveUrl: "https://naveen-todo-app.netlify.app",
      featured: false,
      order: 4
    },
    {
      title: "Recipe Finder App",
      description: "A recipe search application that helps users find recipes based on ingredients, built to practice API handling and React components.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      techStack: ["React", "CSS3", "Recipe API", "JavaScript"],
      githubUrl: "https://github.com/naveen/recipe-finder",
      liveUrl: "https://naveen-recipe-app.netlify.app",
      featured: false,
      order: 5
    },
    {
      title: "Simple AI Chatbot",
      description: "A basic chatbot interface built with React that demonstrates understanding of AI integration concepts and modern UI development.",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      techStack: ["React", "CSS3", "JavaScript", "API Integration"],
      githubUrl: "https://github.com/naveen/simple-chatbot",
      liveUrl: "https://naveen-chatbot-demo.vercel.app",
      featured: false,
      order: 6
    }
  ],

  techStack: [
    { name: "HTML5", icon: "FileCode", logoUrl: "", color: "#E34F26", category: "Frontend", order: 1 },
    { name: "CSS3", icon: "Palette", logoUrl: "", color: "#1572B6", category: "Frontend", order: 2 },
    { name: "JavaScript", icon: "Zap", logoUrl: "", color: "#F7DF1E", category: "Frontend", order: 3 },
    { name: "React", icon: "Component", logoUrl: "", color: "#61DAFB", category: "Frontend", order: 4 },
    { name: "Tailwind CSS", icon: "Wind", logoUrl: "", color: "#06B6D4", category: "Frontend", order: 5 },
    { name: "Bootstrap", icon: "Layout", logoUrl: "", color: "#7952B3", category: "Frontend", order: 6 },
    { name: "Git", icon: "GitBranch", logoUrl: "", color: "#F05032", category: "Tools", order: 1 },
    { name: "GitHub", icon: "Github", logoUrl: "", color: "#181717", category: "Tools", order: 2 },
    { name: "Node.js", icon: "Server", logoUrl: "", color: "#339933", category: "Backend", order: 1 },
    { name: "MongoDB", icon: "Database", logoUrl: "", color: "#47A248", category: "Database", order: 1 }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Personal.deleteMany({});
    await Project.deleteMany({});
    await TechStack.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: 'admin@naveen-portfolio.com',
      password: 'N@veenDev#2025',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create personal information
    const personal = new Personal(mockData.personal);
    await personal.save();
    console.log('Personal information created');

    // Create projects
    for (const projectData of mockData.projects) {
      const project = new Project(projectData);
      await project.save();
    }
    console.log('Projects created');

    // Create tech stack
    for (const techData of mockData.techStack) {
      const tech = new TechStack(techData);
      await tech.save();
    }
    console.log('Tech stack created');

    console.log('✅ Database seeded successfully with fresher profile!');
    console.log('Admin login credentials:');
    console.log('Email: admin@naveen-portfolio.com');
    console.log('Password: N@veenDev#2025');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();