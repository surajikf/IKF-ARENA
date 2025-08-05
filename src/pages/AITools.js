import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Search, 
  Image, 
  MessageSquare, 
  Code,
  Play,
  Star,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './AITools.css';

const AITools = () => {
  const { addXP } = useUser();
  const { addNotification } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Brain },
    { id: 'text', name: 'Text Generation', icon: MessageSquare },
    { id: 'image', name: 'Image Creation', icon: Image },
    { id: 'code', name: 'Code Assistant', icon: Code },
    { id: 'search', name: 'Search & Research', icon: Search },
  ];

  const aiTools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      description: 'Advanced language model for text generation and conversation',
      category: 'text',
      icon: MessageSquare,
      color: 'var(--primary-green)',
      difficulty: 'Beginner',
      xpReward: 50,
      features: ['Text generation', 'Conversation', 'Code assistance'],
      usage: 'High',
      rating: 4.8,
    },
    {
      id: 'dalle',
      name: 'DALL-E',
      description: 'AI image generation from text descriptions',
      category: 'image',
      icon: Image,
      color: 'var(--primary-purple)',
      difficulty: 'Intermediate',
      xpReward: 75,
      features: ['Image generation', 'Creative design', 'Visual content'],
      usage: 'Medium',
      rating: 4.6,
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI-powered code completion and generation',
      category: 'code',
      icon: Code,
      color: 'var(--primary-blue)',
      difficulty: 'Advanced',
      xpReward: 100,
      features: ['Code completion', 'Bug detection', 'Documentation'],
      usage: 'High',
      rating: 4.9,
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Advanced AI assistant for complex reasoning tasks',
      category: 'text',
      icon: Brain,
      color: 'var(--primary-orange)',
      difficulty: 'Intermediate',
      xpReward: 80,
      features: ['Reasoning', 'Analysis', 'Writing assistance'],
      usage: 'Medium',
      rating: 4.7,
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      description: 'High-quality AI art generation and creative design',
      category: 'image',
      icon: Image,
      color: 'var(--primary-pink)',
      difficulty: 'Intermediate',
      xpReward: 90,
      features: ['Art generation', 'Creative design', 'High resolution'],
      usage: 'Medium',
      rating: 4.8,
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      description: 'AI-powered search and research assistant',
      category: 'search',
      icon: Search,
      color: 'var(--primary-green)',
      difficulty: 'Beginner',
      xpReward: 60,
      features: ['Research', 'Fact-checking', 'Summarization'],
      usage: 'High',
      rating: 4.5,
    },
  ];

  const filteredTools = selectedCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setIsToolModalOpen(true);
    addXP(tool.xpReward);
    addNotification({
      type: 'success',
      title: 'Tool Selected!',
      message: `You selected ${tool.name} and earned ${tool.xpReward} XP!`,
    });
    toast.success(`🎯 Selected ${tool.name}! +${tool.xpReward} XP`);
  };

  const handleTryTool = () => {
    if (selectedTool) {
      addXP(selectedTool.xpReward * 2);
      toast.success(`🚀 Trying ${selectedTool.name}! +${selectedTool.xpReward * 2} XP`);
      setIsToolModalOpen(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#ffd700' : 'none'}
        color={i < Math.floor(rating) ? '#ffd700' : '#666'}
      />
    ));
  };

  return (
    <motion.div 
      className="ai-tools-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <section className="tools-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="page-title">
            AI Tools <span className="gradient-text">Arena</span> 🧠
          </h1>
          <p className="page-subtitle">
            Explore and master cutting-edge AI tools. Each tool you try brings you closer to becoming an AI Mastermind!
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <motion.div 
          className="filter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="filter-header">
            <Filter size={20} />
            <span>Filter by Category</span>
          </div>
          <div className="category-buttons">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="tools-grid-section">
        <motion.div 
          className="tools-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                className="tool-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 0 30px ${tool.color}40`
                }}
                onClick={() => handleToolSelect(tool)}
              >
                <div className="tool-header">
                  <div className="tool-icon" style={{ background: tool.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="tool-rating">
                    {renderStars(tool.rating)}
                    <span className="rating-text">{tool.rating}</span>
                  </div>
                </div>
                
                <div className="tool-content">
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-description">{tool.description}</p>
                  
                  <div className="tool-features">
                    {tool.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  
                  <div className="tool-meta">
                    <span className="difficulty-badge" style={{ 
                      background: tool.difficulty === 'Beginner' ? 'var(--primary-green)' :
                                 tool.difficulty === 'Intermediate' ? 'var(--primary-orange)' : 'var(--primary-purple)'
                    }}>
                      {tool.difficulty}
                    </span>
                    <span className="usage-badge">
                      {tool.usage} Usage
                    </span>
                  </div>
                </div>
                
                <div className="tool-footer">
                  <span className="xp-reward">+{tool.xpReward} XP</span>
                  <ArrowRight size={16} className="tool-arrow" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Tool Modal */}
      <AnimatePresence>
        {isToolModalOpen && selectedTool && (
          <motion.div 
            className="tool-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsToolModalOpen(false)}
          >
            <motion.div 
              className="tool-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-tool-info">
                  <div className="modal-tool-icon" style={{ background: selectedTool.color }}>
                    <selectedTool.icon size={32} />
                  </div>
                  <div>
                    <h2>{selectedTool.name}</h2>
                    <p>{selectedTool.description}</p>
                  </div>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setIsToolModalOpen(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="tool-details">
                  <div className="detail-item">
                    <span className="detail-label">Difficulty:</span>
                    <span className="detail-value">{selectedTool.difficulty}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rating:</span>
                    <div className="detail-rating">
                      {renderStars(selectedTool.rating)}
                      <span>{selectedTool.rating}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Usage:</span>
                    <span className="detail-value">{selectedTool.usage}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">XP Reward:</span>
                    <span className="detail-value xp-highlight">+{selectedTool.xpReward} XP</span>
                  </div>
                </div>
                
                <div className="tool-features-list">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedTool.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="try-tool-btn"
                  onClick={handleTryTool}
                  style={{ background: selectedTool.color }}
                >
                  <Play size={16} />
                  Try {selectedTool.name}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setIsToolModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AITools; 