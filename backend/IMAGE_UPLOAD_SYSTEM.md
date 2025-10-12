# Image Upload System

## Overview

The backend now includes a comprehensive image upload system that allows admins to upload and manage images organized by category.

## Features

### 📁 **Category-Based Organization**
Images are automatically organized into folders based on predefined categories:
- `packaging-design/`
- `ui-ux/`
- `mobile-app/`
- `graphic-design/`
- `logo-design/`
- `web-design-development/`
- `branding/`

### 🔐 **Admin Authentication Required**
All upload endpoints require admin authentication via JWT token.

### 📊 **File Management**
- **File Types**: JPG, JPEG, PNG, GIF, WEBP
- **File Size Limit**: 10MB per file
- **Multiple Uploads**: Up to 10 files at once
- **Unique Filenames**: Automatically generated to prevent conflicts

## API Endpoints

### Upload Endpoints

#### Upload Single Image
```http
POST /api/admin/upload/:category
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Body: 
- image: [file]
```

**Example:**
```bash
curl -X POST https://api.aenfinite.com/api/admin/upload/ui-ux \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@path/to/image.jpg"
```

#### Upload Multiple Images
```http
POST /api/admin/upload/:category/multiple
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

Body:
- images: [file1, file2, ...]
```

**Example:**
```bash
curl -X POST https://api.aenfinite.com/api/admin/upload/branding/multiple \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "images=@image1.jpg" \
  -F "images=@image2.png"
```

### Retrieval Endpoints

#### Get Images by Category
```http
GET /api/admin/images/:category
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "category": "ui-ux",
  "count": 5,
  "images": [
    {
      "filename": "dashboard-design-1633024800000-123456789.jpg",
      "imageUrl": "/uploads/ui-ux/dashboard-design-1633024800000-123456789.jpg",
      "size": 245760,
      "createdAt": "2023-10-01T10:30:00.000Z"
    }
  ]
}
```

#### Get All Images (All Categories)
```http
GET /api/admin/images
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "totalImages": 25,
  "categories": {
    "ui-ux": [...],
    "branding": [...],
    "mobile-app": [...]
  }
}
```

### Management Endpoints

#### Delete Image
```http
DELETE /api/admin/images/:category/:filename
Authorization: Bearer <admin-token>
```

**Example:**
```bash
curl -X DELETE https://api.aenfinite.com/api/admin/images/ui-ux/dashboard-design-1633024800000-123456789.jpg \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## File Structure

After uploading, your backend will have this structure:
```
backend/
├── uploads/
│   ├── packaging-design/
│   │   ├── luxury-box-1633024800000-123.jpg
│   │   └── coffee-bag-1633024800000-456.png
│   ├── ui-ux/
│   │   ├── dashboard-1633024800000-789.jpg
│   │   └── mobile-ui-1633024800000-012.png
│   ├── mobile-app/
│   ├── graphic-design/
│   ├── logo-design/
│   ├── web-design-development/
│   └── branding/
```

## Image URLs

Uploaded images are accessible via:
```
https://api.aenfinite.com/uploads/{category}/{filename}
```

**Example:**
```
https://api.aenfinite.com/uploads/ui-ux/dashboard-design-1633024800000-123456789.jpg
```

## Frontend Integration

### Upload Image (Frontend API call)
```typescript
// In your frontend API file
export const imageAPI = {
  uploadSingle: async (category: string, imageFile: File) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    
    return fetchWithAuth(`/admin/upload/${category}`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type, let browser set it for multipart/form-data
      headers: {} 
    })
  },

  uploadMultiple: async (category: string, imageFiles: File[]) => {
    const formData = new FormData()
    imageFiles.forEach(file => formData.append('images', file))
    
    return fetchWithAuth(`/admin/upload/${category}/multiple`, {
      method: 'POST', 
      body: formData,
      headers: {}
    })
  },

  getByCategory: async (category: string) => {
    return fetchWithAuth(`/admin/images/${category}`)
  },

  getAll: async () => {
    return fetchWithAuth('/admin/images')
  },

  delete: async (category: string, filename: string) => {
    return fetchWithAuth(`/admin/images/${category}/${filename}`, {
      method: 'DELETE'
    })
  }
}
```

### React Component Example
```tsx
const ImageUpload = ({ category }: { category: string }) => {
  const [uploading, setUploading] = useState(false)
  
  const handleUpload = async (files: FileList) => {
    setUploading(true)
    try {
      const file = files[0]
      const result = await imageAPI.uploadSingle(category, file)
      console.log('Upload successful:', result.imageUrl)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <input 
      type="file" 
      accept="image/*"
      onChange={(e) => e.target.files && handleUpload(e.target.files)}
      disabled={uploading}
    />
  )
}
```

## Installation

1. **Install Dependencies**
```bash
cd backend
npm install
```

The following packages were added:
- `multer`: File upload handling
- `path`: File path utilities

2. **Start Server**
```bash
npm run dev
```

The upload directories will be created automatically when the server starts.

## Security Features

- ✅ **Authentication Required**: All endpoints require admin JWT token
- ✅ **File Type Validation**: Only image files allowed
- ✅ **File Size Limits**: 10MB maximum per file
- ✅ **Unique Filenames**: Prevents filename conflicts
- ✅ **Category Validation**: Only predefined categories accepted
- ✅ **Directory Traversal Protection**: Secure file path handling

## Error Handling

The system handles various error scenarios:
- Invalid file types
- File size exceeded
- Invalid categories
- Missing authentication
- File system errors
- Network errors

All errors return appropriate HTTP status codes with descriptive messages.

## Usage in Projects

When creating/editing projects, you can now:
1. Upload images to the appropriate category
2. Use the returned image URLs in your project data
3. Reference images like: `/uploads/ui-ux/my-design.jpg`

This creates a complete image management system for your portfolio!