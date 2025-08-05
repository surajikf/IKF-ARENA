import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Star, 
  Heart, 
  MessageSquare, 
  Share2,
  ThumbsUp,
  Lightbulb,
  Shield,
  Users,
  Calendar,
  Tag
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';
import './CaseStudies.css';

const CaseStudies = () => {
  const { user, addXP } = useUser();
  const { addNotification } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock case studies data
  const [caseStudies, setCaseStudies] = useState([
    {
      id: 1,
      title: 'ChatGPT for Customer Service Automation',
      author: 'Sarah Johnson',
      authorAvatar: '👩‍💼',
      content: 'Implemented ChatGPT to handle customer inquiries, reducing response time by 60% and improving customer satisfaction scores.',
      aiTool: 'ChatGPT',
      beforeAfter: {
        before: 'Manual responses took 2-3 hours',
        after: 'Automated responses in under 5 minutes'
      },
      results: 'Increased customer satisfaction by 40%',
      tags: ['Customer Service', 'Automation', 'Efficiency'],
      rating: 4.8,
      likes: 24,
      comments: 8,
      createdAt: '2024-01-15',
      difficulty: 'Intermediate',
      xpReward: 150,
    },
    {
      id: 2,
      title: 'DALL-E for Marketing Visuals',
      author: 'Mike Chen',
      authorAvatar: '👨‍🎨',
      content: 'Used DALL-E to create custom marketing visuals, saving 80% of design time and producing unique, engaging content.',
      aiTool: 'DALL-E',
      beforeAfter: {
        before: 'Design team took 2 weeks per campaign',
        after: 'AI-generated visuals in 2 days'
      },
      results: 'Campaign engagement increased by 35%',
      tags: ['Marketing', 'Design', 'Creativity'],
      rating: 4.6,
      likes: 18,
      comments: 12,
      createdAt: '2024-01-12',
      difficulty: 'Beginner',
      xpReward: 120,
    },
    {
      id: 3,
      title: 'GitHub Copilot for Code Review',
      author: 'Alex Rodriguez',
      authorAvatar: '👨‍💻',
      content: 'Integrated GitHub Copilot into our development workflow, improving code quality and reducing review time by 50%.',
      aiTool: 'GitHub Copilot',
      beforeAfter: {
        before: 'Manual code review took 4-6 hours',
        after: 'AI-assisted review in 2-3 hours'
      },
      results: 'Bug rate decreased by 30%',
      tags: ['Development', 'Code Quality', 'Productivity'],
      rating: 4.9,
      likes: 31,
      comments: 15,
      createdAt: '2024-01-10',
      difficulty: 'Advanced',
      xpReward: 200,
    },
  ]);

  const [newCaseStudy, setNewCaseStudy] = useState({
    title: '',
    content: '',
    aiTool: '',
    beforeAfter: { before: '', after: '' },
    results: '',
    tags: [],
    difficulty: 'Beginner',
  });

  const ratingCategories = [
    { id: 'creativity', label: 'Creativity', icon: Lightbulb, color: 'var(--primary-orange)' },
    { id: 'results', label: 'Results', icon: Shield, color: 'var(--primary-green)' },
    { id: 'implementation', label: 'Implementation', icon: ThumbsUp, color: 'var(--primary-blue)' },
  ];

  const handleCreateCaseStudy = () => {
    if (newCaseStudy.title && newCaseStudy.content && newCaseStudy.aiTool) {
      const caseStudy = {
        id: Date.now(),
        ...newCaseStudy,
        author: user?.name || 'AI Explorer',
        authorAvatar: '👤',
        rating: 0,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString().split('T')[0],
        xpReward: newCaseStudy.difficulty === 'Beginner' ? 100 : 
                   newCaseStudy.difficulty === 'Intermediate' ? 150 : 200,
      };
      
      setCaseStudies([caseStudy, ...caseStudies]);
      addXP(caseStudy.xpReward);
      addNotification({
        type: 'success',
        title: 'Case Study Created!',
        message: `Your case study "${caseStudy.title}" has been published!`,
      });
      toast.success(`📝 Case study created! +${caseStudy.xpReward} XP`);
      setIsCreateModalOpen(false);
      setNewCaseStudy({
        title: '',
        content: '',
        aiTool: '',
        beforeAfter: { before: '', after: '' },
        results: '',
        tags: [],
        difficulty: 'Beginner',
      });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleRateCaseStudy = (caseStudyId, category, rating) => {
    addXP(10);
    toast.success(`⭐ Rated case study! +10 XP`);
  };

  const handleLikeCaseStudy = (caseStudyId) => {
    setCaseStudies(caseStudies.map(cs => 
      cs.id === caseStudyId 
        ? { ...cs, likes: cs.likes + 1 }
        : cs
    ));
    addXP(5);
    toast.success('❤️ Liked case study! +5 XP');
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#ffd700' : 'none'}
        color={i < Math.floor(rating) ? '#ffd700' : '#666'}
        className={interactive ? 'interactive-star' : ''}
        onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
      />
    ));
  };

  const filteredCaseStudies = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.difficulty.toLowerCase() === filter);

  return (
    <motion.div 
      className="case-studies-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <section className="studies-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="page-title">
            Case Studies <span className="gradient-text">Hub</span> 📝
          </h1>
          <p className="page-subtitle">
            Share your AI tool experiences and learn from others. Every case study helps the community grow!
          </p>
        </motion.div>
        
        <motion.button
          className="create-btn"
          onClick={() => setIsCreateModalOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          Create Case Study
        </motion.button>
      </section>

      {/* Filter */}
      <section className="filter-section">
        <motion.div 
          className="filter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="filter-buttons">
            {['all', 'beginner', 'intermediate', 'advanced'].map((filterType) => (
              <button
                key={filterType}
                className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                onClick={() => setFilter(filterType)}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section className="studies-grid-section">
        <motion.div 
          className="studies-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredCaseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="case-study-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCaseStudy(caseStudy)}
            >
              <div className="card-header">
                <div className="author-info">
                  <div className="author-avatar">{caseStudy.authorAvatar}</div>
                  <div>
                    <h3 className="author-name">{caseStudy.author}</h3>
                    <span className="post-date">{caseStudy.createdAt}</span>
                  </div>
                </div>
                <div className="difficulty-badge" style={{
                  background: caseStudy.difficulty === 'Beginner' ? 'var(--primary-green)' :
                             caseStudy.difficulty === 'Intermediate' ? 'var(--primary-orange)' : 'var(--primary-purple)'
                }}>
                  {caseStudy.difficulty}
                </div>
              </div>

              <div className="card-content">
                <h2 className="study-title">{caseStudy.title}</h2>
                <p className="study-content">{caseStudy.content}</p>
                
                <div className="ai-tool-info">
                  <Tag size={16} />
                  <span>AI Tool: {caseStudy.aiTool}</span>
                </div>

                <div className="before-after">
                  <div className="before">
                    <h4>Before</h4>
                    <p>{caseStudy.beforeAfter.before}</p>
                  </div>
                  <div className="after">
                    <h4>After</h4>
                    <p>{caseStudy.beforeAfter.after}</p>
                  </div>
                </div>

                <div className="results">
                  <h4>Results</h4>
                  <p>{caseStudy.results}</p>
                </div>

                <div className="tags">
                  {caseStudy.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <div className="rating-section">
                  <div className="overall-rating">
                    {renderStars(caseStudy.rating)}
                    <span className="rating-text">{caseStudy.rating}</span>
                  </div>
                  <span className="xp-reward">+{caseStudy.xpReward} XP</span>
                </div>
                
                <div className="interaction-buttons">
                  <button 
                    className="interaction-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeCaseStudy(caseStudy.id);
                    }}
                  >
                    <Heart size={16} />
                    <span>{caseStudy.likes}</span>
                  </button>
                  <button className="interaction-btn">
                    <MessageSquare size={16} />
                    <span>{caseStudy.comments}</span>
                  </button>
                  <button className="interaction-btn">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Create Case Study Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCreateModalOpen(false)}
          >
            <motion.div 
              className="create-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Create New Case Study</h2>
                <button 
                  className="modal-close"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={newCaseStudy.title}
                    onChange={(e) => setNewCaseStudy({...newCaseStudy, title: e.target.value})}
                    placeholder="Enter case study title"
                  />
                </div>
                
                <div className="form-group">
                  <label>AI Tool Used *</label>
                  <input
                    type="text"
                    value={newCaseStudy.aiTool}
                    onChange={(e) => setNewCaseStudy({...newCaseStudy, aiTool: e.target.value})}
                    placeholder="e.g., ChatGPT, DALL-E, GitHub Copilot"
                  />
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={newCaseStudy.content}
                    onChange={(e) => setNewCaseStudy({...newCaseStudy, content: e.target.value})}
                    placeholder="Describe your experience with the AI tool"
                    rows={4}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Before</label>
                    <textarea
                      value={newCaseStudy.beforeAfter.before}
                      onChange={(e) => setNewCaseStudy({
                        ...newCaseStudy, 
                        beforeAfter: {...newCaseStudy.beforeAfter, before: e.target.value}
                      })}
                      placeholder="What was the situation before using AI?"
                      rows={3}
                    />
                  </div>
                  <div className="form-group">
                    <label>After</label>
                    <textarea
                      value={newCaseStudy.beforeAfter.after}
                      onChange={(e) => setNewCaseStudy({
                        ...newCaseStudy, 
                        beforeAfter: {...newCaseStudy.beforeAfter, after: e.target.value}
                      })}
                      placeholder="What changed after using AI?"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Results</label>
                  <textarea
                    value={newCaseStudy.results}
                    onChange={(e) => setNewCaseStudy({...newCaseStudy, results: e.target.value})}
                    placeholder="What were the measurable results?"
                    rows={3}
                  />
                </div>
                
                <div className="form-group">
                  <label>Difficulty Level</label>
                  <select
                    value={newCaseStudy.difficulty}
                    onChange={(e) => setNewCaseStudy({...newCaseStudy, difficulty: e.target.value})}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="create-submit-btn"
                  onClick={handleCreateCaseStudy}
                >
                  <FileText size={16} />
                  Publish Case Study
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div 
              className="detail-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="detail-author">
                  <div className="author-avatar">{selectedCaseStudy.authorAvatar}</div>
                  <div>
                    <h3>{selectedCaseStudy.author}</h3>
                    <span>{selectedCaseStudy.createdAt}</span>
                  </div>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedCaseStudy(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <h2>{selectedCaseStudy.title}</h2>
                <p className="detail-content">{selectedCaseStudy.content}</p>
                
                <div className="detail-sections">
                  <div className="detail-section">
                    <h4>AI Tool Used</h4>
                    <p>{selectedCaseStudy.aiTool}</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Before & After</h4>
                    <div className="before-after-detail">
                      <div>
                        <strong>Before:</strong> {selectedCaseStudy.beforeAfter.before}
                      </div>
                      <div>
                        <strong>After:</strong> {selectedCaseStudy.beforeAfter.after}
                      </div>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Results</h4>
                    <p>{selectedCaseStudy.results}</p>
                  </div>
                </div>
                
                <div className="rating-section-detail">
                  <h4>Rate this Case Study</h4>
                  <div className="rating-categories">
                    {ratingCategories.map((category) => (
                      <div key={category.id} className="rating-category">
                        <category.icon size={16} style={{ color: category.color }} />
                        <span>{category.label}</span>
                        <div className="rating-stars">
                          {renderStars(0, true, (rating) => 
                            handleRateCaseStudy(selectedCaseStudy.id, category.id, rating)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CaseStudies; 