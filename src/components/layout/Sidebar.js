import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Brain, 
  FileText, 
  Trophy, 
  User, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, level, xp } = useUser();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', color: 'var(--primary-blue)' },
    { path: '/ai-tools', icon: Brain, label: 'AI Tools', color: 'var(--primary-purple)' },
    { path: '/case-studies', icon: FileText, label: 'Case Studies', color: 'var(--primary-green)' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'var(--primary-orange)' },
    { path: '/profile', icon: User, label: 'Profile', color: 'var(--primary-pink)' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'var(--text-secondary)' },
  ];

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.nav 
        className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* User Profile Section */}
        <div className="sidebar-header">
          <motion.div 
            className="user-avatar"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="User Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="level-badge">
              <span>{level}</span>
            </div>
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className="user-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="user-name">{user?.name || 'AI Explorer'}</h3>
                <p className="user-title">Level {level} Mastermind</p>
                <div className="xp-bar">
                  <div 
                    className="xp-fill" 
                    style={{ width: `${(xp % 100) / 100 * 100}%` }}
                  />
                </div>
                <span className="xp-text">{xp % 100}/100 XP</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                  style={{ '--hover-color': item.color }}
                >
                  <motion.div 
                    className="nav-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                    {isActive && (
                      <motion.div 
                        className="active-indicator"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span 
                        className="nav-label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>
            );
          })}
        </ul>

        {/* Expand/Collapse Button */}
        <motion.button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.div>
        </motion.button>

        {/* Quest Progress */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="quest-progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h4>Active Quests</h4>
              <div className="quest-item">
                <span className="quest-icon">🎯</span>
                <span className="quest-title">Daily Challenge</span>
                <div className="quest-progress-bar">
                  <div className="quest-progress-fill" style={{ width: '60%' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar; 