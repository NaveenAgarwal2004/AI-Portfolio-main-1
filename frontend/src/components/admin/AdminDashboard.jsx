import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Code,
  TrendingUp,
  Users,
  Calendar,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { adminAPI } from '../../services/api';
import { useToast } from '../../hooks/use-toast';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentProjects = dashboardData?.recentProjects || [];
  const recentMessages = dashboardData?.recentMessages || [];

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects || 0,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Featured Projects',
      value: `${stats.featuredProjects || 0}/${stats.totalProjects || 0}`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Tech Stack Items',
      value: stats.techStackCount || 0,
      icon: Code,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'New Messages',
      value: `${stats.newMessages || 0}/${stats.totalMessages || 0}`,
      icon: MessageSquare,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <LayoutDashboard className="h-8 w-8 text-blue-400" />
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-blue-400" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project._id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">{project.title}</p>
                      <p className="text-gray-400 text-sm">{project.category}</p>
                    </div>
                  </div>
                  {project.featured && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No projects yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message._id} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{message.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      message.status === 'new' 
                        ? 'bg-green-600 text-white' 
                        : message.status === 'read'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{message.message}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No messages yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => window.location.href = '/admin/projects/new'}
              className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-center transition-colors duration-200"
            >
              <FolderOpen className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Add Project</p>
            </button>
            <button 
              onClick={() => window.location.href = '/admin/personal'}
              className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white text-center transition-colors duration-200"
            >
              <Users className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Edit Profile</p>
            </button>
            <button 
              onClick={() => window.location.href = '/admin/tech-stack'}
              className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-center transition-colors duration-200"
            >
              <Code className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Manage Skills</p>
            </button>
            <button 
              onClick={() => window.location.href = '/admin/messages'}
              className="p-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white text-center transition-colors duration-200"
            >
              <MessageSquare className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">View Messages</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">AI Projects</span>
              <span className="text-white font-semibold">{stats.aiProjects || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Web Projects</span>
              <span className="text-white font-semibold">{stats.webProjects || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Technologies</span>
              <span className="text-white font-semibold">{stats.techStackCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Contact Messages</span>
              <span className="text-white font-semibold">{stats.totalMessages || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Database</span>
              <span className="text-green-400 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">API Status</span>
              <span className="text-green-400 font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Operational
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Last Updated</span>
              <span className="text-white font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;