import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProjects from './components/admin/AdminProjects';
import AdminProjectNew from './components/admin/AdminProjectNew';
import AdminProjectEdit from './components/admin/AdminProjectEdit';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import { portfolioAPI } from './services/api';

// SEO Component
const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
  }, [title, description, keywords]);

  return null;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [personalResponse, projectsResponse, techStackResponse, statsResponse] = await Promise.all([
          portfolioAPI.getPersonal(),
          portfolioAPI.getProjects(),
          portfolioAPI.getTechStack(),
          portfolioAPI.getStats()
        ]);

        setPortfolioData({
          personal: {
            ...personalResponse.data.data,
            socialLinks: {
              github: "https://github.com/NaveenAgarwal2004",
              linkedin: "https://linkedin.com/in/naveen-agar",
              email: "mailto:naveenagarwal7624@gmail.com",
              twitter: "https://x.com/NaveenAgar47373"
            }
          },
          projects: projectsResponse.data.data,
          techStack: techStackResponse.data.data,
          stats: statsResponse.data.data
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Set fallback data
        setPortfolioData({
          personal: {
            name: 'Naveen Agarwal',
            title: 'Front-End Web Developer',
            tagline: 'Building modern, responsive web experiences with clean code and creative design'
          },
          projects: [],
          techStack: [],
          stats: {}
        });
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    // Debounce fetchPortfolioData to reduce rapid calls
    const debounceTimeout = setTimeout(() => {
      fetchPortfolioData();
    }, 500);

    return () => clearTimeout(debounceTimeout);
    fetchPortfolioData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const seoData = portfolioData?.personal ? {
    title: `${portfolioData.personal.name} - ${portfolioData.personal.title} | Portfolio`,
    description: portfolioData.personal.tagline,
    keywords: `${portfolioData.personal.name}, Front-End Developer, React Developer, MERN Stack, Portfolio, JavaScript, Web Development, AI Projects, Tailwind CSS`
  } : {
    title: "Naveen Agarwal - Front-End Web Developer | Portfolio",
    description: "Front-End Web Developer specializing in React.js, Tailwind CSS, and MERN Stack",
    keywords: "Front-End Developer, React Developer, Portfolio, JavaScript, Web Development"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden md:overflow-visible">
      <SEO {...seoData} />
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 w-full max-w-full md:max-w-full mx-auto">
        <Hero personalData={portfolioData?.personal} />
        <About personalData={portfolioData?.personal} statsData={portfolioData?.stats} />
        <TechStack techStackData={portfolioData?.techStack} />
        <Projects projectsData={portfolioData?.projects} />
        <Contact />
      </main>
      <Footer personalData={portfolioData?.personal} />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Placeholder routes - will be implemented next */}
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/new" element={<AdminProjectNew />} />
              <Route path="projects/edit/:id" element={<AdminProjectEdit />} />
              <Route path="personal" element={<div className="p-6 text-white">Personal Info - Coming Soon</div>} />
              <Route path="tech-stack" element={<div className="p-6 text-white">Tech Stack - Coming Soon</div>} />
              <Route path="messages" element={<div className="p-6 text-white">Messages - Coming Soon</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;