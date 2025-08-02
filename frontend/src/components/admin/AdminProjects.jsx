import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github,
  Star,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getProjects();
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch projects',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const response = await adminAPI.deleteProject(id);
      if (response.data.success) {
        toast({
          title: 'Project Deleted',
          description: `"${title}" has been deleted successfully.`,
        });
        fetchProjects();
      } else {
        toast({
          title: 'Delete Failed',
          description: 'Failed to delete the project.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the project.',
        variant: 'destructive',
      });
    }
  };

  const toggleFeatured = async (project) => {
    try {
      const response = await adminAPI.updateProject(project._id, {
        ...project,
        featured: !project.featured
      });
      if (response.data.success) {
        toast({
          title: 'Project Updated',
          description: `"${project.title}" is now ${!project.featured ? 'featured' : 'not featured'}.`,
        });
        fetchProjects();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'destructive',
      });
    }
  };

  // Filter and search projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const ProjectCard = ({ project }) => (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-200">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {project.featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-yellow-600 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-gray-900/80 border-gray-600 text-gray-300">
            {project.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg">{project.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack?.length > 3 && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-3 w-3 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Live
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-yellow-400 hover:bg-yellow-400/20"
              onClick={() => toggleFeatured(project)}
            >
              <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
            </Button>
            <Link to={`/admin/projects/edit/${project._id}`}>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-400/20"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/20"
              onClick={() => handleDelete(project._id, project.title)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectRow = ({ project }) => (
    <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-medium">{project.title}</h3>
                {project.featured && (
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                )}
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                  {project.category}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
              <div className="flex gap-1 mt-2">
                {project.techStack?.slice(0, 4).map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-3 w-3 mr-1" />
              Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Live
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-yellow-400 hover:bg-yellow-400/20"
              onClick={() => toggleFeatured(project)}
            >
              <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
            </Button>
            <Link to={`/admin/projects/edit/${project._id}`}>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:bg-blue-400/20"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-400 hover:bg-red-400/20"
              onClick={() => handleDelete(project._id, project.title)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-blue-400" />
            Projects Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your portfolio projects, featured items, and showcase your work.
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{projects.length}</p>
              <p className="text-sm text-gray-400">Total Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{projects.filter(p => p.featured).length}</p>
              <p className="text-sm text-gray-400">Featured</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{projects.filter(p => p.category === 'Web').length}</p>
              <p className="text-sm text-gray-400">Web Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{projects.filter(p => p.category === 'AI').length}</p>
              <p className="text-sm text-gray-400">AI Projects</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="text-gray-300"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="text-gray-300"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterCategory !== 'All' 
                ? 'No projects match your search criteria.' 
                : 'Get started by adding your first project.'}
            </p>
            <Link to="/admin/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProjects.map((project) => 
            viewMode === 'grid' 
              ? <ProjectCard key={project._id} project={project} />
              : <ProjectRow key={project._id} project={project} />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;