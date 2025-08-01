import React, { useState } from 'react';
import { mockData } from '../mock';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ['All', 'AI', 'Web'];
  
  const filteredProjects = activeFilter === 'All' 
    ? mockData.projects 
    : mockData.projects.filter(project => project.category === activeFilter);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  const ProjectCard = ({ project, featured = false }) => (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gray-800/50 border-gray-700 hover:border-blue-500/50 ${
        featured ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={project.image}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            featured ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Demo
            </Button>
          </div>
        </div>
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-600 text-white">Featured</Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            {project.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-gray-700 text-gray-300 text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              variant="outlined"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my latest work and side projects that showcase my skills and passion for development
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-700/50 rounded-lg p-1 flex gap-1">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "ghost"}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter} Projects
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Featured Projects
                </h3>
                <div className="grid lg:grid-cols-6 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Projects */}
            {regularProjects.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Other Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No projects available yet.</p>
            <p className="text-gray-500">Check back soon for updates!</p>
          </div>
        )}

        {/* View More Projects CTA */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Want to see more of my work?
            </p>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
              onClick={() => window.open('https://github.com/NaveenAgarwal2004', '_blank')}
            >
              <Github className="h-5 w-5 mr-2" />
              View All on GitHub
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
