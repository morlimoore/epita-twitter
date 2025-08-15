# Twitter Clone API Endpoints Reference

## 🔐 **Authentication**
```
POST /auth/register     - User registration
POST /auth/login        - User login
```

## 👥 **Users**
```
GET    /api/users/me                                    - Get current user profile
PUT    /api/users/me                                    - Update profile (text only)
PUT    /api/users/me/upload                             - Update profile with images
POST   /api/users/me/change-password                    - Change password
GET    /api/users/profile/:userId                       - Get public profile
GET    /api/users/profile/:userId/followersCount        - Get follower count
GET    /api/users/profile/:userId/followingCount        - Get following count
GET    /api/users/:id                                   - Get user by ID
PUT    /api/users/:id                                   - Update user
DELETE /api/users/:id                                   - Delete user
```

## 🐦 **Tweets**
```
POST   /api/tweets                                      - Create tweet (text, media, or both)
GET    /api/tweets                                      - Get all tweets
GET    /api/tweets/me                                   - Get current user's tweets
GET    /api/tweets/user/:userId                         - Get user's tweets
GET    /api/tweets/:tweetId                             - Get single tweet
PUT    /api/tweets/:tweetId                             - Update tweet
DELETE /api/tweets/:tweetId                             - Delete tweet
```

## 💬 **Replies**
```
POST   /replies                                         - Create reply
GET    /replies/tweets/:tweetId/replies                 - Get replies for tweet
```

## 🔄 **Retweets**
```
POST   /retweets                                        - Create retweet
GET    /retweets/tweets/:tweetId                        - Get retweets for tweet
GET    /retweets/count/:tweetId                         - Get retweet count
DELETE /retweets/:retweetId                             - Delete retweet
GET    /retweets/user/:userId                           - Get user's retweets
```

## 📊 **Polls**
```
POST   /polls                                           - Create poll
POST   /polls/:pollId/vote                              - Vote on poll
GET    /polls/:pollId                                   - Get poll
GET    /polls/:pollId/voters                            - Get poll with voters
GET    /polls/tweet/:tweetId                            - Get polls by tweet
```

---

## 🔒 **Authentication Required Endpoints**

All endpoints except the following require JWT authentication:
- `POST /auth/register`
- `POST /auth/login`
- `GET /api/users/profile/:userId`
- `GET /api/users/profile/:userId/followersCount`
- `GET /api/users/profile/:userId/followingCount`
- `GET /api/tweets`
- `GET /api/tweets/user/:userId`
- `GET /api/tweets/:tweetId`
- `GET /replies/tweets/:tweetId/replies`
- `GET /retweets/tweets/:tweetId`
- `GET /retweets/count/:tweetId`
- `GET /retweets/user/:userId`
- `GET /polls/:pollId`
- `GET /polls/:pollId/voters`
- `GET /polls/tweet/:tweetId`

---

## 📝 **Request Headers**

### **For Authenticated Requests:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### **For File Uploads:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

---

## 📊 **Response Format**

All API responses follow this standard format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "total": 0
}
```

---

## 🚀 **Quick Start for Frontend**

1. **Register/Login** → Get JWT token
2. **Store token** in localStorage/sessionStorage
3. **Include token** in Authorization header for all protected requests
4. **Handle file uploads** using FormData for media endpoints
5. **Use pagination** for list endpoints (page & limit query params)

---

## ⚠️ **Important Notes**

- **File size limit**: 10MB for media uploads
- **Supported formats**: jpg, jpeg, png, gif, webp, mp4, avi, mov, wmv
- **JWT expiration**: 1 hour (implement refresh token logic)
- **Pagination**: Default page=1, limit=20 for list endpoints
- **Error handling**: All errors return consistent format with status codes 