import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  quests: [],
  activeQuests: [],
  completedQuests: [],
  leaderboard: [],
  dailyChallenges: [],
  weeklyChallenges: [],
  achievements: [],
  notifications: [],
  soundEnabled: true,
  animationsEnabled: true,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTS':
      return {
        ...state,
        quests: action.payload,
      };
    
    case 'ADD_ACTIVE_QUEST':
      return {
        ...state,
        activeQuests: [...state.activeQuests, action.payload],
      };
    
    case 'COMPLETE_QUEST':
      return {
        ...state,
        activeQuests: state.activeQuests.filter(q => q.id !== action.payload.id),
        completedQuests: [...state.completedQuests, action.payload],
      };
    
    case 'UPDATE_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.payload,
      };
    
    case 'SET_DAILY_CHALLENGES':
      return {
        ...state,
        dailyChallenges: action.payload,
      };
    
    case 'SET_WEEKLY_CHALLENGES':
      return {
        ...state,
        weeklyChallenges: action.payload,
      };
    
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    
    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      };
    
    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        animationsEnabled: !state.animationsEnabled,
      };
    
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize game data
  useEffect(() => {
    // Load saved game state from localStorage
    const savedGameState = localStorage.getItem('ai-mastermind-game');
    if (savedGameState) {
      try {
        const gameData = JSON.parse(savedGameState);
        Object.keys(gameData).forEach(key => {
          if (initialState.hasOwnProperty(key)) {
            dispatch({ type: `SET_${key.toUpperCase()}`, payload: gameData[key] });
          }
        });
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    }

    // Initialize default quests
    const defaultQuests = [
      {
        id: 'quest-1',
        title: 'AI Tool Explorer',
        description: 'Try your first AI tool and share your experience',
        xpReward: 50,
        type: 'daily',
        requirements: { toolUsage: 1 },
        icon: '🔍',
      },
      {
        id: 'quest-2',
        title: 'Case Study Creator',
        description: 'Create your first case study post',
        xpReward: 100,
        type: 'daily',
        requirements: { caseStudies: 1 },
        icon: '📝',
      },
      {
        id: 'quest-3',
        title: 'Community Helper',
        description: 'Rate 5 case studies from other users',
        xpReward: 75,
        type: 'weekly',
        requirements: { ratings: 5 },
        icon: '🤝',
      },
      {
        id: 'quest-4',
        title: 'AI Mastermind',
        description: 'Reach level 5 in AI Mastery',
        xpReward: 200,
        type: 'achievement',
        requirements: { level: 5 },
        icon: '🧠',
      },
    ];

    dispatch({ type: 'SET_QUESTS', payload: defaultQuests });

    // Initialize daily challenges
    const dailyChallenges = [
      {
        id: 'daily-1',
        title: 'Tool Master',
        description: 'Use 3 different AI tools today',
        xpReward: 150,
        icon: '⚡',
      },
      {
        id: 'daily-2',
        title: 'Storyteller',
        description: 'Create a detailed case study with before/after results',
        xpReward: 200,
        icon: '📖',
      },
    ];

    dispatch({ type: 'SET_DAILY_CHALLENGES', payload: dailyChallenges });

    // Initialize weekly challenges
    const weeklyChallenges = [
      {
        id: 'weekly-1',
        title: 'Team Player',
        description: 'Collaborate with 5 different team members',
        xpReward: 500,
        icon: '👥',
      },
      {
        id: 'weekly-2',
        title: 'Innovation Leader',
        description: 'Create 10 case studies this week',
        xpReward: 1000,
        icon: '🏆',
      },
    ];

    dispatch({ type: 'SET_WEEKLY_CHALLENGES', payload: weeklyChallenges });
  }, []);

  // Save game state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ai-mastermind-game', JSON.stringify(state));
  }, [state]);

  const startQuest = (questId) => {
    const quest = state.quests.find(q => q.id === questId);
    if (quest && !state.activeQuests.find(q => q.id === questId)) {
      dispatch({ type: 'ADD_ACTIVE_QUEST', payload: { ...quest, startedAt: Date.now() } });
    }
  };

  const completeQuest = (questId) => {
    const quest = state.activeQuests.find(q => q.id === questId);
    if (quest) {
      dispatch({ type: 'COMPLETE_QUEST', payload: { ...quest, completedAt: Date.now() } });
    }
  };

  const updateLeaderboard = (leaderboardData) => {
    dispatch({ type: 'UPDATE_LEADERBOARD', payload: leaderboardData });
  };

  const addAchievement = (achievement) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: { ...achievement, earnedAt: Date.now() } });
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      timestamp: Date.now(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId });
  };

  const toggleSound = () => {
    dispatch({ type: 'TOGGLE_SOUND' });
  };

  const toggleAnimations = () => {
    dispatch({ type: 'TOGGLE_ANIMATIONS' });
  };

  const playSound = (soundType) => {
    if (state.soundEnabled) {
      // In a real app, you would play actual sound files
      console.log(`Playing sound: ${soundType}`);
    }
  };

  const value = {
    ...state,
    startQuest,
    completeQuest,
    updateLeaderboard,
    addAchievement,
    addNotification,
    removeNotification,
    toggleSound,
    toggleAnimations,
    playSound,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 