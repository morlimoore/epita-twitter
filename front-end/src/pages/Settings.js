import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('name');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    email: '',
    phone: ''
  });

  // Mock user data - in real app this would come from props
  const userProfile = {
    username: 'Sita Sharma',
    handle: '@sitasharma_np',
    bio: 'Proud Nepali 🇳🇵 | Love for mountains and momo | Digital Nepal advocate | Kathmandu ❤️ #NepalFirst',
    location: 'Kathmandu, Nepal',
    website: 'visitnepal.com',
    email: 'sita.sharma@gmail.com',
    phone: '+977-9841234567',
    dateOfBirth: '1995-04-15'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', formData);
    // Here you would make API call to save settings
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'name':
        return (
          <div className="settings-form">
            <h3>Profile Information</h3>
            <div className="settings-form-group">
              <label>Name</label>
              <input 
                type="text" 
                defaultValue={userProfile.username}
                onChange={(e) => handleInputChange('name', e.target.value)}
                maxLength="50"
              />
              <span className="char-count">{formData.name.length} / 50</span>
            </div>
            
            <div className="settings-form-group">
              <label>Bio</label>
              <textarea 
                defaultValue={userProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                maxLength="160"
                rows="3"
              />
              <span className="char-count">{formData.bio.length} / 160</span>
            </div>
            
            <div className="settings-form-group">
              <label>Location</label>
              <input 
                type="text" 
                defaultValue={userProfile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                maxLength="30"
              />
              <span className="char-count">{formData.location.length} / 30</span>
            </div>
            
            <div className="settings-form-group">
              <button className="settings-save-btn" onClick={handleSaveSettings}>
                Save
              </button>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="settings-form">
            <h3>Contact Information</h3>
            <div className="settings-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                defaultValue={userProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <small className="form-help">This will be used for account notifications and recovery.</small>
            </div>
            
            <div className="settings-form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                defaultValue={userProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <small className="form-help">For two-factor authentication and account security.</small>
            </div>
            
            <div className="settings-form-group">
              <button className="settings-save-btn" onClick={handleSaveSettings}>
                Save
              </button>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="settings-form">
            <h3>Preferences</h3>
            <div className="preferences-section">
              <h4>Privacy Settings</h4>
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Make my profile public
                </label>
                <small>Allow others to find and view your profile</small>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Allow direct messages
                </label>
                <small>Let other users send you private messages</small>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Hide my follower list
                </label>
                <small>Make your followers list private</small>
              </div>
            </div>

            <div className="preferences-section">
              <h4>Notification Settings</h4>
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Email notifications
                </label>
                <small>Receive notifications via email</small>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Push notifications
                </label>
                <small>Receive push notifications on your device</small>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Marketing communications
                </label>
                <small>Receive updates about new features and promotions</small>
              </div>
            </div>

            <div className="preferences-section">
              <h4>Display Settings</h4>
              <div className="preference-item">
                <label>Theme Preference</label>
                <select className="preference-select">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
            
            <div className="settings-form-group">
              <button className="settings-save-btn" onClick={handleSaveSettings}>
                Save
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <div className="header-controls">
          <button className="back-btn">←</button>
          <div className="header-info">
            <h1>Settings</h1>
          </div>
        </div>
      </div>

      <div className="settings-content">
        {/* Settings Navigation Tabs */}
        <div className="settings-tabs">
          <button 
            className={`settings-tab ${activeTab === 'name' ? 'active' : ''}`}
            onClick={() => setActiveTab('name')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Name
          </button>
          <button 
            className={`settings-tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Contact
          </button>
          <button 
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="settings-form-container">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
