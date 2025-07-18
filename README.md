# Epita Twitter - Full Stack Setup Guide

## Prerequisites
Before running the application, make sure you have installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd back-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database:**
   - Install PostgreSQL on your system
   - Create a database named `epita_twitter`
   - Update the `.env` file with your database credentials:
     ```
     DB_NAME=epita_twitter
     DB_USER=your_postgres_username
     DB_PASSWORD=your_postgres_password
     DB_HOST=localhost
     DB_PORT=5432
     ```

4. **Set up environment variables:**
   - The `.env` file is already created with default values
   - For production, change the JWT_SECRET to a secure random string
   - Update database credentials as needed

5. **Run the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on http://localhost:5001

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd front-end
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## PostgreSQL Database Setup Commands

```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE epita_twitter;

-- Create user (optional)
CREATE USER epita_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE epita_twitter TO epita_user;
```

## Testing the Application

1. **Start both servers** (backend on port 5001, frontend on port 3000)

2. **Test Registration:**
   - Click "Sign up" on the splash screen
   - Fill in username, email, and password
   - Submit the form
   - Check browser console and PostgreSQL for user creation

3. **Test Login:**
   - Click "Log in" on the splash screen
   - Use the email and password from registration
   - Submit the form
   - Check browser console for authentication token

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `profilePicture` (Text)
- `bio` (String, max 160 chars)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Project Structure

```
epita-twitter/
├── back-end/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── front-end/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── SplashScreen.js
│   │   └── ...
│   └── package.json
```

## Next Steps

1. **Add main dashboard** after successful login
2. **Implement tweet functionality**
3. **Add user profiles and following system**
4. **Add real-time features with Socket.io**
5. **Deploy to production**

## Troubleshooting

- **CORS errors**: Make sure backend CORS is configured for frontend URL
- **Connection errors**: Check if both servers are running
- **Database errors**: Ensure MongoDB is running and connection string is correct
- **Authentication errors**: Check JWT_SECRET in environment variables
