import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  Trophy,
  Brain,
  FileText
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { user, level, xp, addXP, addBadge } = useUser();
  const { quests, activeQuests, dailyChallenges, weeklyChallenges, addNotification } = useGame();
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Initialize user if not exists
    if (!user) {
      const defaultUser = {
        name: 'AI Explorer',
        email: 'explorer@ikf.com',
        department: 'Innovation',
        joinDate: new Date().toISOString(),
      };
      // This would be handled by the UserContext
    }
  }, [user]);

  const statsCards = [
    {
      id: 'level',
      title: 'AI Mastery Level',
      value: level,
      icon: Brain,
      color: 'var(--primary-blue)',
      gradient: 'var(--gradient-primary)',
    },
    {
      id: 'xp',
      title: 'Total XP',
      value: xp,
      icon: TrendingUp,
      color: 'var(--primary-green)',
      gradient: 'var(--gradient-success)',
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      value: 12,
      icon: FileText,
      color: 'var(--primary-purple)',
      gradient: 'var(--gradient-secondary)',
    },
    {
      id: 'ratings',
      title: 'Ratings Given',
      value: 45,
      icon: Star,
      color: 'var(--primary-orange)',
      gradient: 'var(--gradient-secondary)',
    },
  ];

  const handleQuestClick = (quest) => {
    addXP(quest.xpReward);
    addNotification({
      type: 'success',
      title: 'Quest Completed!',
      message: `You earned ${quest.xpReward} XP for completing "${quest.title}"`,
    });
    toast.success(`🎉 Quest completed! +${quest.xpReward} XP`);
  };

  const handleChallengeClick = (challenge) => {
    addXP(challenge.xpReward);
    addNotification({
      type: 'success',
      title: 'Challenge Accepted!',
      message: `You're now working on "${challenge.title}"`,
    });
    toast.success(`⚡ Challenge accepted! +${challenge.xpReward} XP`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading your AI Mastermind dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Welcome back, <span className="gradient-text">{user?.name || 'AI Explorer'}</span>! 🚀
          </h1>
          <p className="hero-subtitle">
            Continue your journey to become an AI Mastermind. Your next breakthrough awaits!
          </p>
          <div className="hero-stats">
            <div className="level-display">
              <span className="level-number">{level}</span>
              <span className="level-label">Level</span>
            </div>
            <div className="xp-display">
              <div className="xp-bar-large">
                <div 
                  className="xp-fill-large" 
                  style={{ width: `${(xp % 100) / 100 * 100}%` }}
                />
              </div>
              <span className="xp-text-large">{xp % 100}/100 XP</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="floating-elements">
            <motion.div 
              className="floating-icon"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🧠
            </motion.div>
            <motion.div 
              className="floating-icon"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚡
            </motion.div>
            <motion.div 
              className="floating-icon"
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🏆
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className="stats-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 0 30px ${card.color}40`
                }}
              >
                <div className="card-icon" style={{ background: card.gradient }}>
                  <Icon size={24} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-value">{card.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Quests and Challenges */}
      <section className="quests-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Your Quests & Challenges</h2>
          <p>Complete missions to level up and earn rewards</p>
        </motion.div>

        <div className="quests-grid">
          {/* Daily Challenges */}
          <motion.div 
            className="quests-column"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="column-title">
              <Target size={20} />
              Daily Challenges
            </h3>
            <div className="quests-list">
              {dailyChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  className="quest-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="quest-icon">{challenge.icon}</div>
                  <div className="quest-content">
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                    <div className="quest-reward">
                      <span className="reward-xp">+{challenge.xpReward} XP</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="quest-arrow" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Challenges */}
          <motion.div 
            className="quests-column"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="column-title">
              <Trophy size={20} />
              Weekly Challenges
            </h3>
            <div className="quests-list">
              {weeklyChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  className="quest-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="quest-icon">{challenge.icon}</div>
                  <div className="quest-content">
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                    <div className="quest-reward">
                      <span className="reward-xp">+{challenge.xpReward} XP</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="quest-arrow" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2>Recent Activity</h2>
          <p>Your latest achievements and contributions</p>
        </motion.div>

        <motion.div 
          className="activity-feed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="empty-activity">
              <p>No recent activity yet. Start your AI journey!</p>
            </div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Dashboard; 