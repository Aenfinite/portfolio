# Portfolio Bulk Upload System

This system allows you to upload multiple portfolio projects with images in bulk, eliminating the need to manually upload each project through the frontend.

## 🚀 Features

- **Bulk Project Upload**: Upload multiple projects with images in one request
- **Bulk Image Upload**: Upload multiple images to specific categories
- **Postman Integration**: Ready-to-use Postman collection
- **Node.js Script**: Automated script for bulk operations
- **Error Handling**: Detailed error reporting for failed uploads
- **Category Support**: All 7 portfolio categories supported

## 📋 Available Categories

- `web-design-development` - Web Design & Development
- `mobile-app` - Mobile App
- `graphic-design` - Graphic Design  
- `branding` - Branding
- `logo-design` - Logo Design
- `packaging-design` - Packaging Design
- `ui-ux` - UI/UX Design

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install form-data axios
```

### 2. Start Your Server

```bash
npm start
```

### 3. Get Admin JWT Token

First, you need to login as admin to get JWT token:

**Option A: Using Postman**
1. Import the Postman collection: `Portfolio_Bulk_Upload_Postman_Collection.json`
2. Set variables:
   - `base_url`: `http://localhost:5000/api`
   - `admin_email`: Your admin email
   - `admin_password`: Your admin password
3. Run "Admin Login" request - JWT token will be saved automatically

**Option B: Using curl**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your_password"}'
```

## 🎯 Method 1: Using Postman (Recommended for Manual Uploads)

### Import Collection
1. Open Postman
2. Import `Portfolio_Bulk_Upload_Postman_Collection.json`
3. Set up environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `admin_email`: Your admin email
   - `admin_password`: Your admin password

### Bulk Upload Projects with Images

1. **Login First**: Run "Admin Login" request
2. **Prepare Your Data**:
   - Create JSON array of projects (see sample format below)
   - Organize your image files
3. **Use "Bulk Upload Projects with Images"**:
   - Add your projects JSON in `projectsData` field
   - Attach all image files in `files` field
   - Send request

### Bulk Upload Images Only

Use category-specific endpoints:
- "Bulk Upload Images Only - Web Design"
- "Bulk Upload Images Only - Mobile App" 
- etc.

Just attach images and send!

## 🎯 Method 2: Using Node.js Script (Recommended for Large Batches)

### Prepare Your Files

1. **Create images directory**:
```bash
mkdir bulk-images
```

2. **Copy all your images** to `bulk-images/` folder

3. **Update the script**:
   - Edit `bulkUpload.js` and set your JWT token
   - Or use login function to get token automatically

### Run the Script

```bash
cd backend/scripts
node bulkUpload.js
```

## 📝 Project Data Format

Each project should follow this structure:

```json
{
  "title": "Project Title",
  "subtitle": "Project subtitle/tagline",
  "mainImage": "main-image-file.jpg",
  "description": "Detailed project description",
  "challenge": "What was the main challenge",
  "solution": "How you solved it",
  "results": [
    "Result 1",
    "Result 2",
    "Result 3"
  ],
  "imageFiles": [
    "additional-image-1.jpg",
    "additional-image-2.jpg"
  ],
  "tags": ["tag1", "tag2"],
  "technologies": ["React", "Node.js"],
  "category": "web-design-development",
  "published": true
}
```

### Required Fields
- `title`, `subtitle`, `description`, `challenge`, `solution`, `category`

### Optional Fields
- `mainImage`: Main project image filename
- `imageFiles`: Array of additional image filenames
- `images`: Array of existing image URLs (if you have some already uploaded)
- `results`: Array of project results
- `tags`: Array of project tags
- `technologies`: Array of technologies used
- `published`: Boolean (default: true)

## 🔧 API Endpoints

### Bulk Upload Projects
```
POST /api/admin/projects/bulk
Content-Type: multipart/form-data
Authorization: Bearer {jwt_token}

Form Data:
- projectsData: JSON string of projects array
- files: All image files referenced in projects
```

### Bulk Upload Images Only
```
POST /api/admin/images/bulk/{category}
Content-Type: multipart/form-data
Authorization: Bearer {jwt_token}

Form Data:
- images: Multiple image files
```

## 💡 Tips for Efficient Bulk Upload

1. **Organize Images**: Keep all images in one folder with descriptive names
2. **Batch by Category**: Upload projects category by category for better organization
3. **Use Consistent Naming**: Use consistent file naming convention
4. **Test Small Batches First**: Start with 2-3 projects to test the process
5. **Check Errors**: Always review the error details in API responses

## 🐛 Troubleshooting

### Common Issues

**1. "Invalid JWT token"**
- Solution: Get a fresh token using login endpoint

**2. "Invalid category"**
- Solution: Use exact category slugs from the list above

**3. "Image not found"**
- Solution: Ensure image files exist in the specified directory

**4. "Missing required fields"**
- Solution: Check all required fields are present in project data

### Error Response Format
```json
{
  "totalProjects": 5,
  "successfulUploads": 3,
  "errors": 2,
  "errorDetails": [
    "Project 2: Missing required field 'title'",
    "Project 4: Invalid category 'invalid-cat'"
  ]
}
```

## 📁 File Structure

```
backend/
├── scripts/
│   ├── bulkUpload.js              # Node.js bulk upload script
│   ├── sampleProjectsData.json    # Sample project data
│   └── Portfolio_Bulk_Upload_Postman_Collection.json
├── uploads/                       # Image storage
│   ├── web-design-development/
│   ├── mobile-app/
│   ├── branding/
│   └── ...
└── bulk-images/                   # Your images for bulk upload
    ├── project1-main.jpg
    ├── project1-detail1.jpg
    └── ...
```

## 🎉 Success! 

After successful upload, your projects will be:
- Saved in MongoDB database
- Images stored in appropriate category folders
- Available through your frontend portfolio
- Ready for public viewing (if published: true)

## 📞 Need Help?

Check the API response messages for detailed error information. Most issues are related to:
- Missing JWT token
- Incorrect file paths
- Invalid category names
- Missing required fields