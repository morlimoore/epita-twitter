# Database Setup Guide for Twitter Clone Backend

## Prerequisites

1. **PostgreSQL Installation**
   - Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
   - For macOS: You can also use Homebrew: `brew install postgresql@15`
   - For Ubuntu/Debian: `sudo apt install postgresql postgresql-contrib`

2. **Start PostgreSQL Service**
   ```bash
   # macOS (if installed via Homebrew)
   brew services start postgresql@15
   
   # Linux (systemd)
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   
   # Or use pg_ctl directly
   pg_ctl -D /usr/local/var/postgres start
   ```

## Database Setup Steps

### 1. Access PostgreSQL Shell
```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Or on macOS/Windows, if postgres user is not needed:
psql postgres
```

### 2. Create Database and User
```sql
-- Create a new database for the Twitter clone
CREATE DATABASE twitter_clone;

-- Create a new user (optional, you can use existing postgres user)
CREATE USER twitter_user WITH PASSWORD 'your_secure_password';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE twitter_clone TO twitter_user;

-- Connect to the new database
\c twitter_clone;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO twitter_user;

-- Exit PostgreSQL shell
\q
```

### 3. Environment Configuration

Create a `.env` file in the `back-end` directory by copying from `.env.example`:

```bash
cd back-end
cp .env.example .env
```

Update the `.env` file with your database credentials:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres  # or twitter_user if you created a separate user
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=twitter_clone
API_KEY=your_api_key_here
JWT_SECRET=your_very_long_512_bit_secret_key_here_make_it_secure
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run Database Migrations

The backend includes several migration files. Run them in this order:

```bash
# Connect to your database
psql -h localhost -U postgres -d twitter_clone

# Or if using custom user:
psql -h localhost -U twitter_user -d twitter_clone
```

Then run each migration file:

```sql
-- 1. Create polls tables
\i migration-create-polls-tables.sql

-- 2. Create replies table  
\i migration-create-replies-table.sql

-- 3. Create retweets table
\i migration-create-retweets-table.sql

-- 4. Add profile fields
\i migration-add-profile-fields.sql

-- 5. Update tweet type enum
\i migration-update-tweet-type-enum.sql
```

### 5. Install Backend Dependencies

```bash
cd back-end
npm install
```

### 6. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run start:dev

# Or production mode
npm run start:prod
```

The backend server will start on `http://localhost:3000` (or the port specified in your environment).

## API Endpoints

The backend provides these main endpoints:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Users**: `/api/users/profile`, `/api/users/update`
- **Tweets**: `/api/tweets/` (GET, POST, DELETE)
- **Feeds**: `/api/feeds/` (personalized feed)
- **Notifications**: `/api/notifications/`
- **Polls**: `/api/polls/create`, `/api/polls/vote`
- **Replies**: `/api/replies/`
- **Retweets**: `/api/retweets/`
- **Follows**: `/api/follows/`

## Troubleshooting

### Common Issues:

1. **PostgreSQL connection refused**:
   - Make sure PostgreSQL service is running
   - Check if the port 5432 is correct
   - Verify username/password in `.env` file

2. **Migration errors**:
   - Ensure you're connected to the correct database
   - Run migrations in the correct order
   - Check if tables already exist

3. **JWT Secret too short**:
   - Make sure your JWT_SECRET is at least 32 characters long
   - Use a secure random string generator

4. **Cloudinary errors** (for image uploads):
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Get your cloud name, API key, and secret
   - Add them to your `.env` file

## Testing the Setup

1. Start the backend: `npm run start:dev`
2. Test the health endpoint: `curl http://localhost:3000/api`
3. Try registering a user: 
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "testuser",
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## Frontend Integration

Once the backend is running, update your frontend's API service (`front-end/src/services/api.js`) to point to:
```javascript
const BASE_URL = 'http://localhost:3000/api';
```

Your frontend should now be able to communicate with Victor's comprehensive backend featuring feeds, notifications, polls, replies, retweets, and all Twitter functionality!
