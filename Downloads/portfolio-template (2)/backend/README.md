# Portfolio Backend API

Express.js backend with MongoDB for the portfolio website.

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
PORT=5000
\`\`\`

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Run the Server
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
\`\`\`

## API Endpoints

### Public Routes

#### Projects
- `GET /api/projects` - Get all published projects
- `GET /api/projects?category=web-design-development` - Filter by category
- `GET /api/projects/:id` - Get single project

#### Categories
- `GET /api/categories` - Get all categories with project counts
- `GET /api/categories/:slug` - Get single category

### Admin Routes (Require Authentication)

#### Authentication
- `POST /api/admin/register` - Create admin account
- `POST /api/admin/login` - Login and get JWT token

#### Project Management
- `GET /api/admin/projects` - Get all projects (including unpublished)
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

#### Category Management
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

## Authentication

Protected routes require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## First Time Setup

1. Create an admin account:
\`\`\`bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"yourpassword"}'
\`\`\`

2. Login to get token:
\`\`\`bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
\`\`\`

3. Use the returned token for authenticated requests.
