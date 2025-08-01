import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

const AdminProjectNew = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert techStack string to array by splitting on commas
      const techStackArray = formData.techStack.split(',').map((tech) => tech.trim()).filter(Boolean);
      const payload = { ...formData, techStack: techStackArray };
      const response = await adminAPI.createProject(payload);
      if (response.data.success) {
        toast({
          title: 'Project Created',
          description: 'The project has been created successfully.',
          variant: 'success',
        });
        navigate('/admin/projects');
      } else {
        toast({
          title: 'Creation Failed',
          description: 'Failed to create the project.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the project.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/Assests/Project Images/your-image.jpg"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Live URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            id="featured"
          />
          <label htmlFor="featured" className="font-medium">Featured</label>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </section>
  );
};

export default AdminProjectNew;
