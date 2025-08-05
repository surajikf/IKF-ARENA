import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Award, 
  Trophy, 
  Star, 
  TrendingUp, 
  Calendar,
  Target,
  Zap,
  Brain,
  Edit,
  Camera,
  Settings
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user, level, xp, badges, achievements, updateAvatar } = useUser();
  const { addNotification } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '👤');

  const avatars = ['👤', '👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍💻', '👨‍💼', '👩‍🔬'];

  const userStats = [
    { label: 'Total XP', value: xp, icon: Zap, color: 'var(--primary-green)' },
    { label: 'Case Studies', value: 12, icon: TrendingUp, color: 'var(--primary-blue)' },
    { label: 'Badges Earned', value: badges.length, icon: Award, color: 'var(--primary-orange)' },
    { label: 'Achievements', value: achievements.length, icon: Trophy, color: 'var(--primary-purple)' },
  ];

  const userBadges = [
    { id: 1, name: 'AI Explorer', description: 'First AI tool used', icon: '🔍', earned: true },
    { id: 2, name: 'Case Study Creator', description: 'Created first case study', icon: '📝', earned: true },
    { id: 3, name: 'Community Helper', description: 'Rated 10 case studies', icon: '🤝', earned: false },
    { id: 4, name: 'Innovation Leader', description: 'Reached level 5', icon: '🚀', earned: false },
    { id: 5, name: 'Tool Master', description: 'Used 5 different AI tools', icon: '⚡', earned: false },
    { id: 6, name: 'AI Guru', description: 'Reached level 10', icon: '🧠', earned: false },
  ];

  const userAchievements = [
    { id: 1, name: 'First Steps', description: 'Completed onboarding', date: '2024-01-10', icon: '🎯' },
    { id: 2, name: 'Quick Learner', description: 'Gained 100 XP in one day', date: '2024-01-12', icon: '⚡' },
  ];

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    updateAvatar(avatar);
    addNotification({
      type: 'success',
      title: 'Avatar Updated!',
      message: 'Your profile picture has been updated successfully.',
    });
    toast.success('👤 Avatar updated!');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    addNotification({
      type: 'success',
      title: 'Profile Updated!',
      message: 'Your profile information has been saved.',
    });
    toast.success('✅ Profile updated!');
  };

  return (
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <section className="profile-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="page-title">
            <User size={32} className="title-icon" />
            Profile <span className="gradient-text">Hub</span> 👤
          </h1>
          <p className="page-subtitle">
            Your AI Mastermind journey and achievements
          </p>
        </motion.div>
      </section>

      {/* Profile Card */}
      <section className="profile-card-section">
        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="profile-header-card">
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar-display">{selectedAvatar}</div>
                <button 
                  className="avatar-edit-btn"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Camera size={16} />
                </button>
              </div>
              
              <AnimatePresence>
                {isEditing && (
                  <motion.div 
                    className="avatar-selector"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <h4>Choose Avatar</h4>
                    <div className="avatar-options">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar}
                          className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                          onClick={() => handleAvatarChange(avatar)}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="profile-info">
              <h2 className="user-name">{user?.name || 'AI Explorer'}</h2>
              <p className="user-title">Level {level} AI Mastermind</p>
              <p className="user-department">Innovation Department</p>
              
              <div className="level-progress">
                <div className="progress-info">
                  <span>Level {level}</span>
                  <span>{xp % 100}/100 XP</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(xp % 100) / 100 * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                <Edit size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="stats-section">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon" style={{ background: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value.toLocaleString()}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Badges Section */}
      <section className="badges-section">
        <motion.div 
          className="badges-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="section-title">
            <Award size={24} />
            Badges & Achievements
          </h2>
          
          <div className="badges-grid">
            {userBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="badge-icon">
                  <span className="badge-emoji">{badge.icon}</span>
                  {badge.earned && <div className="earned-indicator">✓</div>}
                </div>
                <div className="badge-info">
                  <h3 className="badge-name">{badge.name}</h3>
                  <p className="badge-description">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <motion.div 
          className="achievements-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="section-title">
            <Trophy size={24} />
            Recent Achievements
          </h2>
          
          <div className="achievements-list">
            {userAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="achievement-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <div className="achievement-icon">
                  <span className="achievement-emoji">{achievement.icon}</span>
                </div>
                <div className="achievement-info">
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Activity Timeline */}
      <section className="timeline-section">
        <motion.div 
          className="timeline-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="section-title">
            <Calendar size={24} />
            Recent Activity
          </h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">
                <Target size={16} />
              </div>
              <div className="timeline-content">
                <h3>Completed Daily Challenge</h3>
                <p>Used 3 different AI tools today</p>
                <span className="timeline-date">2 hours ago</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-icon">
                <Star size={16} />
              </div>
              <div className="timeline-content">
                <h3>Rated Case Study</h3>
                <p>Gave 5 stars to "ChatGPT for Customer Service"</p>
                <span className="timeline-date">1 day ago</span>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-icon">
                <Brain size={16} />
              </div>
              <div className="timeline-content">
                <h3>Level Up!</h3>
                <p>Reached Level {level} in AI Mastery</p>
                <span className="timeline-date">3 days ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Profile; 