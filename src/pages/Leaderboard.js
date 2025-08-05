import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp, 
  Users,
  Calendar,
  Award,
  Zap,
  Brain,
  Target
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './Leaderboard.css';

const Leaderboard = () => {
  const { user, level, xp } = useUser();
  const { addNotification } = useGame();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [userRank, setUserRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock leaderboard data
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: '👩‍💼',
        level: 8,
        xp: 2450,
        caseStudies: 15,
        badges: 12,
        achievements: 8,
        rank: 1,
        department: 'Innovation',
        streak: 7,
        lastActive: '2 hours ago',
        trophy: 'crown',
      },
      {
        id: 2,
        name: 'Mike Chen',
        avatar: '👨‍🎨',
        level: 7,
        xp: 2100,
        caseStudies: 12,
        badges: 10,
        achievements: 6,
        rank: 2,
        department: 'Marketing',
        streak: 5,
        lastActive: '1 hour ago',
        trophy: 'medal',
      },
      {
        id: 3,
        name: 'Alex Rodriguez',
        avatar: '👨‍💻',
        level: 6,
        xp: 1850,
        caseStudies: 10,
        badges: 8,
        achievements: 5,
        rank: 3,
        department: 'Development',
        streak: 4,
        lastActive: '30 minutes ago',
        trophy: 'trophy',
      },
      {
        id: 4,
        name: 'Emma Wilson',
        avatar: '👩‍🔬',
        level: 5,
        xp: 1600,
        caseStudies: 8,
        badges: 6,
        achievements: 4,
        rank: 4,
        department: 'Research',
        streak: 3,
        lastActive: '1 day ago',
        trophy: 'star',
      },
      {
        id: 5,
        name: 'David Kim',
        avatar: '👨‍💼',
        level: 4,
        xp: 1400,
        caseStudies: 6,
        badges: 5,
        achievements: 3,
        rank: 5,
        department: 'Sales',
        streak: 2,
        lastActive: '2 days ago',
        trophy: 'star',
      },
    ];

    // Add current user to leaderboard
    const currentUser = {
      id: 'current',
      name: user?.name || 'AI Explorer',
      avatar: '👤',
      level: level,
      xp: xp,
      caseStudies: 3,
      badges: 2,
      achievements: 1,
      rank: 6,
      department: 'Innovation',
      streak: 1,
      lastActive: 'Just now',
      trophy: 'star',
    };

    const allData = [...mockData, currentUser].sort((a, b) => b.xp - a.xp);
    
    // Update ranks
    allData.forEach((user, index) => {
      user.rank = index + 1;
    });

    setLeaderboardData(allData);
    setUserRank(allData.find(u => u.id === 'current')?.rank || 6);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user, level, xp]);

  const periods = [
    { id: 'weekly', label: 'This Week', icon: Calendar },
    { id: 'monthly', label: 'This Month', icon: TrendingUp },
    { id: 'allTime', label: 'All Time', icon: Trophy },
  ];

  const getTrophyIcon = (trophy) => {
    switch (trophy) {
      case 'crown':
        return <Crown size={24} className="trophy-icon crown" />;
      case 'medal':
        return <Medal size={24} className="trophy-icon medal" />;
      case 'trophy':
        return <Trophy size={24} className="trophy-icon trophy" />;
      default:
        return <Star size={24} className="trophy-icon star" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'var(--primary-orange)';
      case 2:
        return 'var(--primary-purple)';
      case 3:
        return 'var(--primary-blue)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    addNotification({
      type: 'info',
      title: 'Leaderboard Updated',
      message: `Viewing ${period === 'weekly' ? 'weekly' : period === 'monthly' ? 'monthly' : 'all-time'} rankings`,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="leaderboard-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <section className="leaderboard-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="page-title">
            <Trophy size={32} className="title-icon" />
            Leaderboard <span className="gradient-text">Arena</span> 🏆
          </h1>
          <p className="page-subtitle">
            Compete with your colleagues and climb the ranks to become the ultimate AI Mastermind!
          </p>
        </motion.div>
      </section>

      {/* Period Selector */}
      <section className="period-selector">
        <motion.div 
          className="period-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="period-buttons">
            {periods.map((period, index) => {
              const Icon = period.icon;
              return (
                <motion.button
                  key={period.id}
                  className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
                  onClick={() => handlePeriodChange(period.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span>{period.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* User Rank Card */}
      <section className="user-rank-section">
        <motion.div 
          className="user-rank-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="rank-info">
            <div className="rank-number">#{userRank}</div>
            <div className="rank-label">Your Rank</div>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <Brain size={16} />
              <span>Level {level}</span>
            </div>
            <div className="stat-item">
              <Zap size={16} />
              <span>{xp} XP</span>
            </div>
            <div className="stat-item">
              <Target size={16} />
              <span>{userRank <= 3 ? 'Top Performer!' : 'Keep Going!'}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Leaderboard Table */}
      <section className="leaderboard-section">
        <motion.div 
          className="leaderboard-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="leaderboard-header-row">
            <div className="header-rank">Rank</div>
            <div className="header-user">User</div>
            <div className="header-level">Level</div>
            <div className="header-xp">XP</div>
            <div className="header-stats">Stats</div>
            <div className="header-streak">Streak</div>
          </div>

          <div className="leaderboard-rows">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                className={`leaderboard-row ${user.id === 'current' ? 'current-user' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="rank-column">
                  <div className="rank-number" style={{ color: getRankColor(user.rank) }}>
                    {user.rank}
                  </div>
                  {getTrophyIcon(user.trophy)}
                </div>

                <div className="user-column">
                  <div className="user-avatar">{user.avatar}</div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-department">{user.department}</div>
                    <div className="user-last-active">{user.lastActive}</div>
                  </div>
                </div>

                <div className="level-column">
                  <div className="level-badge">
                    <Brain size={16} />
                    <span>{user.level}</span>
                  </div>
                </div>

                <div className="xp-column">
                  <div className="xp-value">{user.xp.toLocaleString()}</div>
                  <div className="xp-bar">
                    <div 
                      className="xp-fill" 
                      style={{ 
                        width: `${(user.xp / 3000) * 100}%`,
                        background: user.rank === 1 ? 'var(--gradient-secondary)' : 'var(--gradient-success)'
                      }}
                    />
                  </div>
                </div>

                <div className="stats-column">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-label">Studies</span>
                      <span className="stat-value">{user.caseStudies}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Badges</span>
                      <span className="stat-value">{user.badges}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Achievements</span>
                      <span className="stat-value">{user.achievements}</span>
                    </div>
                  </div>
                </div>

                <div className="streak-column">
                  <div className="streak-badge">
                    <TrendingUp size={16} />
                    <span>{user.streak} days</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Achievement Highlights */}
      <section className="achievements-section">
        <motion.div 
          className="achievements-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="section-title">Recent Achievements</h2>
          <div className="achievements-grid">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.id}
                className="achievement-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                <div className="achievement-header">
                  {getTrophyIcon(user.trophy)}
                  <div className="achievement-info">
                    <h3>{user.name}</h3>
                    <p>Reached Level {user.level}</p>
                  </div>
                </div>
                <div className="achievement-stats">
                  <div className="achievement-stat">
                    <span className="stat-number">{user.xp.toLocaleString()}</span>
                    <span className="stat-label">Total XP</span>
                  </div>
                  <div className="achievement-stat">
                    <span className="stat-number">{user.caseStudies}</span>
                    <span className="stat-label">Case Studies</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Motivation Section */}
      <section className="motivation-section">
        <motion.div 
          className="motivation-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="motivation-content">
            <h2>Keep Climbing! 🚀</h2>
            <p>
              {userRank <= 3 
                ? "You're in the top tier! Maintain your momentum and inspire others."
                : userRank <= 10
                ? "You're doing great! Focus on creating more case studies to climb higher."
                : "Every case study and AI tool exploration brings you closer to the top!"
              }
            </p>
            <div className="motivation-tips">
              <div className="tip">
                <Target size={16} />
                <span>Complete daily challenges for bonus XP</span>
              </div>
              <div className="tip">
                <Users size={16} />
                <span>Collaborate with team members</span>
              </div>
              <div className="tip">
                <Award size={16} />
                <span>Share your AI tool experiences</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Leaderboard; 