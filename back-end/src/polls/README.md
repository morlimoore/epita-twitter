# Polls Module

This module handles polls in the Twitter clone application, allowing users to create polls on tweets and vote on them.

## Features

- **Create Polls**: Users can create polls with 2-4 options on any tweet
- **Vote on Polls**: Users can vote once per poll (prevents duplicate voting)
- **Poll Expiration**: Optional expiration dates for polls
- **Real-time Results**: Live vote counts and percentages
- **Voter Privacy**: Option to see who voted for each option
- **Tweet Integration**: One poll per tweet (prevents spam)

## Database Schema

### polls table
```sql
polls (
    id UUID PRIMARY KEY,
    tweet_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
)
```

### poll_options table
```sql
poll_options (
    id UUID PRIMARY KEY,
    poll_id UUID NOT NULL,
    option_text TEXT NOT NULL
)
```

### poll_votes table
```sql
poll_votes (
    id UUID PRIMARY KEY,
    poll_id UUID NOT NULL,
    option_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE
)
```

**Key Features:**
- Unique constraint on `tweet_id` ensures one poll per tweet
- Unique constraint on `(poll_id, user_id)` prevents duplicate voting
- Cascade deletion removes all related data when tweets/users are deleted

## API Endpoints

### POST /polls
Creates a new poll on a tweet.

**Request Body:**
```json
{
    "tweet_id": "uuid-of-tweet",
    "options": ["Option 1", "Option 2", "Option 3"],
    "expires_at": "2024-12-31T23:59:59Z"
}
```

**Response:**
```json
{
    "id": "uuid-of-poll",
    "tweet_id": "uuid-of-tweet",
    "user_id": "uuid-of-creator",
    "created_at": "2024-01-01T12:00:00Z",
    "expires_at": "2024-12-31T23:59:59Z",
    "options": [
        {
            "id": "uuid-of-option",
            "option_text": "Option 1",
            "vote_count": 0,
            "percentage": 0
        }
    ],
    "total_votes": 0,
    "is_expired": false,
    "user_voted": false
}
```

**Business Rules:**
- Tweet must exist
- User must be authenticated
- Only one poll per tweet allowed
- 2-4 options required
- Option text limited to 100 characters
- Expiration date is optional

### POST /polls/:pollId/vote
Votes on a specific poll option.

**Request Body:**
```json
{
    "option_id": "uuid-of-option"
}
```

**Response:**
```json
{
    "message": "Vote recorded successfully"
}
```

**Business Rules:**
- Poll must exist and not be expired
- Option must belong to the specified poll
- User can only vote once per poll
- Vote cannot be changed once submitted

### GET /polls/:pollId
Gets poll details and results for the authenticated user.

**Response:**
```json
{
    "id": "uuid-of-poll",
    "tweet_id": "uuid-of-tweet",
    "user_id": "uuid-of-creator",
    "created_at": "2024-01-01T12:00:00Z",
    "expires_at": "2024-12-31T23:59:59Z",
    "options": [
        {
            "id": "uuid-of-option",
            "option_text": "Option 1",
            "vote_count": 15,
            "percentage": 60
        }
    ],
    "total_votes": 25,
    "is_expired": false,
    "user_voted": true,
    "user_vote_option_id": "uuid-of-user-vote"
}
```

### GET /polls/:pollId/voters
Gets detailed poll results including voter information.

**Response:**
```json
{
    "id": "uuid-of-poll",
    "tweet_id": "uuid-of-tweet",
    "user_id": "uuid-of-creator",
    "created_at": "2024-01-01T12:00:00Z",
    "expires_at": "2024-12-31T23:59:59Z",
    "options": [
        {
            "id": "uuid-of-option",
            "option_text": "Option 1",
            "vote_count": 15,
            "percentage": 60,
            "voters": [
                {
                    "user_id": "uuid-of-voter",
                    "username": "john_doe",
                    "profileImageUrl": "https://example.com/profile.jpg"
                }
            ]
        }
    ],
    "total_votes": 25,
    "is_expired": false
}
```

### GET /polls/tweet/:tweetId
Gets all polls for a specific tweet.

**Response:**
```json
[
    {
        "id": "uuid-of-poll",
        "tweet_id": "uuid-of-tweet",
        "user_id": "uuid-of-creator",
        "created_at": "2024-01-01T12:00:00Z",
        "expires_at": "2024-12-31T23:59:59Z",
        "options": [...],
        "total_votes": 25,
        "is_expired": false,
        "user_voted": true,
        "user_vote_option_id": "uuid-of-user-vote"
    }
]
```

## Business Logic

### Poll Creation
- One poll per tweet (prevents spam)
- 2-4 options required (realistic voting scenarios)
- Optional expiration dates
- Automatic validation of tweet and user existence

### Voting System
- One vote per user per poll
- Vote cannot be changed once submitted
- Expired polls cannot be voted on
- Real-time vote counting and percentage calculation

### Data Integrity
- Foreign key constraints ensure referential integrity
- Unique constraints prevent duplicate data
- Cascade deletion maintains data consistency

## Dependencies

- **TweetsModule**: For tweet validation
- **UsersModule**: For user validation
- **AuthModule**: For JWT authentication

## Security

- All endpoints require JWT authentication
- Users can only vote once per poll
- Input validation prevents XSS and injection attacks
- Foreign key constraints ensure data integrity

## Performance

- Indexes on all foreign keys for fast queries
- Composite indexes for efficient vote counting
- Optimized queries using TypeORM relations
- Real-time calculations for vote percentages

## Error Handling

- **404**: Poll not found, tweet not found
- **400**: Bad request (e.g., expired poll, invalid option)
- **409**: Conflict (duplicate poll, duplicate vote)
- **401**: Unauthorized (missing/invalid JWT)

## Real-world Twitter Features Implemented

✅ **Poll Creation** - Users can create polls with multiple options  
✅ **Voting System** - One vote per user per poll  
✅ **Expiration Dates** - Optional poll time limits  
✅ **Real-time Results** - Live vote counts and percentages  
✅ **Voter Privacy** - Option to see who voted  
✅ **Spam Prevention** - One poll per tweet  
✅ **Data Integrity** - Foreign key constraints and validation  
✅ **Performance** - Optimized queries and indexing 