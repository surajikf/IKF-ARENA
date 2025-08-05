import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { UserProvider } from './context/UserContext';
import { GameProvider } from './context/GameContext';

// Components
import Sidebar from './components/layout/Sidebar';
import FloatingActionButton from './components/common/FloatingActionButton';
import WelcomeAnimation from './components/onboarding/WelcomeAnimation';

// Pages
import Dashboard from './pages/Dashboard';
import AITools from './pages/AITools';
import CaseStudies from './pages/CaseStudies';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Styles
import './App.css';

function App() {
  return (
    <UserProvider>
      <GameProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <main className="main-content">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/ai-tools" element={<AITools />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AnimatePresence>
            </main>
            <FloatingActionButton />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--primary-blue)',
                  borderRadius: 'var(--radius-md)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--primary-green)',
                    secondary: 'var(--text-primary)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--primary-orange)',
                    secondary: 'var(--text-primary)',
                  },
                },
              }}
            />
          </div>
        </Router>
      </GameProvider>
    </UserProvider>
  );
}

export default App; 