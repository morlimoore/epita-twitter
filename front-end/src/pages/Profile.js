import React, { useState } from 'react';
import '../styles/Profile.css';
import LogoutScreen from './LogoutScreen';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: ''
  });
  
  // Mock user data - in real app this would come from API/props
  const userProfile = {
    username: 'Sita Sharma',
    handle: '@sitasharma_np',
    bio: 'Proud Nepali 🇳🇵 | Love for mountains and momo | Digital Nepal advocate | Kathmandu ❤️ #NepalFirst',
    joinDate: 'March 2022',
    following: 287,
    followers: 456,
    postsCount: 89,
    profileImage: '/api/placeholder/120/120',
    coverImage: '/api/placeholder/600/200',
    verified: true,
    location: 'Kathmandu, Nepal',
    website: 'visitnepal.com',
    email: 'sita.sharma@gmail.com',
    phone: '+977-9841234567',
    dateOfBirth: '1995-04-15'
  };

  // Mock followers data
  const followersData = [
    {
      id: 1,
      name: 'Ramesh Thapa',
      handle: '@ramesh_thapa',
      bio: 'Software Engineer from Pokhara | Tech enthusiast',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 2,
      name: 'Priya Gurung',
      handle: '@priya_gurung',
      bio: 'Mountain lover | Trekking guide | Born in Solukhumbu',
      profileImage: '/api/placeholder/50/50',
      isFollowing: false
    },
    {
      id: 3,
      name: 'Bikash Shrestha',
      handle: '@bikash_stha',
      bio: 'Entrepreneur | Startup Nepal | Chitwan based',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 4,
      name: 'Sunita Rai',
      handle: '@sunita_rai',
      bio: 'Teacher from Dharan | Education for all',
      profileImage: '/api/placeholder/50/50',
      isFollowing: false
    },
    {
      id: 5,
      name: 'Krishna Paudel',
      handle: '@krishna_paudel',
      bio: 'Digital Marketing | Helping local businesses grow',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    }
  ];

  // Mock following data
  const followingData = [
    {
      id: 6,
      name: 'Nepal Tourism',
      handle: '@visitnepal2020',
      bio: 'Official Nepal Tourism Board | Visit Nepal 2023',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 7,
      name: 'Ani Choying Dolma',
      handle: '@ani_choying',
      bio: 'Buddhist nun | Singer | Social worker',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 8,
      name: 'Kathmandu Post',
      handle: '@kathmandupost',
      bio: 'Leading English daily newspaper of Nepal',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 9,
      name: 'Paras Khadka',
      handle: '@paras_khadka',
      bio: 'Former Captain | Nepal Cricket Team',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    },
    {
      id: 10,
      name: 'Yomari Kitchen',
      handle: '@yomari_kitchen',
      bio: 'Authentic Nepali recipes | Traditional food culture',
      profileImage: '/api/placeholder/50/50',
      isFollowing: true
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFollowToggle = (userId, isCurrentlyFollowing) => {
    // In a real app, this would make an API call
    console.log(`${isCurrentlyFollowing ? 'Unfollowing' : 'Following'} user ${userId}`);
    // Update the local state or refetch data
  };

  const renderFollowModal = (title, users) => {
    return (
      <div className="modal-overlay" onClick={() => {
        setShowFollowersModal(false);
        setShowFollowingModal(false);
      }}>
        <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-header-left">
              <button className="modal-close-btn" onClick={() => {
                setShowFollowersModal(false);
                setShowFollowingModal(false);
              }}>✕</button>
              <h2>{title}</h2>
            </div>
          </div>
          
          <div className="follow-list">
            {users.map(user => (
              <div key={user.id} className="follow-item">
                <div className="follow-item-left">
                  <img src={user.profileImage} alt={user.name} className="follow-avatar" />
                  <div className="follow-info">
                    <div className="follow-name">{user.name}</div>
                    <div className="follow-handle">{user.handle}</div>
                    <div className="follow-bio">{user.bio}</div>
                  </div>
                </div>
                <button 
                  className={`follow-btn ${user.isFollowing ? 'following' : 'follow'}`}
                  onClick={() => handleFollowToggle(user.id, user.isFollowing)}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleSaveProfile = () => {
    // Here you would normally send the data to your backend API
    console.log('Saving profile data:', formData);
    setShowEditModal(false);
    // Show success message or handle API response
  };

  const renderEditModalContent = () => {
    return (
      <div className="modal-form">
        <div className="modal-form-group">
          <label>Name</label>
          <input 
            type="text" 
            defaultValue={userProfile.username}
            onChange={(e) => handleInputChange('name', e.target.value)}
            maxLength="50"
          />
          <span className="char-count">{formData.name.length} / 50</span>
        </div>
        
        <div className="modal-form-group">
          <label>Bio</label>
          <textarea 
            defaultValue={userProfile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            maxLength="160"
            rows="3"
          />
          <span className="char-count">{formData.bio.length} / 160</span>
        </div>
        
        <div className="modal-form-group">
          <label>Location</label>
          <input 
            type="text" 
            defaultValue={userProfile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            maxLength="30"
          />
          <span className="char-count">{formData.location.length} / 30</span>
        </div>
      </div>
    );
  };

  const posts = [
    {
      id: 1,
      content: "Just had the most amazing dal bhat at a local restaurant in Thamel! Nothing beats authentic Nepali food 🍛 The mountains make everything taste better! #NepalFood #DalBhat #Kathmandu",
      timestamp: "Nov 7, 2024",
      likes: 23,
      retweets: 8,
      replies: 5,
      hasImage: true,
      imageUrl: '/api/placeholder/500/300'
    },
    {
      id: 2,
      content: "Sunrise view from Sarangkot this morning was absolutely breathtaking! 🏔️ Machapuchare peak looked like it was painted by gods. Nepal's natural beauty never fails to amaze me. #Pokhara #Nepal #Mountains",
      timestamp: "Nov 6, 2024",
      likes: 67,
      retweets: 24,
      replies: 12,
      hasImage: false
    },
    {
      id: 3,
      content: "Proud to see young Nepali entrepreneurs building amazing tech startups! 🇳🇵 Our country has so much talent. Let's support local innovation and make Digital Nepal a reality! #DigitalNepal #Startup",
      timestamp: "Nov 5, 2024",
      likes: 45,
      retweets: 18,
      replies: 9,
      hasImage: false
    },
    {
      id: 4,
      content: "Festival season is here! Preparing for Tihar celebrations 🪔 Time to make sel roti and decorate the house. Looking forward to celebrating with family and friends! #Tihar #NepalFestival",
      timestamp: "Nov 4, 2024",
      likes: 34,
      retweets: 15,
      replies: 7,
      hasImage: false
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'posts':
        return (
          <div className="posts-container">
            {posts.map(post => (
              <div key={post.id} className="tweet">
                <div className="tweet-avatar">
                  <div className="avatar-placeholder">
                    {userProfile.username.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="tweet-content">
                  <div className="tweet-header">
                    <span className="tweet-author">{userProfile.username}</span>
                    {userProfile.verified && (
                      <svg className="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                      </svg>
                    )}
                    <span className="tweet-handle">{userProfile.handle}</span>
                    <span className="tweet-time">{post.timestamp}</span>
                  </div>
                  <div className="tweet-text">
                    {post.content}
                  </div>
                  {post.hasImage && (
                    <div className="tweet-media">
                      <div className="media-placeholder">
                        <div className="media-content">
                          <img src={post.imageUrl} alt="Post content" style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px'}} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="tweet-actions">
                    <button className="action-btn" title="Reply">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-2.26 1.23c-.51.28-1.1.28-1.61 0l-2.26-1.23C4.307 15.68 2.751 12.96 2.751 10z"/>
                      </svg>
                      <span>{post.replies}</span>
                    </button>
                    <button className="action-btn" title="Repost">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                        <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 6.55V16c0 1.1.9 2 2 2h13v-2H7.5V6.55l-2.068 1.93-1.364-1.46L4.5 3.88z"/>
                      </svg>
                      <span>{post.retweets}</span>
                    </button>
                    <button className="action-btn" title="Like">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                        <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C10.084 6.01 8.627 5.41 7.405 5.5c-1.243.06-2.356.52-3.149 1.38S3 8.22 3 9.5c0 1.28.62 2.36 1.38 3.19s1.95 1.38 3.193 1.38c1.243 0 2.356-.52 3.149-1.38l.805-1.09.806 1.09c.793.86 1.906 1.38 3.149 1.38s2.356-.52 3.149-1.38S20 10.78 20 9.5s-.62-2.36-1.38-3.19S16.94 5.44 15.697 5.5z"/>
                      </svg>
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-btn" title="View">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                        <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
                      </svg>
                      <span>{post.views}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'replies':
        return <div className="tab-content">No replies yet</div>;
      case 'likes':
        return <div className="tab-content">No likes yet</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-controls">
          <button className="back-btn">←</button>
          <div className="header-info">
            <h1>{userProfile.username}</h1>
            <p>{userProfile.postsCount} posts</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="cover-image">
        <img src={userProfile.coverImage} alt="Cover" />
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-avatar-container">
          <img src={userProfile.profileImage} alt="Profile" className="profile-avatar" />
        </div>
        
        <div className="profile-details">
          <div className="profile-name-section">
            <div className="profile-name">
              <h2>{userProfile.username}</h2>
            </div>
            <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>Edit profile</button>
          </div>
          <p className="profile-handle">{userProfile.handle}</p>
          
          <div className="profile-bio">
            <p>{userProfile.bio}</p>
          </div>
          
          <div className="profile-meta">
            <span className="join-date">📅 Joined {userProfile.joinDate}</span>
          </div>
          
          <div className="profile-stats">
            <span className="stat clickable" onClick={() => setShowFollowingModal(true)}>
              <strong>{userProfile.following}</strong> Following
            </span>
            <span className="stat clickable" onClick={() => setShowFollowersModal(true)}>
              <strong>{userProfile.followers}</strong> Followers
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button 
          className={`tab ${activeTab === 'replies' ? 'active' : ''}`}
          onClick={() => setActiveTab('replies')}
        >
          Replies
        </button>
        <button 
          className={`tab ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <button className="modal-close-btn" onClick={() => setShowEditModal(false)}>✕</button>
                <h2>Edit Profile</h2>
              </div>
              <button className="modal-save-btn" onClick={handleSaveProfile}>Save</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-cover-section">
                <div className="modal-cover-image">
                  <img src={userProfile.coverImage} alt="Cover" />
                  <div className="cover-overlay">
                    <button className="cover-edit-btn">📷</button>
                    <button className="cover-remove-btn">✕</button>
                  </div>
                </div>
                <div className="modal-avatar-section">
                  <img src={userProfile.profileImage} alt="Profile" className="modal-avatar" />
                  <button className="avatar-edit-btn">📷</button>
                </div>
              </div>
              
              {renderEditModalContent()}
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutScreen
          onCancel={() => setShowLogoutModal(false)}
          onConfirmLogout={() => {
            setShowLogoutModal(false);
            // Here you would redirect to login page or handle logout
            console.log('User logged out successfully');
          }}
        />
      )}

      {/* Followers Modal */}
      {showFollowersModal && renderFollowModal('Followers', followersData)}

      {/* Following Modal */}
      {showFollowingModal && renderFollowModal('Following', followingData)}
    </div>
  );
};

export default Profile;
