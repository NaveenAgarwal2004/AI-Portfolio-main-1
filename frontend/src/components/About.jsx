import React, { useState } from 'react';
import { Download, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { mockData } from '../mock';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const resumes = [
    {
      name: "Frontend Resume",
      url: "/Naveen Agarwal - Frontend.pdf"
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
                    src="Naveen.jpg"
                    alt="Naveen Agarwal"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    <span>{mockData.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <span>{mockData.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>{mockData.personal.location}</span>
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
                {/* <Button 
                  onClick={() => handleDownloadResume(resumes[0].url, resumes[0].name)}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-all duration-200 hover:scale-105"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button> */}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Bio and Skills */}
          <div className="space-y-8">
            {/* Bio */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">My Story</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {mockData.personal.bio}
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and staying updated with the latest trends in web development and artificial intelligence.
              </p>
            </div>

            {/* Skills Progress Bars */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
              <div className="grid gap-6">
                {mockData.skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-blue-400 text-sm">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-700"
                      style={{
                        '--progress-background': '#1f2937',
                        '--progress-foreground': '#3b82f6'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
