import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff,
  Palette,
  Moon,
  Sun,
  User,
  Shield,
  LogOut,
  Save,
  RotateCcw
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './Settings.css';

const SettingsPage = () => {
  const { user, preferences, updatePreferences, logout } = useUser();
  const { soundEnabled, animationsEnabled, toggleSound, toggleAnimations } = useGame();
  const [activeTab, setActiveTab] = useState('preferences');
  const [showResetModal, setShowResetModal] = useState(false);

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const handleSaveSettings = () => {
    toast.success('✅ Settings saved successfully!');
  };

  const handleResetProgress = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    // Reset user progress
    toast.success('🔄 Progress reset successfully!');
    setShowResetModal(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out successfully!');
  };

  return (
    <motion.div 
      className="settings-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <section className="settings-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="page-title">
            <Settings size={32} className="title-icon" />
            Settings <span className="gradient-text">Hub</span> ⚙️
          </h1>
          <p className="page-subtitle">
            Customize your AI Mastermind experience
          </p>
        </motion.div>
      </section>

      {/* Settings Container */}
      <section className="settings-container">
        <motion.div 
          className="settings-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Tabs */}
          <div className="settings-tabs">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  className="tab-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Preferences</h2>
                  
                  <div className="settings-group">
                    <h3>Appearance</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Theme</label>
                        <p>Choose your preferred color scheme</p>
                      </div>
                      <div className="setting-control">
                        <button className="theme-btn active">
                          <Moon size={16} />
                          Dark
                        </button>
                        <button className="theme-btn">
                          <Sun size={16} />
                          Light
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Game Experience</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Sound Effects</label>
                        <p>Enable or disable sound effects</p>
                      </div>
                      <div className="setting-control">
                        <button 
                          className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                          onClick={toggleSound}
                        >
                          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                          {soundEnabled ? 'On' : 'Off'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Animations</label>
                        <p>Enable or disable animations</p>
                      </div>
                      <div className="setting-control">
                        <button 
                          className={`toggle-btn ${animationsEnabled ? 'active' : ''}`}
                          onClick={toggleAnimations}
                        >
                          {animationsEnabled ? <Eye size={16} /> : <EyeOff size={16} />}
                          {animationsEnabled ? 'On' : 'Off'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  className="tab-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Notifications</h2>
                  
                  <div className="settings-group">
                    <h3>Push Notifications</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Quest Updates</label>
                        <p>Get notified when new quests are available</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn active">
                          <Bell size={16} />
                          On
                        </button>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Achievement Alerts</label>
                        <p>Celebrate your achievements with notifications</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn active">
                          <Bell size={16} />
                          On
                        </button>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Leaderboard Updates</label>
                        <p>Stay informed about your ranking changes</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn">
                          <Bell size={16} />
                          Off
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  className="tab-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Account</h2>
                  
                  <div className="settings-group">
                    <h3>Profile Information</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Display Name</label>
                        <p>Your name as it appears to others</p>
                      </div>
                      <div className="setting-control">
                        <input 
                          type="text" 
                          value={user?.name || 'AI Explorer'} 
                          className="setting-input"
                        />
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Email</label>
                        <p>Your email address for notifications</p>
                      </div>
                      <div className="setting-control">
                        <input 
                          type="email" 
                          value={user?.email || 'explorer@ikf.com'} 
                          className="setting-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Data Management</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Export Data</label>
                        <p>Download your progress and achievements</p>
                      </div>
                      <div className="setting-control">
                        <button className="action-btn">
                          <Save size={16} />
                          Export
                        </button>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Reset Progress</label>
                        <p>Start fresh with a clean slate</p>
                      </div>
                      <div className="setting-control">
                        <button 
                          className="action-btn danger"
                          onClick={handleResetProgress}
                        >
                          <RotateCcw size={16} />
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  className="tab-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Privacy & Security</h2>
                  
                  <div className="settings-group">
                    <h3>Privacy Settings</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Profile Visibility</label>
                        <p>Control who can see your profile</p>
                      </div>
                      <div className="setting-control">
                        <select className="setting-select">
                          <option>Public</option>
                          <option>Team Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Activity Sharing</label>
                        <p>Share your achievements with the team</p>
                      </div>
                      <div className="setting-control">
                        <button className="toggle-btn active">
                          <Eye size={16} />
                          On
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Security</h3>
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Two-Factor Authentication</label>
                        <p>Add an extra layer of security</p>
                      </div>
                      <div className="setting-control">
                        <button className="action-btn">
                          <Shield size={16} />
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Action Buttons */}
      <section className="settings-actions">
        <motion.div 
          className="actions-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSaveSettings}>
              <Save size={16} />
              Save Settings
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </motion.div>
      </section>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResetModal(false)}
          >
            <motion.div 
              className="reset-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Reset Progress</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowResetModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="warning-icon">⚠️</div>
                <h3>Are you sure?</h3>
                <p>
                  This action will permanently reset all your progress, including:
                </p>
                <ul>
                  <li>All XP and levels</li>
                  <li>Case studies and achievements</li>
                  <li>Badges and rewards</li>
                  <li>Leaderboard position</li>
                </ul>
                <p className="warning-text">
                  This action cannot be undone!
                </p>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowResetModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-btn"
                  onClick={confirmReset}
                >
                  Reset Progress
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsPage; 