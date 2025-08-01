import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import * as THREE from 'three';

const Hero = ({ personalData }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const fullText = personalData?.title || 'Front-End Web Developer';

  // Typing animation
  useEffect(() => {
    if (currentIndex >= fullText.length) return;
    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + fullText[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [currentIndex, fullText]);

  // VANTA.GLOBE effect with mobile optimization
  useEffect(() => {
    const loadVanta = async () => {
      const VANTA = await import('vanta/dist/vanta.globe.min');
      if (vantaRef.current && !vantaEffect.current && window.innerWidth > 640) {
        vantaEffect.current = VANTA.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.75, // Better performance on mobile
          color: 0x00ffff,
          backgroundColor: 0x0f0f23,
          size: 1.0,
          points: 10,
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const name = personalData?.name || 'Naveen Agarwal';
  const tagline =
    personalData?.tagline ||
    'Building modern, responsive web experiences with clean code and creative design';
  const socialLinks = personalData?.socialLinks || {};

  return (
    <section
      id="hero"
      ref={vantaRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#0f0f23] pt-24 pb-32"
      aria-hidden="true"
    >
      {/* Overlay Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          <p className="text-xl text-blue-400 mb-4 animate-fade-in delay-200">
            👋 Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in delay-400">
            {name}
          </h1>
          <div className="text-2xl md:text-4xl font-light text-gray-300 mb-8 h-16 flex items-center justify-center animate-fade-in delay-600">
            <span className="border-r-2 border-blue-500 pr-2 animate-pulse">
              {displayText}
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in delay-800">
            {tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-1000">
            <Button
              onClick={scrollToProjects}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              View My Work <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              onClick={scrollToAbout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              About Me
            </Button>
          </div>
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in delay-1200">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            )}
          </div>
          <div className="animate-bounce">
            <button
              onClick={scrollToAbout}
              className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              <ChevronDown className="h-8 w-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
