import React, { useState, useEffect } from 'react';
import { Download, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { portfolioAPI } from '../services/api';

const About = () => {
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const response = await portfolioAPI.getPersonal();
        if (response.data.success) {
          setPersonalData(response.data.data);
        } else {
          throw new Error('Failed to fetch personal data');
        }
      } catch (err) {
        console.error('Error fetching personal data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, []);

  // Use personalData if available
  const displayData = personalData;

  const resumes = [
    {
      name: "Frontend Resume",
      url: displayData.resumeUrl || "/Naveen Agarwal - Frontend.pdf"
    },
    {
      name: "Backend Resume",
      url: "/NaveenAgarwal_Backend.pdf"
    }
  ];

  const handleDownloadResume = (url, name) => {
    // Download resume from public folder
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-96 mx-auto mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="h-80 bg-gray-700 rounded-2xl"></div>
                  <div className="h-64 bg-gray-700 rounded-lg"></div>
                </div>
                <div className="space-y-8">
                  <div className="h-32 bg-gray-700 rounded-lg"></div>
                  <div className="h-64 bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get to know more about my journey, skills, and passion for creating amazing web experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image and Info */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src={displayData.profileImageUrl || "Naveen.jpg"}
                    alt={displayData.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "Naveen.jpg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <Card className="bg-gray-700/50 border-gray-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span>{displayData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <span>{displayData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>{displayData.location}</span>
                  </div>
                </div>
                
                <div className="relative inline-block text-left w-full mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="menu-button"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-haspopup="true"
                  >
                    Download Resume
                    <Download className="h-4 w-4 ml-2" />
                  </button>

                  {isOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        {resumes.map((resume) => (
                          <button
                            key={resume.name}
                            onClick={() => {
                              handleDownloadResume(resume.url, resume.name);
                              setIsOpen(false);
                            }}
                            className="text-gray-300 block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                            role="menuitem"
                            tabIndex="-1"
                          >
                            {resume.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
