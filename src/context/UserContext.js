import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  avatar: null,
  level: 1,
  xp: 0,
  badges: [],
  achievements: [],
  preferences: {
    theme: 'dark',
    notifications: true,
    sound: true,
  },
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'UPDATE_LEVEL':
      return {
        ...state,
        level: action.payload.level,
        xp: action.payload.xp,
      };
    
    case 'ADD_XP':
      return {
        ...state,
        xp: state.xp + action.payload,
      };
    
    case 'ADD_BADGE':
      return {
        ...state,
        badges: [...state.badges, action.payload],
      };
    
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };
    
    case 'UPDATE_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ai-mastermind-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch({ type: 'SET_USER', payload: userData });
      } catch (error) {
        console.error('Error loading user data:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('ai-mastermind-user', JSON.stringify(state.user));
    }
  }, [state.user]);

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('ai-mastermind-user');
    dispatch({ type: 'LOGOUT' });
  };

  const addXP = (amount) => {
    dispatch({ type: 'ADD_XP', payload: amount });
    
    // Check for level up
    const currentLevel = state.level;
    const newXP = state.xp + amount;
    const xpForNextLevel = currentLevel * 100; // Simple leveling formula
    
    if (newXP >= xpForNextLevel) {
      const newLevel = currentLevel + 1;
      dispatch({ 
        type: 'UPDATE_LEVEL', 
        payload: { level: newLevel, xp: newXP - xpForNextLevel }
      });
      return { leveledUp: true, newLevel };
    }
    
    return { leveledUp: false };
  };

  const addBadge = (badge) => {
    dispatch({ type: 'ADD_BADGE', payload: badge });
  };

  const addAchievement = (achievement) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
  };

  const updateAvatar = (avatar) => {
    dispatch({ type: 'UPDATE_AVATAR', payload: avatar });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const value = {
    ...state,
    login,
    logout,
    addXP,
    addBadge,
    addAchievement,
    updateAvatar,
    updatePreferences,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 