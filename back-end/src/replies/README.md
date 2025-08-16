# Replies Module

This module handles replies to tweets in the Twitter clone application.

## Features

- Create replies to existing tweets
- Retrieve all replies for a specific tweet
- Automatic tweet reply count updates
- Input validation (280 character limit)
- User authentication required for all operations

## Database Schema

The `replies` table has the following structure:

```sql
replies (
    reply_id UUID PRIMARY KEY,
    tweet_id UUID NOT NULL,
    user_id UUID NOT NULL,
    reply_text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE
)
```

## API Endpoints

### POST /replies
Creates a new reply to a tweet.

**Request Body:**
```json
{
    "reply_text": "This is my reply to the tweet",
    "tweet_id": "uuid-of-tweet"
}
```

**Response:**
```json
{
    "reply_id": "uuid-of-created-reply",
    "timestamp": "2024-01-01T12:00:00Z"
}
```

**Requirements:**
- User must be authenticated (JWT token required)
- Tweet must exist
- Reply text cannot exceed 280 characters

### GET /replies/tweets/:tweetId/replies
Retrieves all replies for a specific tweet, ordered by newest first.

**Response:**
```json
[
    {
        "reply_id": "uuid-of-reply",
        "tweet_id": "uuid-of-tweet",
        "user_id": "uuid-of-user",
        "reply_text": "This is a reply",
        "timestamp": "2024-01-01T12:00:00Z",
        "user": {
            "username": "john_doe",
            "profileImageUrl": "https://example.com/profile.jpg"
        }
    }
]
```

## Dependencies

- **TweetsModule**: For tweet validation and reply count updates
- **UsersModule**: For user validation
- **AuthModule**: For JWT authentication

## Security

- All endpoints require JWT authentication
- Input validation prevents XSS and injection attacks
- Foreign key constraints ensure data integrity
- Cascade deletion removes replies when tweets or users are deleted

## Performance

- Indexes on `tweet_id`, `user_id`, and `timestamp` for fast queries
- Composite index on `(tweet_id, timestamp)` for efficient reply retrieval
- Optimized queries using TypeORM query builder 