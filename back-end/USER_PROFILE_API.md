# User Profile API Documentation

This document describes the User Profile API endpoints for the Twitter clone backend.

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get My Profile
**GET** `/api/users/me`

Returns the full profile information of the authenticated user.

**Response:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "displayName": "John Doe",
  "bio": "Software developer and coffee enthusiast",
  "location": "San Francisco, CA",
  "website": "https://johndoe.com",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "profileImageUrl": "/uploads/user-id/profile_1234567890.jpg",
  "coverImageUrl": "/uploads/user-id/cover_1234567890.jpg",
  "dateJoined": "2023-01-01T00:00:00.000Z",
  "followersCount": 150,
  "followingCount": 75
}
```

### 2. Update My Profile
**PUT** `/api/users/me`

Updates the authenticated user's profile information. Supports multipart/form-data for image uploads.

**Request Body (multipart/form-data):**
```json
{
  "displayName": "John Doe",
  "bio": "Software developer and coffee enthusiast",
  "location": "San Francisco, CA",
  "website": "https://johndoe.com",
  "dateOfBirth": "1990-01-01",
  "username": "johndoe"
}
```

**File Uploads:**
- `profileImage`: Profile picture (JPEG, PNG, GIF, WebP, max 5MB)
- `coverImage`: Cover photo (JPEG, PNG, GIF, WebP, max 5MB)

**Response:** Same as GET /api/users/me

### 3. Change Password
**POST** `/api/users/me/change-password`

Changes the authenticated user's password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

### 4. Get Public Profile
**GET** `/api/users/:userId`

Returns the public profile information of any user.

**Response:** Same as GET /api/users/me

### 5. Get Followers Count
**GET** `/api/users/:userId/followersCount`

Returns the number of followers for a specific user.

**Response:**
```json
{
  "followersCount": 150
}
```

### 6. Get Following Count
**GET** `/api/users/:userId/followingCount`

Returns the number of users that a specific user is following.

**Response:**
```json
{
  "followingCount": 75
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User with ID \"uuid\" not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Username already exists",
  "error": "Conflict"
}
```

## Database Schema

The users table includes the following profile fields:

- `displayName` (VARCHAR(50)): User's display name
- `bio` (VARCHAR(160)): User's bio (max 160 characters)
- `location` (VARCHAR(100)): User's location
- `website` (VARCHAR(255)): User's website URL
- `dateOfBirth` (TIMESTAMP): User's date of birth
- `profileImageUrl` (VARCHAR(500)): URL to profile image
- `coverImageUrl` (VARCHAR(500)): URL to cover image
- `dateJoined` (TIMESTAMP): When user joined (auto-generated)
- `followersCount` (INTEGER): Number of followers (default: 0)
- `followingCount` (INTEGER): Number of users following (default: 0)

## File Upload

- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 5MB
- Files are stored in `/uploads/{userId}/` directory
- Old files are automatically deleted when new ones are uploaded
- Files are served statically at `/uploads/{userId}/{filename}`

## Setup Instructions

1. Run the database migration:
   ```sql
   -- Execute the migration-add-profile-fields.sql script
   ```

2. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

3. Ensure the application has write permissions to the uploads directory.

4. Start the application:
   ```bash
   npm run start:dev
   ``` 