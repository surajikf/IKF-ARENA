import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';
import './WelcomeAnimation.css';

const WelcomeAnimation = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [userName, setUserName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const steps = [
    {
      id: 0,
      title: "Welcome to AI Mastermind",
      subtitle: "The IKF Innovation Arena",
      description: "Your journey to becoming an AI expert starts here. Let's get you set up!",
      icon: Brain,
      color: "var(--primary-blue)",
      gradient: "var(--gradient-primary)"
    },
    {
      id: 1,
      title: "What's your name?",
      subtitle: "Let's personalize your experience",
      description: "We'll use this to customize your AI Mastermind journey",
      icon: Users,
      color: "var(--primary-purple)",
      gradient: "var(--gradient-secondary)",
      input: true,
      inputType: "text",
      placeholder: "Enter your name..."
    },
    {
      id: 2,
      title: "Which department?",
      subtitle: "Help us tailor your experience",
      description: "This helps us suggest relevant AI tools and case studies",
      icon: Target,
      color: "var(--primary-orange)",
      gradient: "var(--gradient-secondary)",
      options: [
        "Innovation & R&D",
        "Marketing & Sales",
        "Operations & Logistics",
        "Finance & Analytics",
        "HR & Training",
        "IT & Technology",
        "Other"
      ]
    },
    {
      id: 3,
      title: "Ready to explore?",
      subtitle: "Your AI Mastermind journey begins",
      description: "You're all set! Let's dive into the world of AI tools and innovation.",
      icon: Zap,
      color: "var(--primary-green)",
      gradient: "var(--gradient-success)"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete({
        name: userName || 'AI Explorer',
        department: selectedDepartment || 'Innovation & R&D'
      });
    }, 500);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="welcome-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          >
            {/* Background Effects */}
            <div className="welcome-bg-effects">
              <motion.div
                className="floating-particle"
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  rotate: [0, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
              <motion.div
                className="floating-particle"
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                  rotate: [0, -360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Star size={16} />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="welcome-progress">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="progress-text">
                {currentStep + 1} of {steps.length}
              </span>
            </div>

            {/* Step Content */}
            <motion.div
              className="welcome-content"
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Icon */}
              <motion.div
                className="welcome-icon"
                style={{ background: currentStepData.gradient }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={32} />
              </motion.div>

              {/* Title */}
              <h2 className="welcome-title">{currentStepData.title}</h2>
              <p className="welcome-subtitle">{currentStepData.subtitle}</p>
              <p className="welcome-description">{currentStepData.description}</p>

              {/* Input Fields */}
              {currentStepData.input && (
                <motion.div
                  className="welcome-input-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type={currentStepData.inputType}
                    placeholder={currentStepData.placeholder}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="welcome-input"
                    autoFocus
                  />
                </motion.div>
              )}

              {/* Options */}
              {currentStepData.options && (
                <motion.div
                  className="welcome-options"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentStepData.options.map((option, index) => (
                    <motion.button
                      key={option}
                      className={`welcome-option ${selectedDepartment === option ? 'selected' : ''}`}
                      onClick={() => setSelectedDepartment(option)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{option}</span>
                      {selectedDepartment === option && (
                        <CheckCircle size={16} className="check-icon" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Final Step Content */}
              {currentStep === steps.length - 1 && (
                <motion.div
                  className="welcome-features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="feature-item">
                    <Brain size={20} />
                    <span>Explore AI Tools</span>
                  </div>
                  <div className="feature-item">
                    <Target size={20} />
                    <span>Complete Challenges</span>
                  </div>
                  <div className="feature-item">
                    <Users size={20} />
                    <span>Connect with Team</span>
                  </div>
                  <div className="feature-item">
                    <Zap size={20} />
                    <span>Earn Rewards</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <div className="welcome-actions">
              {currentStep < steps.length - 1 ? (
                <>
                  <button
                    className="welcome-skip"
                    onClick={handleSkip}
                  >
                    Skip Setup
                  </button>
                  <motion.button
                    className="welcome-next"
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !userName.trim()) ||
                      (currentStep === 2 && !selectedDepartment)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep === steps.length - 2 ? 'Get Started' : 'Next'}
                    <ArrowRight size={16} />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  className="welcome-complete"
                  onClick={handleComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start My Journey
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation; 