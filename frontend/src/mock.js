// Mock data for Naveen Agarwal's Portfolio (Updated for Fresher/New Developer)
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
    { name: "Tailwind CSS", level: 72, icon: "Wind" },
    { name: "Bootstrap", level: 70, icon: "Layout" },
    { name: "Git & GitHub", level: 70, icon: "GitBranch" },
    { name: "Node.js", level: 60, icon: "Server" }

  ],

  techStack: [
    { name: "HTML5", icon: "FileCode", color: "#E34F26" },
    { name: "CSS3", icon: "Palette", color: "#1572B6" },
    { name: "JavaScript", icon: "Zap", color: "#F7DF1E" },
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
      title: "Personal Portfolio Website",
      description: "A responsive personal portfolio website built with React.js and Tailwind CSS, featuring smooth animations and modern design principles.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      techStack: ["React", "Tailwind CSS", "JavaScript", "HTML5"],
      githubUrl: "https://github.com/naveen/portfolio-website",
      liveUrl: "https://naveen-portfolio.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "Todo List App",
      description: "A simple yet functional todo list application with local storage, built to practice JavaScript fundamentals and DOM manipulation.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
      techStack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      githubUrl: "https://github.com/naveen/todo-app",
      liveUrl: "https://naveen-todo-app.netlify.app",
      featured: false
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A weather application that fetches real-time weather data using a public API, showcasing API integration skills.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      techStack: ["JavaScript", "CSS3", "Weather API", "Bootstrap"],
      githubUrl: "https://github.com/naveen/weather-dashboard",
      liveUrl: "https://naveen-weather-app.netlify.app",
      featured: true
    },
    {
      id: 4,
      title: "Simple AI Chatbot",
      description: "A basic chatbot interface built with React that demonstrates understanding of AI integration concepts and modern UI development.",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      techStack: ["React", "CSS3", "JavaScript", "API Integration"],
      githubUrl: "https://github.com/naveen/simple-chatbot",
      liveUrl: "https://naveen-chatbot-demo.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "Recipe Finder App",
      description: "A recipe search application that helps users find recipes based on ingredients, built to practice API handling and React components.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      techStack: ["React", "CSS3", "Recipe API", "JavaScript"],
      githubUrl: "https://github.com/naveen/recipe-finder",
      liveUrl: "https://naveen-recipe-app.netlify.app",
      featured: false
    },
    {
      id: 6,
      title: "Landing Page Clone",
      description: "A pixel-perfect recreation of a modern landing page to practice CSS layout techniques and responsive design principles.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      githubUrl: "https://github.com/naveen/landing-page-clone",
      liveUrl: "https://naveen-landing-clone.netlify.app",
      featured: true
    },
    {
      id: 7,
      title: "Expense Tracker",
      description: "A personal finance tracker that allows users to log expenses and view spending trends, built with React and local storage.",
      category: "Web",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
      techStack: ["React", "CSS3", "JavaScript", "LocalStorage"],
      githubUrl: "https://github.com/naveen/Expense-tracker-clone ",
      liveUrl: "https://naveen-expense-tracker.netlify.app",
      featured: false
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
    description: "Passionate Front-End Developer and fresh graduate specializing in React.js, JavaScript, and modern web technologies. Looking for opportunities to grow and contribute.",
    keywords: "Front-End Developer, Fresh Graduate, React Developer, JavaScript, Web Development, Entry Level, Portfolio, Naveen Agarwal, New Developer, Fresher",
    author: "Naveen Agarwal"

  }
};