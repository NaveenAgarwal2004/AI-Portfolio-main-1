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
      github: "https://github.com/NaveenAgarwal2004",
    linkedin: "https://linkedin.com/in/naveen-agar",
    email: "mailto:naveenagarwal7624@gmail.com",
    twitter: "https://x.com/NaveenAgar47373"
    }
  },

  projects: [
    {
      title: "AI Portfolio",
      description: "An innovative AI-powered portfolio website built with modern JavaScript. Features dynamic content generation, interactive AI elements, and cutting-edge web technologies. Recently updated with latest features and optimizations.",
      category: "AI",
      image: "/Assests/Project Images/AI Portfolio.jpeg",
      techStack: ["JavaScript", "React", "AI Integration", "CSS3", "Modern Web APIs"],
      githubUrl: "https://github.com/NaveenAgarwal2004/AI-Portfolio-main-1",
      liveUrl: "https://naveen-ai-portfolio.vercel.app",
      featured: false,
      order: 1
    },
    {
      title: "Street Bazaar Platform",
      description: "A comprehensive e-commerce platform for street vendors and local businesses built with Python. Features vendor management, product catalog, order processing, and payment integration. Supports local marketplace economy.",
      category: "Web",
      image: "/Assests/Project Images/StreetBazzar.jpeg",
      techStack: ["Python", "Django", "PostgreSQL", "REST API", "Payment Gateway"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Street-Bazaar",
      liveUrl: "https://street-bazaar-app.herokuapp.com",
      featured: true,
      order: 2
    },
    {
      title: "Job Board Application",
      description: "A full-featured job portal built with TypeScript. Includes job posting, application tracking, resume management, and advanced search filters. Features employer dashboard and candidate matching system.",
      category: "Web",
      image: "/Assests/Project Images/Job Board.png",
      techStack: ["TypeScript", "React", "Node.js", "MongoDB", "JWT Auth"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Job-Board",
      liveUrl: "https://naveen-job-board.netlify.app",
      featured: false,
      order: 3
    },
    {
      title: "Task Management System",
      description: "An advanced project and task management application built with TypeScript. Features team collaboration, project timelines, task dependencies, and real-time updates. Includes Kanban boards and Gantt charts.",
      category: "Web",
      image: "/Assests/Project Images/Task Management.jpeg",
      techStack: ["TypeScript", "React", "Node.js", "Socket.io", "MongoDB"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Task-Management-System",
      liveUrl: "https://naveen-task-system.vercel.app",
      featured: true,
      order: 4
    },
    {
      title: "Contact Management System",
      description: "A comprehensive CRM system for managing contacts and relationships. Built with TypeScript, featuring contact organization, communication tracking, and analytics dashboard. Includes import/export functionality.",
      category: "Web",
      image: "/Assests/Project Images/Contact Management.jpeg",
      techStack: ["TypeScript", "React", "Express.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Contact-Management-System",
      liveUrl: "https://naveen-crm-system.netlify.app",
      featured: true,
      order: 5
    },
    {
      title: "Online Food Ordering App",
      description: "A beautiful UI for an online food delivery application. Features restaurant listings, menu browsing, cart management, and order tracking. Built with modern JavaScript and responsive design principles.",
      category: "Web",
      image: "/Assests/Project Images/Food Ordering.png",
      techStack: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Online-Food-Application",
      liveUrl: "https://naveen-food-app.netlify.app",
      featured: false,
      order: 6
    },
    {
      title: "Movie Reservation System",
      description: "A complete movie ticket booking system with seat selection, showtime management, and booking confirmation. Built with TypeScript for better code reliability. Features interactive seat map and payment processing.",
      category: "Web",
      image: "/Assests/Project Images/Movie Reservstion.png",
      techStack: ["TypeScript", "React", "CSS3", "LocalStorage", "Payment API"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Movie-Reservation-System",
      liveUrl: "https://naveen-movie-booking.netlify.app",
      featured: true,
      order: 7
    },
    {
      title: "CryptoCurrency Tracker",
      description: "A comprehensive cryptocurrency tracking application built with TypeScript. Features real-time price updates, market data visualization, portfolio tracking, and responsive design with interactive charts and market analysis.",
      category: "Web",
      image: "/Assests/Project Images/Crypto Tracker.jpeg",
      techStack: ["TypeScript", "React", "CSS3", "Crypto API", "Chart.js"],
      githubUrl: "https://github.com/NaveenAgarwal2004/CryptoCurrency-Tracker",
      liveUrl: "https://naveen-crypto-tracker.vercel.app",
      featured: true,
      order: 8
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
      email: 'naveenagarwal7624@gmail.com',
      password: 'MySecure!2025@Portfolio',
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

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();