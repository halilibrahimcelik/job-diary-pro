# Job Diary Pro - Job Tracking Application

A full-stack MERN application that helps users track and manage their job applications effectively.

## 🌟 Live Demo

[Job Diary Pro](https://job-diary-pro.vercel.app)

## 📋 Overview

Job Diary Pro is a comprehensive job application tracking system that allows users to:

- Track job applications with detailed information
- Search and filter jobs by various criteria
- Visualize application statistics
- Manage their professional profile
- Store company information with automatic logo detection

This application streamlines the job search process by providing a centralized platform to monitor application status, upcoming interviews, and job search progress.

## 🚀 Features

### User Authentication

- Secure registration and login system
- JWT-based authentication with HTTP-only cookies
- Role-based access control (admin/user)
- Demo account for testing features

### Job Management

- Create, edit, and delete job applications
- Automatic company information retrieval from URL
- Track application status (pending, interview, declined)
- Categorize by job type (full-time, part-time, internship)
- Record work model (remote, hybrid, onsite)

### Search and Filter

- Advanced search functionality for jobs
- Filter by status, type, and work model
- Sort by various criteria (newest, oldest, alphabetical)
- Pagination for better user experience

### Analytics

- Visual statistics dashboard
- Distribution of application statuses
- Job application trends

### User Profile

- Personalized user profiles
- Profile image upload via Amazon S3
- Dark/light mode toggle
- Responsive design for all devices

## 🛠️ Technology Stack

### Frontend

- **React 19** with TypeScript
- **Styled Components** for styling
- **React Router v7** for routing and data actions
- **TanStack Query** (React Query) for data fetching and caching
- **Recharts** for data visualization
- **React Icons** for UI elements
- **Context API** for global state management
- **Axios** for HTTP requests
- **Vite** for build tooling

### Backend

- **Express.js** for REST API development
- **MongoDB** with Mongoose for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for data validation
- **Multer** for file upload handling
- **AWS SDK** for S3 integration
- **TypeScript** for type safety

### Deployment

- **Vercel** for hosting frontend and serverless functions

## 📁 Project Structure

```
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/
│       ├── api/          # API services and queries
│       ├── assets/       # Images and static assets
│       ├── components/   # Reusable components
│       ├── constants/    # Application constants
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page components
│       ├── providers/    # Context providers
│       ├── types/        # TypeScript types
│       └── utils/        # Utility functions
│
└── server/               # Backend Express application
    └── src/
        ├── controllers/  # Request handlers
        ├── errors/       # Custom error classes
        ├── middleware/   # Express middleware
        ├── models/       # Mongoose models
        ├── routes/       # API routes
        ├── types/        # TypeScript types
        └── utils/        # Utility functions
```

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v16+)
- pnpm
- MongoDB

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/halilibrahimcelik/job-diary-pro.git
   cd job-tacking-app
   ```

2. Install dependencies

   ```bash
   # Install server dependencies
   cd server
   pnpm install

   # Install client dependencies
   cd ../client
   pnpm install
   ```

3. Environment variables

   Create `.env` files in both server and client directories:

   **Server .env**

   ```
   PORT=8080
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_LIFETIME=1d
   BUCKET_NAME=your_s3_bucket_name
   BUCKET_REGION=your_s3_region
   CLIENT_URL=http://localhost:3000
   ```

   **Client .env**

   ```
   VITE_API_URL=http://localhost:8080/api/v1
   VITE_NODE_ENV=development
   ```

4. Start development servers

   ```bash
   # Run server
   cd server
   pnpm dev

   # Run client in another terminal
   cd client
   pnpm dev

   # Or run both concurrently from server directory
   cd server
   pnpm server:dev
   ```

## 🔒 Security Features

- HTTP-only cookies for JWT storage
- Password hashing with bcrypt
- Input validation and sanitization
- Protected routes with role-based access
- CORS configuration
- Rate limiting to prevent abuse

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop browsers
- Tablets
- Mobile devices

## 🔍 Key Learning Outcomes

- Building a full-stack TypeScript application
- Implementing secure authentication flows
- Working with MongoDB and Mongoose
- Creating reusable React components
- Managing application state with Context API
- Using React Router data actions for server state
- Integrating with cloud services (AWS S3)
- Deploying a MERN application on Vercel

## 🔮 Future Enhancements

- Email notifications for application status changes
- Calendar integration for interview scheduling
- Document storage for resumes and cover letters
- Networking contact management
- Job application insights and recommendations
- Social sharing functionality

## 📝 License

MIT

## 👨‍💻 Author

[Halil Ibrahim Celik](https://github.com/halilibrahimcelik)

---

Feel free to reach out with any questions or feedback!
