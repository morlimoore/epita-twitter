# Epita Twitter - Full Stack Application

A Twitter-like application built with React frontend and NestJS backend.

## Project Structure

```
epita-twitter/
├── back-end/          # NestJS API server
├── front-end/         # React application
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Backend Setup

### 1. Install Dependencies

```bash
cd back-end
npm install
```

### 2. Database Setup

The application now uses SQLite, which requires no additional setup. The database file (`epita-twitter.db`) will be created automatically when you start the application.

Create a `.env` file in the `back-end` directory with your configuration:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=3001
```

### 3. Start the Backend Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The backend will be available at `http://localhost:3001`

## Frontend Setup

### 1. Install Dependencies

```bash
cd front-end
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `front-end` directory:

```env
REACT_APP_API_URL=http://localhost:3001
```

### 3. Start the Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users/:id` - Get user profile (requires authentication)
- `PUT /users/:id` - Update user profile (requires authentication)
- `DELETE /users/:id` - Delete user (requires authentication)

## Features

### Backend Features
- ✅ User authentication with JWT
- ✅ User registration and login
- ✅ User profile management
- ✅ SQLite database integration
- ✅ Input validation
- ✅ Error handling

### Frontend Features
- ✅ User authentication (login/signup)
- ✅ Dashboard with Twitter-like interface
- ✅ Responsive design
- ✅ Token-based authentication
- ✅ Error handling and loading states

## Development

### Running Both Servers

1. Start the backend server:
```bash
cd back-end
npm run start:dev
```

2. In a new terminal, start the frontend server:
```bash
cd front-end
npm start
```

### Database Migrations

The application uses TypeORM with `synchronize: true`, which automatically creates and updates database tables based on your entities.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - SQLite database file (`epita-twitter.db`) will be created automatically
   - Ensure the application has write permissions in the back-end directory
   - Check that `JWT_SECRET` is set in the `.env` file

2. **CORS Issues**
   - The backend is configured to accept requests from `http://localhost:3000`
   - If you change the frontend port, update the CORS configuration in the backend

3. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in the backend `.env` file
   - Clear browser localStorage if experiencing authentication issues

### Port Conflicts

- Backend runs on port 3001 by default
- Frontend runs on port 3000 by default
- If these ports are in use, update the respective `.env` files

## Next Steps

To extend the application, consider adding:

1. **Tweet functionality**
   - Create, read, update, delete tweets
   - Like and retweet functionality

2. **User relationships**
   - Follow/unfollow users
   - User search

3. **Real-time features**
   - WebSocket integration for live updates
   - Notifications

4. **Media upload**
   - Image upload for profile pictures
   - Media attachments for tweets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. 