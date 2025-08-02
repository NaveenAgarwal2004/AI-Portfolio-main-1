import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ============= PUBLIC APIs =============

export const portfolioAPI = {
  // Get personal information
  getPersonal: () => apiClient.get('/portfolio/personal'),
  
  // Get all projects
  getProjects: (category = '') => {
    const params = category && category !== 'All' ? { category } : {};
    return apiClient.get('/portfolio/projects', { params });
  },
  
  // Get featured projects
  getFeaturedProjects: () => apiClient.get('/portfolio/projects/featured'),
  
  // Get tech stack
  getTechStack: () => apiClient.get('/portfolio/tech-stack'),
  
  // Get portfolio stats
  getStats: () => apiClient.get('/portfolio/stats')
};

// ============= CONTACT API =============

export const contactAPI = {
  // Submit contact form
  submitContact: (contactData) => apiClient.post('/contact', contactData)
};

// ============= AUTH APIs =============

export const authAPI = {
  // Login
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  // Verify token
  verify: () => apiClient.post('/auth/verify'),
  
  // Logout
  logout: () => apiClient.post('/auth/logout')
};

// ============= ADMIN APIs =============

export const adminAPI = {
  // Dashboard
  getDashboard: () => apiClient.get('/admin/dashboard'),
  
  // Projects Management
  getProjects: () => apiClient.get('/admin/projects'),
  createProject: (projectData) => apiClient.post('/admin/projects', projectData),
  updateProject: (id, projectData) => apiClient.put(`/admin/projects/${id}`, projectData),
  deleteProject: (id) => apiClient.delete(`/admin/projects/${id}`),
  
  // Personal Info Management
  getPersonal: () => apiClient.get('/admin/personal'),
  updatePersonal: (personalData) => apiClient.put('/admin/personal', personalData),
  
  // Tech Stack Management
  getTechStack: () => apiClient.get('/admin/tech-stack'),
  createTechStack: (techData) => apiClient.post('/admin/tech-stack', techData),
  updateTechStack: (id, techData) => apiClient.put(`/admin/tech-stack/${id}`, techData),
  deleteTechStack: (id) => apiClient.delete(`/admin/tech-stack/${id}`),
  
  // File Uploads
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return apiClient.post('/admin/upload/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  uploadProfileImage: (file) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    return apiClient.post('/admin/upload/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Contact Messages
  getMessages: (params = {}) => apiClient.get('/contact/messages', { params }),
  updateMessageStatus: (id, status) => apiClient.put(`/contact/messages/${id}/status`, { status })
};

// Add better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    
    // Handle CORS and network errors
    if (!error.response) {
      console.error('Network Error - Check CORS or Backend URL');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;