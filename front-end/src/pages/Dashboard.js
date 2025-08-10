import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import apiService from '../services/api';

// Page Components
const HomePage = ({ user }) => {
  const [postContent, setPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('for-you');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (postContent.trim() || selectedImage) {
      // TODO: Implement post creation API call
      console.log('Creating post:', { 
        content: postContent, 
        image: selectedImage,
        location: selectedLocation 
      });
      setPostContent('');
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedLocation(null);
    }
  };

  const handleEmojiClick = (emoji) => {
    setPostContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ latitude, longitude });
          setShowLocationPicker(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const isPostButtonDisabled = !postContent.trim() && !selectedImage;

  // Basic emoji list for demo
  const commonEmojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🤔', '😢', '😡'];

  return (
    <div className="home-page">
      {/* Navigation Tabs */}
      <div className="home-navigation">
        <button 
          className={`nav-tab ${activeTab === 'for-you' ? 'active' : ''}`}
          onClick={() => setActiveTab('for-you')}
        >
          For you
        </button>
        <button 
          className={`nav-tab ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
      </div>

      {/* Post Composer */}
      <div className="post-composer">
        <div className="composer-header">
          <div className="user-avatar">
            <div className="avatar-placeholder">
              {user?.username?.substring(0, 2).toUpperCase() || 'My'}
            </div>
          </div>
          <div className="composer-content">
            <textarea
              className="post-input"
              placeholder="What's happening?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="3"
            />
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button 
                  className="remove-image"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Location Display */}
            {selectedLocation && (
              <div className="location-display">
                📍 Location added
                <button 
                  className="remove-location"
                  onClick={() => setSelectedLocation(null)}
                >
                  ×
                </button>
              </div>
            )}

            {/* Post Actions */}
            <div className="post-actions">
              <div className="action-buttons">
                                  <label className="action-button" title="Image">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1d9bf0">
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3-3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/>
                    </svg>
                  </label>
                  
                  <button 
                    className="action-button" 
                    title="Emoji"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1d9bf0">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </button>
                  
                  <button 
                    className="action-button" 
                    title="Location"
                    onClick={handleLocationClick}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1d9bf0">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </button>
              </div>
              
              <button 
                className={`post-button ${isPostButtonDisabled ? 'disabled' : ''}`}
                onClick={handlePost}
                disabled={isPostButtonDisabled}
              >
                Post
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="emoji-picker">
                <div className="emoji-grid">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="emoji-button"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

       {/* Feed */}
       <div className="feed">
         <div className="feed-header">
           <span className="show-posts-link">Posts will appear here</span>
         </div>
                   <div className="tweets-container">
            {/* Test Post - MrBeast */}
            <div className="tweet">
              <div className="tweet-avatar">
                <div className="avatar-placeholder">MB</div>
              </div>
              <div className="tweet-content">
                <div className="tweet-header">
                  <span className="tweet-author">MrBeast</span>
                  <svg className="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                  </svg>
                  <span className="tweet-handle">@MrBeast</span>
                  <span className="tweet-time">2h</span>
                </div>
                <div className="tweet-text">
                  Just finished filming the most insane challenge yet! 🤯 Can't wait to share it with you all. This one is going to break the internet! 💪
                </div>
                <div className="tweet-actions">
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-2.26 1.23c-.51.28-1.1.28-1.61 0l-2.26-1.23C4.307 15.68 2.751 12.96 2.751 10zM8 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm3.5 6c-.828 0-1.5-.672-1.5-1.5S10.672 11 11.5 11s1.5.672 1.5 1.5S12.328 17 11.5 17z"/>
                    </svg>
                    <span>2.4K</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 6.55V16c0 1.1.9 2 2 2h13v-2H7.5V6.55l-2.068 1.93-1.364-1.46L4.5 3.88zM16 16l-4 4-4-4h8z"/>
                    </svg>
                    <span>892</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09A3.902 3.902 0 0 0 11.303 5.5c-1.243 0-2.4.52-3.193 1.38A3.927 3.927 0 0 0 6.5 9.5c0 1.243.52 2.4 1.38 3.193A3.927 3.927 0 0 0 9.5 14.5c1.243 0 2.4-.52 3.193-1.38A3.927 3.927 0 0 0 14.5 9.5c0-1.243-.52-2.4-1.38-3.193A3.927 3.927 0 0 0 11.303 5.5zM9.5 12.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/>
                    </svg>
                    <span>45.2K</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
                    </svg>
                    <span>12.8M</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
                    </svg>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#536471">
                      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

const NotificationsPage = () => (
  <div className="page-content">
    <div className="feed-header">
      <h2>Notifications</h2>
    </div>
    <div className="notifications-content">
      <div className="notification-item">
        <div className="notification-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1da1f2">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="notification-text">
          <strong>John Doe</strong> liked your tweet
        </div>
        <div className="notification-time">2h</div>
      </div>
      <div className="notification-item">
        <div className="notification-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1da1f2">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="notification-text">
          <strong>Jane Smith</strong> retweeted your tweet
        </div>
        <div className="notification-time">5h</div>
      </div>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="page-content">
    <div className="profile-header">
      <div className="profile-cover"></div>
      <div className="profile-avatar">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="#1da1f2">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div className="profile-info">
        <h2>User Name</h2>
        <span className="profile-handle">@username</span>
        <p className="profile-bio">This is a sample bio for the user profile.</p>
      </div>
    </div>
    <div className="profile-stats">
      <div className="stat-item">
        <span className="stat-number">150</span>
        <span className="stat-label">Following</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">1.2K</span>
        <span className="stat-label">Followers</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">45</span>
        <span className="stat-label">Tweets</span>
      </div>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="page-content">
    <div className="feed-header">
      <h2>Settings</h2>
    </div>
    <div className="settings-content">
      <div className="settings-section">
        <h3>Account</h3>
        <div className="setting-item">
          <span>Username</span>
          <button className="edit-btn">Edit</button>
        </div>
        <div className="setting-item">
          <span>Email</span>
          <button className="edit-btn">Edit</button>
        </div>
      </div>
      <div className="settings-section">
        <h3>Privacy</h3>
        <div className="setting-item">
          <span>Private Account</span>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = ({ user, onLogout }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user && user.id) {
          const profile = await apiService.getUserProfile(user.id);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = () => {
    apiService.logout();
    onLogout();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderPageContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage user={user} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        {/* Navigation Drawer */}
        <div className={`navigation-drawer ${isDrawerOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#1da1f2">
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
              </svg>
              <span>Epita Twitter</span>
            </div>
          </div>

          <nav className="nav-menu">
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12.05 3.24l7.52 4.49-1.698 12.01z"/>
                <path d="M12 13.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
              </svg>
              <span>Home</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.18-6.03-.02-.278-.25-.49-.54-.49s-.52.21-.54.49c-.04 4.39-2.16 6.014-2.18 6.03-.01.01-.02.02-.02.03-.01.02-.01.04-.01.06 0 .02.01.04.01.06.01.01.01.02.02.03.02.016 2.14 1.64 2.18 6.03.02.278.25.49.54.49s.52-.21.54-.49c.04-4.39 2.16-6.014 2.18-6.03.01-.01.02-.02.02-.03.01-.02.01-.04.01-.06 0-.02-.01-.04-.01-.06-.01-.01-.01-.02-.02-.03zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-1c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v1l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <span>Notifications</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Profile</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
              </svg>
              <span>Settings</span>
            </button>
          </nav>

          <div className="drawer-footer">
            <button className="tweet-button">
              <span>Tweet</span>
            </button>

            {/* User Profile Section at Bottom */}
            <div className="user-profile-section">
              <div className="user-avatar">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#657786">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="user-details">
                <div className="user-name">{user?.username || user?.email}</div>
                <div className="user-handle">@{user?.username || 'user'}</div>
              </div>
              <button className="logout-btn-small" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isDrawerOpen && (
          <div className="drawer-overlay" onClick={toggleDrawer}></div>
        )}

        <div className="main-content">
          {renderPageContent()}
        </div>

        <div className="trending-sidebar">
          <div className="trending-header">
            <h3>Trends for you</h3>
          </div>
          <div className="trending-content">
            <p>No trending topics yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 