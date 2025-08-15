# Retweets Module

This module handles retweets in the Twitter clone application, including both simple retweets and quote retweets (retweets with comments).

## Features

- **Simple Retweets**: Users can retweet tweets without adding comments
- **Quote Retweets**: Users can retweet with additional comments (up to 280 characters)
- **Duplicate Prevention**: Users can only retweet the same tweet once (unless adding a comment)
- **Automatic Count Updates**: Tweet retweet counts are automatically maintained
- **User Authentication**: All operations require JWT authentication
- **Cascade Deletion**: Retweets are automatically removed when tweets or users are deleted

## Database Schema

The `retweets` table has the following structure:

```sql
retweets (
    id UUID PRIMARY KEY,
    tweet_id UUID NOT NULL,
    user_id UUID NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE
)
```

**Key Features:**
- Unique constraint on `(tweet_id, user_id)` prevents duplicate simple retweets
- Foreign key constraints with CASCADE deletion
- Optimized indexes for fast queries

## API Endpoints

### POST /retweets
Creates a new retweet (simple or quote retweet).

**Request Body:**
```json
{
    "tweet_id": "uuid-of-tweet",
    "comment": "Optional comment for quote retweet"
}
```

**Response:**
```json
{
    "id": "uuid-of-retweet",
    "tweet_id": "uuid-of-tweet",
    "user_id": "uuid-of-user",
    "comment": "Optional comment or null",
    "created_at": "2024-01-01T12:00:00Z"
}
```

**Business Rules:**
- Tweet must exist
- User must be authenticated
- Users can only retweet the same tweet once (unless adding a comment)
- Comment is optional but limited to 280 characters

### GET /retweets/tweets/:tweetId
Retrieves all retweets for a specific tweet, ordered by newest first.

**Response:**
```json
[
    {
        "id": "uuid-of-retweet",
        "tweet_id": "uuid-of-tweet",
        "user_id": "uuid-of-user",
        "comment": "Optional comment or null",
        "created_at": "2024-01-01T12:00:00Z",
        "user": {
            "username": "john_doe",
            "profileImageUrl": "https://example.com/profile.jpg"
        }
    }
]
```

### GET /retweets/count/:tweetId
Gets the total retweet count for a specific tweet.

**Response:**
```json
{
    "tweet_id": "uuid-of-tweet",
    "retweet_count": 42
}
```

### DELETE /retweets/:retweetId
Deletes a retweet (only by the user who created it).

**Response:**
```json
{
    "message": "Retweet deleted successfully"
}
```

**Business Rules:**
- Only the retweet owner can delete it
- Tweet retweet count is automatically decremented

### GET /retweets/user/:userId
Gets all retweets by a specific user.

**Response:**
```json
[
    {
        "id": "uuid-of-retweet",
        "tweet_id": "uuid-of-tweet",
        "user_id": "uuid-of-user",
        "comment": "Optional comment or null",
        "created_at": "2024-01-01T12:00:00Z",
        "user": {
            "username": "john_doe",
            "profileImageUrl": "https://example.com/profile.jpg"
        }
    }
]
```

## Business Logic

### Retweet Types
1. **Simple Retweet**: No comment, user can only do this once per tweet
2. **Quote Retweet**: With comment, user can do this multiple times per tweet

### Duplicate Prevention
- Simple retweets are prevented by unique constraint on `(tweet_id, user_id)`
- Quote retweets allow multiple retweets from the same user (different comments)

### Count Management
- Tweet `retweetsCount` is automatically incremented/decremented
- Counts are maintained in real-time

## Dependencies

- **TweetsModule**: For tweet validation and retweet count updates
- **UsersModule**: For user validation
- **AuthModule**: For JWT authentication

## Security

- All endpoints require JWT authentication
- Users can only delete their own retweets
- Input validation prevents XSS and injection attacks
- Foreign key constraints ensure data integrity

## Performance

- Indexes on `tweet_id`, `user_id`, and `created_at` for fast queries
- Composite indexes for efficient retweet retrieval and user retweet queries
- Optimized queries using TypeORM query builder

## Error Handling

- **404**: Tweet not found, retweet not found
- **400**: Bad request (e.g., unauthorized deletion)
- **409**: Conflict (duplicate retweet attempt)
- **401**: Unauthorized (missing/invalid JWT)

## Real-world Twitter Features Implemented

✅ **Simple Retweets** - Users can retweet without comment  
✅ **Quote Retweets** - Users can retweet with additional commentary  
✅ **Duplicate Prevention** - Smart logic prevents spam retweets  
✅ **Count Management** - Real-time retweet counts  
✅ **User Privacy** - Users can only delete their own retweets  
✅ **Performance** - Optimized queries and indexing  
✅ **Authentication** - JWT-based security  
✅ **Data Integrity** - Foreign key constraints and validation 