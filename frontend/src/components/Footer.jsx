import React from 'react';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { mockData } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'tech-stack' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: mockData.socialLinks.github,
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      href: mockData.socialLinks.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      href: mockData.socialLinks.twitter,
      label: 'Twitter',
      color: 'hover:text-cyan-400'
    },
    {
      icon: Mail,
      href: mockData.socialLinks.email,
      label: 'Email',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <button 
                onClick={scrollToTop}
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
              >
                Naveen<span className="text-blue-500">.</span>
              </button>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Front-End Developer passionate about creating beautiful, functional web experiences. 
              Always learning, always building, always improving.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-500 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <a 
                  href={`mailto:${mockData.personal.email}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {mockData.personal.email}
                </a>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <a 
                  href={`tel:${mockData.personal.phone}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {mockData.personal.phone}
                </a>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="text-gray-400">{mockData.personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Naveen Agarwal. Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>and lots of coffee.</span>
          </div>
          
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;