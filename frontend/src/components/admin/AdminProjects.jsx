import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminAPI.getProjects();
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await adminAPI.deleteProject(id);
      if (response.data.success) {
        toast({
          title: 'Project deleted',
          description: 'The project has been deleted successfully.',
          variant: 'success',
        });
        fetchProjects();
      } else {
        toast({
          title: 'Delete failed',
          description: 'Failed to delete the project.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the project.',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Button onClick={() => window.location.href = '/admin/projects/new'}>
          New Project
        </Button>
      </div>
      <div className="space-y-4">
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((project) => (
          <Card key={project._id || project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `/admin/projects/edit/${project._id || project.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(project._id || project.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AdminProjects;
