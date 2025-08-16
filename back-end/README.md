# Twitter Clone Backend

A complete Twitter clone backend built with NestJS, TypeORM, PostgreSQL, and Cloudinary.

## 🚀 Recent Updates

### **Cloudinary Integration (Image Storage)**
- ✅ Replaced local file storage with Cloudinary cloud storage
- ✅ Automatic image optimization and format conversion
- ✅ Secure HTTPS URLs for all media
- ✅ Organized storage structure by user ID

### **Tweets Functionality**
- ✅ Complete CRUD operations for tweets
- ✅ Media upload support (images & videos)
- ✅ JWT authentication and authorization
- ✅ Pagination and efficient data handling
- ✅ Proper error handling and validation

## 🏗️ Architecture

```
src/
├── auth/           # Authentication & JWT
├── users/          # User management & profiles
├── tweets/         # Tweet functionality
├── common/         # Shared utilities
└── main.ts         # Application entry point
```

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **File Storage**: Cloudinary
- **Validation**: class-validator
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Cloudinary account

## ⚙️ Environment Setup

Create a `.env` file in the `back-end` directory:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your environment variables** (see above)

3. **Start the development server:**
   ```bash
   npm run start:dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🔐 Authentication Endpoints

### Register User
```
POST /auth/register
Body: { email, password, username, displayName }
```

### Login User
```
POST /auth/login
Body: { email, password }
```

## 👤 User Profile Endpoints

### Update Profile with Images
```
PUT /api/users/me/upload
Headers: Authorization: Bearer {JWT_TOKEN}
Body: FormData (profileImage, coverImage, displayName, bio, etc.)
```

### Get Profile
```
GET /api/users/me
Headers: Authorization: Bearer {JWT_TOKEN}
```

## 🐦 Tweet Endpoints

### Create Tweet
```
POST /api/tweets
Headers: Authorization: Bearer {JWT_TOKEN}
Body: FormData (content, media)
```

### Get User's Tweets
```
GET /api/tweets/user/{userId}
Query: page, limit (optional)
```

### Get Single Tweet
```
GET /api/tweets/{tweetId}
```

### Update Tweet
```
PUT /api/tweets/{tweetId}
Headers: Authorization: Bearer {JWT_TOKEN}
Body: { content }
```

### Delete Tweet
```
DELETE /api/tweets/{tweetId}
Headers: Authorization: Bearer {JWT_TOKEN}
```

### Get All Tweets
```
GET /api/tweets
```

### Get My Tweets
```
GET /api/tweets/me
Headers: Authorization: Bearer {JWT_TOKEN}
Query: page, limit (optional)
```

## 📁 File Upload Features

### Supported Media Types
- **Images**: JPEG, PNG, GIF, WebP
- **Videos**: MP4, AVI, MOV, WMV
- **Max Size**: 10MB

### Cloudinary Storage Structure
```
twitter-clone/
├── {userId}/
│   ├── profile_{timestamp}.jpg
│   ├── cover_{timestamp}.jpg
│   └── tweets/
│       └── {tweetId}/
│           └── media_{timestamp}.jpg
```

## 🔒 Security Features

- JWT-based authentication
- User ownership validation for tweets
- Input sanitization and validation
- Secure file upload validation
- Automatic media cleanup on deletion

## 📊 Database Schema

### Users Table
- id (UUID, Primary Key)
- email, username, password
- displayName, bio, location, website
- profileImageUrl, coverImageUrl
- dateJoined, followersCount, followingCount

### Tweets Table
- id (UUID, Primary Key)
- content (text, max 280 chars)
- mediaUrl, mediaType
- type (text/media)
- userId (Foreign Key to Users)
- createdAt, likesCount, retweetsCount, repliesCount

## 🧪 Testing

### Run Tests
```bash
npm run test
npm run test:e2e
```

### Build Check
```bash
npm run build
```

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm run start:prod
   ```

## 📝 API Response Format

All API responses follow this structure:
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "total": number (for list responses)
}
```

## 🔧 Development

### Code Structure
- **Controllers**: Handle HTTP requests
- **Services**: Business logic
- **Entities**: Database models
- **DTOs**: Data validation
- **Mappers**: Entity transformations

### Adding New Features
1. Create entity in appropriate module
2. Add DTOs for validation
3. Implement service methods
4. Create controller endpoints
5. Update module configuration

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify environment variables
   - Check database credentials

2. **Cloudinary Upload Fails**
   - Verify Cloudinary credentials
   - Check file size and type
   - Ensure internet connection

3. **JWT Authentication Fails**
   - Check JWT_SECRET is set
   - Verify token format
   - Check token expiration

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## 📄 License

This project is for educational purposes.

---

**Last Updated**: August 2024
**Version**: 1.0.0
