# Portfolio Full-Stack Integration Contracts

## API Endpoints & Data Structures

### Authentication Endpoints
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: { id, email, role } }

POST /api/auth/verify
Headers: Authorization: Bearer <token>
Response: { valid: boolean, user: { id, email, role } }
```

### Public Data Endpoints (No Auth Required)
```
GET /api/portfolio/personal
Response: {
  name: string,
  title: string,
  tagline: string,
  bio: string,
  email: string,
  phone: string,
  location: string,
  profileImageUrl: string,
  resumeUrl: string,
  socialLinks: {
    github: string,
    linkedin: string,
    twitter: string,
    email: string
  }
}

GET /api/portfolio/projects
Response: [{
  _id: string,
  title: string,
  description: string,
  category: "AI" | "Web",
  image: string,
  techStack: string[],
  githubUrl: string,
  liveUrl: string,
  featured: boolean,
  createdAt: Date,
  updatedAt: Date
}]

GET /api/portfolio/tech-stack
Response: [{
  _id: string,
  name: string,
  icon: string,
  logoUrl: string,
  color: string,
  category: string
}]

POST /api/contact
Body: { name: string, email: string, message: string }
Response: { success: boolean, message: string }
```

### Protected Admin Endpoints (Auth Required)
```
GET /api/admin/projects
POST /api/admin/projects
PUT /api/admin/projects/:id
DELETE /api/admin/projects/:id

GET /api/admin/personal
PUT /api/admin/personal

GET /api/admin/tech-stack
POST /api/admin/tech-stack
PUT /api/admin/tech-stack/:id
DELETE /api/admin/tech-stack/:id

POST /api/admin/upload/resume (multipart/form-data)
Response: { url: string, filename: string }
```

## Database Models

### User Model (Admin)
```javascript
{
  _id: ObjectId,
  email: string, // admin email
  password: string, // hashed
  role: "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### Personal Model
```javascript
{
  _id: ObjectId,
  name: string,
  title: string,
  tagline: string,
  bio: string,
  email: string,
  phone: string,
  location: string,
  profileImageUrl: string,
  resumeUrl: string,
  socialLinks: {
    github: string,
    linkedin: string,
    twitter: string,
    email: string
  },
  updatedAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  title: string,
  description: string,
  category: "AI" | "Web",
  image: string, // URL
  techStack: [string],
  githubUrl: string,
  liveUrl: string,
  featured: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### TechStack Model
```javascript
{
  _id: ObjectId,
  name: string,
  icon: string, // Lucide icon name
  logoUrl: string, // Optional custom logo URL
  color: string,
  category: string, // "Frontend", "Backend", "Tools", etc.
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model (for storing submissions)
```javascript
{
  _id: ObjectId,
  name: string,
  email: string,
  message: string,
  status: "new" | "read" | "replied",
  createdAt: Date
}
```

## Mock Data Migration Plan

### Current Mock Data Structure → Database Migration
1. **Personal Info**: Extract from mockData.personal → Personal collection
2. **Projects**: Extract from mockData.projects → Projects collection  
3. **Tech Stack**: Extract from mockData.techStack → TechStack collection
4. **Skills**: Merge with TechStack or separate Skills collection

### Frontend Integration Changes Required
1. **Replace mockData imports** with API calls
2. **Add loading states** for all data fetching
3. **Error handling** for API failures
4. **Authentication context** for admin routes
5. **Form submissions** to backend APIs

## Authentication Flow

### Admin Login Process
1. Admin visits `/admin` route
2. If not authenticated, redirect to `/admin/login`
3. Login form submits to `/api/auth/login`
4. Store JWT token in localStorage/httpOnly cookie
5. Redirect to admin dashboard
6. All admin API calls include Authorization header

### Route Protection
- Frontend: Check token validity before rendering admin routes
- Backend: JWT middleware validates token on protected routes
- Auto-logout on token expiration

## File Upload Strategy

### Resume Upload
- **Endpoint**: POST /api/admin/upload/resume
- **Storage**: Local uploads folder (`/uploads/resume/`)
- **Security**: Validate file type (.pdf only), size limit (5MB)
- **URL Generation**: `${BACKEND_URL}/uploads/resume/${filename}`
- **Overwrite**: Replace existing resume file

### Profile Image (Future Enhancement)
- Similar structure for profile image uploads
- Support jpg, png formats

## Email Integration

### Contact Form Email
- **Service**: Nodemailer with Gmail SMTP or Resend API
- **Template**: HTML email template with form data
- **To**: Admin email from env variables
- **From**: Contact form email with reply-to set to sender
- **Subject**: "Portfolio Contact: {subject/name}"

### Environment Variables Required
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password
ADMIN_EMAIL=admin@example.com
```

## Admin Panel UI Requirements

### Admin Login Page (`/admin/login`)
- Email/password form
- Error handling for invalid credentials
- "Remember me" option
- Clean, professional design

### Admin Dashboard (`/admin`)
- **Projects Management**:
  - List all projects with edit/delete actions
  - Add new project form
  - Image URL input (not file upload initially)
  - Category selection (AI/Web)
  - Featured toggle
  - Tech stack multi-select

- **Personal Info Management**:
  - Edit bio, contact details
  - Update social links
  - Upload resume file
  - Profile image URL input

- **Tech Stack Management**:
  - Add/edit/delete tech items
  - Icon selection from Lucide icons
  - Color picker for accent colors
  - Category organization

### Admin Navigation
- Sidebar with sections: Dashboard, Projects, Personal Info, Tech Stack, Messages
- Logout button
- Responsive design

## Security Considerations

### JWT Security
- Short expiration time (1 hour)
- Refresh token mechanism (optional)
- Secure httpOnly cookies (production)

### File Upload Security
- File type validation
- Size limitations
- Secure file paths
- No executable file uploads

### Input Validation
- Sanitize all user inputs
- Validate email formats
- Escape HTML in contact messages
- Rate limiting on contact form

## Development Phases

### Phase 1: Basic Backend Setup
1. Express server with CORS
2. MongoDB connection
3. Basic route structure
4. JWT authentication middleware

### Phase 2: Core APIs
1. Public portfolio APIs
2. Admin CRUD operations
3. Contact form endpoint
4. Data migration from mock to database

### Phase 3: Admin Panel
1. Admin login component
2. Protected admin routes
3. Admin dashboard with CRUD forms
4. Frontend-backend integration

### Phase 4: Advanced Features
1. File upload handling
2. Email integration
3. Enhanced error handling
4. Production optimizations

## Testing Strategy

### Backend Testing
- Test all API endpoints with curl/Postman
- Verify JWT authentication flow
- Test file upload functionality
- Validate email sending

### Frontend Integration Testing
- Test data loading from APIs
- Verify admin authentication flow
- Test CRUD operations in admin panel
- Confirm contact form submission

### Production Readiness
- Environment variable configuration
- Error logging
- Rate limiting
- Security headers
- Database indexing

## Deployment Configuration

### Environment Variables
```
NODE_ENV=production
PORT=8001
MONGO_URL=mongodb://...
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-password
SMTP_HOST=smtp.gmail.com
SMTP_USER=email@gmail.com
SMTP_PASS=app-password
FRONTEND_URL=http://localhost:3000
```

### Production Considerations
- Use environment-specific configs
- Secure file upload directories
- Implement proper logging
- Add API rate limiting
- Use HTTPS in production
- Optimize database queries

This contract ensures seamless integration between the existing frontend mock data and the new backend system while maintaining clean separation of concerns and production-ready architecture.