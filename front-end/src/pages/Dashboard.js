import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import apiService from '../services/api';

// Page Components
const HomePage = () => (
  <div className="page-content">
    <div className="tweet-composer">
      <textarea 
        placeholder="What's happening?"
        className="tweet-input"
      />
      <button className="tweet-btn">Tweet</button>
    </div>

    <div className="feed">
      <div className="feed-header">
        <h2>Home</h2>
      </div>
      <div className="tweets-container">
        <p className="no-tweets">No tweets yet. Be the first to tweet!</p>
      </div>
    </div>
  </div>
);

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
        return <HomePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
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
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
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