import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  User, 
  Code, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "An error occurred during logout.",
        variant: "destructive"
      });
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Projects',
      href: '/admin/projects',
      icon: FolderOpen,
      current: location.pathname.startsWith('/admin/projects')
    },
    {
      name: 'Personal Info',
      href: '/admin/personal',
      icon: User,
      current: location.pathname === '/admin/personal'
    },
    {
      name: 'Tech Stack',
      href: '/admin/tech-stack',
      icon: Code,
      current: location.pathname === '/admin/tech-stack'
    },
    {
      name: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare,
      current: location.pathname === '/admin/messages'
    }
  ];

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:flex'} flex-col w-64 bg-gray-800 border-r border-gray-700`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">
          Admin Panel
        </h1>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.href);
                if (mobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                item.current
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex flex-col w-64 h-full">
              <Sidebar mobile />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;