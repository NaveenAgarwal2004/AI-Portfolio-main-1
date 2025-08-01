🚀 Naveen Agarwal — AI Portfolio (Full-Stack MERN)
This is a dynamic and responsive portfolio website built with the MERN stack, featuring an admin dashboard, secure contact form with email notifications via Resend, and fully customizable content via MongoDB.

🛠 Tech Stack
⚙️ Backend:
Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

Email Integration: Resend API

Image Uploads: Cloudinary

🎨 Frontend:
React.js + Vite

Tailwind CSS

ShadCN/UI & Lucide Icons

React Router DOM

Admin Panel with Protected Routes

📂 Project Structure
bash
Copy
Edit
root/
├── backend/             # Express backend API
│   ├── routes/          # API routes (auth, contact, portfolio, admin)
│   ├── models/          # MongoDB models
│   ├── config/          # Cloudinary, Resend config
│   ├── middleware/      # Auth, validation
│   └── server.js        # Main backend entry point
│
├── frontend/            # React frontend
│   ├── public/          # Static assets (images, resume)
│   ├── src/
│   │   ├── components/  # UI sections (Hero, Projects, Contact etc.)
│   │   ├── admin/       # Admin panel components
│   │   ├── services/    # API service functions
│   │   ├── contexts/    # Auth context
│   │   └── App.js       # App entry point
│
├── .env                 # Environment variables
├── .gitignore
├── README.md
└── package.json
⚡️ Features
🔐 Admin Authentication with JWT

✏️ Admin Dashboard to manage projects, tech stack, and personal info

📬 Secure Contact Form — sends email notifications via Resend API

💾 MongoDB Integration for dynamic content

🌐 Fully Responsive UI using Tailwind + ShadCN

📤 Cloudinary File Uploads for project images and resume

🚧 Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/ai-portfolio.git
cd ai-portfolio
2. Setup the Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file in /backend with:

env
Copy
Edit
PORT=8001
MONGO_URL=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
Start the backend:

bash
Copy
Edit
npm run dev
3. Setup the Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
🌍 Deployment
You can deploy:

Frontend: on Vercel

Backend: on Render 

🧪 Test Admin Login
Login URL: /admin/login

Email: admin@naveen-portfolio.com

Password: N@veenDev#2025

📞 Contact
If you'd like to connect with me:

📧 Email: naveenagarwal7624@gmail.com

🌐 Portfolio Live

🧑‍💻 GitHub

💼 LinkedIn

📄 License
This project is licensed under the MIT License.