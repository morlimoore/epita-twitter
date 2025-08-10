import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import apiService from '../services/api';

const Dashboard = ({ user, onLogout }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Epita Twitter</h1>
          <div className="user-info">
            <span>Welcome, {user?.username || user?.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="sidebar">
          <nav className="nav-menu">
            <button className="nav-item active">Home</button>
            <button className="nav-item">Profile</button>
            <button className="nav-item">Notifications</button>
            <button className="nav-item">Messages</button>
          </nav>
        </div>

        <div className="main-content">
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