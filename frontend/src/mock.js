// Mock data for Naveen Agarwal's Portfolio (Updated with Real GitHub Projects)
export const mockData = {
  personal: {
    name: "Naveen Agarwal",
    title: "Front-End Developer",
    tagline: "Passionate fresher eager to build modern, responsive web experiences with clean code and innovative design",
    bio: "Recent graduate and enthusiastic Front-End Developer with a strong foundation in modern web technologies. I'm passionate about creating responsive, user-friendly interfaces using React.js, Tailwind CSS, and JavaScript. Currently learning the MERN stack and exploring AI-powered web applications. Looking for opportunities to grow and contribute to exciting projects.",
    email: "naveenagarwal7624@gmail.com",
    phone: "+91 9079691064",
    location: "India",
    resumes: [
      {
        name: "Frontend Resume",
        url: "Naveen Agarwal - Frontend.pdf"
      },
      {
        name: "Backend Resume",
        url: "NaveenAgarwal_Backend.pdf"
      }
    ]
  },

  skills: [
    { name: "HTML5", level: 90, icon: "Code2" },
    { name: "CSS3", level: 90, icon: "Palette" },
    { name: "JavaScript", level: 85, icon: "Zap" },
    { name: "React.js", level: 70, icon: "Component" },
    { name: "TypeScript", level: 65, icon: "FileCode" },
    { name: "Tailwind CSS", level: 72, icon: "Wind" },
    { name: "Bootstrap", level: 70, icon: "Layout" },
    { name: "Git & GitHub", level: 70, icon: "GitBranch" },
    { name: "Node.js", level: 60, icon: "Server" }
  ],

  techStack: [
    { name: "HTML5", icon: "FileCode", color: "#E34F26" },
    { name: "CSS3", icon: "Palette", color: "#1572B6" },
    { name: "JavaScript", icon: "Zap", color: "#F7DF1E" },
    { name: "TypeScript", icon: "FileCode", color: "#3178C6" },
    { name: "React", icon: "Component", color: "#61DAFB" },
    { name: "Node.js", icon: "Server", color: "#339933" },
    { name: "MongoDB", icon: "Database", color: "#47A248" },
    { name: "Express", icon: "Layers", color: "#000000" },
    { name: "Tailwind CSS", icon: "Wind", color: "#06B6D4" },
    { name: "Git", icon: "GitBranch", color: "#F05032" },
    { name: "GitHub", icon: "Github", color: "#181717" }
  ],

  projects: [
    {
      id: 1,
      title: "AI Portfolio",
      description: "An innovative AI-powered portfolio website built with modern JavaScript. Features dynamic content generation, interactive AI elements, and cutting-edge web technologies. Recently updated with latest features and optimizations.",
      category: "AI",
      image: "/Assests/Project Images/AI Portfolio.jpeg",
      techStack: ["JavaScript", "React", "AI Integration", "CSS3", "Modern Web APIs"],
      githubUrl: "https://github.com/NaveenAgarwal2004/AI-Portfolio-main-1",
      liveUrl: "https://naveen-ai-portfolio.vercel.app",
      featured: false
    },
    {
      id: 2,
      title: "Street Bazaar Platform",
      description: "A comprehensive e-commerce platform for street vendors and local businesses built with Python. Features vendor management, product catalog, order processing, and payment integration. Supports local marketplace economy.",
      category: "Web",
      image: "/Assests/Project Images/StreetBazzar.jpeg",
      techStack: ["Python", "Django", "PostgreSQL", "REST API", "Payment Gateway"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Street-Bazaar",
      liveUrl: "https://street-bazaar-app.herokuapp.com",
      featured: true
    },
    {
      id: 3,
      title: "Job Board Application",
      description: "A full-featured job portal built with TypeScript. Includes job posting, application tracking, resume management, and advanced search filters. Features employer dashboard and candidate matching system.",
      category: "Web",
      image: "/Assests/Project Images/Job Board.png",
      techStack: ["TypeScript", "React", "Node.js", "MongoDB", "JWT Auth"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Job-Board",
      liveUrl: "https://naveen-job-board.netlify.app",
      featured: false
    },
    {
      id: 4,
      title: "Task Management System",
      description: "An advanced project and task management application built with TypeScript. Features team collaboration, project timelines, task dependencies, and real-time updates. Includes Kanban boards and Gantt charts.",
      category: "Web",
      image: "/Assests/Project Images/Task Management.jpeg",
      techStack: ["TypeScript", "React", "Node.js", "Socket.io", "MongoDB"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Task-Management-System",
      liveUrl: "https://naveen-task-system.vercel.app",
      featured: true
    },
    {
      id: 5,
      title: "Contact Management System",
      description: "A comprehensive CRM system for managing contacts and relationships. Built with TypeScript, featuring contact organization, communication tracking, and analytics dashboard. Includes import/export functionality.",
      category: "Web",
      image: "/Assests/Project Images/Contact Management.jpeg",
      techStack: ["TypeScript", "React", "Express.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Contact-Management-System",
      liveUrl: "https://naveen-crm-system.netlify.app",
      featured: true
    },
    {
      id: 6,
      title: "Online Food Ordering App",
      description: "A beautiful UI for an online food delivery application. Features restaurant listings, menu browsing, cart management, and order tracking. Built with modern JavaScript and responsive design principles.",
      category: "Web",
      image: "/Assests/Project Images/Food Ordering.png",
      techStack: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Online-Food-Application",
      liveUrl: "https://naveen-food-app.netlify.app",
      featured: false
    },
    {
      id: 7,
      title: "Movie Reservation System",
      description: "A complete movie ticket booking system with seat selection, showtime management, and booking confirmation. Built with TypeScript for better code reliability. Features interactive seat map and payment processing.",
      category: "Web",
      image: "/Assests/Project Images/Movie Reservstion.png",
      techStack: ["TypeScript", "React", "CSS3", "LocalStorage", "Payment API"],
      githubUrl: "https://github.com/NaveenAgarwal2004/Movie-Reservation-System",
      liveUrl: "https://naveen-movie-booking.netlify.app",
      featured: true
    },
    {
      id: 8,
      title: "CryptoCurrency Tracker",
      description: "A comprehensive cryptocurrency tracking application built with TypeScript. Features real-time price updates, market data visualization, portfolio tracking, and responsive design with interactive charts and market analysis.",
      category: "Web",
      image: "/Assests/Project Images/Crypto Tracker.jpeg",
      techStack: ["TypeScript", "React", "CSS3", "Crypto API", "Chart.js"],
      githubUrl: "https://github.com/NaveenAgarwal2004/CryptoCurrency-Tracker",
      liveUrl: "https://naveen-crypto-tracker.vercel.app",
      featured: true
    }
  ],

  socialLinks: {
    github: "https://github.com/NaveenAgarwal2004",
    linkedin: "https://linkedin.com/in/naveen-agar",
    email: "mailto:naveenagarwal7624@gmail.com",
    twitter: "https://x.com/NaveenAgar47373"
  },

  seo: {
    title: "Naveen Agarwal - Front-End Developer | Fresh Graduate Portfolio",
    description: "Passionate Front-End Developer and fresh graduate specializing in React.js, TypeScript, JavaScript, and modern web technologies. Check out my projects including CryptoCurrency Tracker and Movie Reservation System.",
    keywords: "Front-End Developer, Fresh Graduate, React Developer, TypeScript, JavaScript, Web Development, Portfolio, Naveen Agarwal, Cryptocurrency Tracker, Movie Booking System",
    author: "Naveen Agarwal"
  }
};