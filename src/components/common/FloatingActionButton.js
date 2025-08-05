import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Brain, FileText, Star } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addXP } = useUser();

  const actionItems = [
    {
      id: 'ai-tool',
      icon: Brain,
      label: 'Try AI Tool',
      color: 'var(--primary-purple)',
      action: () => {
        addXP(10);
        // Navigate to AI tools or open tool selection
        console.log('Opening AI tool selection...');
      }
    },
    {
      id: 'case-study',
      icon: FileText,
      label: 'Create Case Study',
      color: 'var(--primary-green)',
      action: () => {
        addXP(20);
        // Navigate to case study creation
        console.log('Opening case study creator...');
      }
    },
    {
      id: 'rate',
      icon: Star,
      label: 'Rate Posts',
      color: 'var(--primary-orange)',
      action: () => {
        addXP(5);
        // Navigate to case studies to rate
        console.log('Opening rating interface...');
      }
    }
  ];

  const handleMainButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fab-container">
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {actionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  className="fab-action"
                  style={{ '--action-color': item.color }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0, 
                    y: 0 
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: -(index + 1) * 60 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    y: 0 
                  }}
                  transition={{ 
                    duration: 0.2, 
                    delay: index * 0.1 
                  }}
                  onClick={() => handleActionClick(item.action)}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 0 20px ${item.color}40`
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                  <span className="action-label">{item.label}</span>
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        className="fab-main"
        onClick={handleMainButtonClick}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          backgroundColor: isOpen ? 'var(--primary-orange)' : 'var(--primary-blue)'
        }}
        transition={{ duration: 0.3 }}
      >
        <Plus size={24} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton; 