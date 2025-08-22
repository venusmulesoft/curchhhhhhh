import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockUsers, mockHageresibket } from '../data/mockData';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  userType: null, // 'wereda_admin', 'Admin', or 'super_admin'
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        userType: action.payload.userType,
        token: action.payload.token,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userType: null,
        token: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userType: null,
        token: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          const userType = user.role === 'super_admin' ? 'super_admin' : 
                         user.role === 'Admin' ? 'Admin' : 'wereda_admin';
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user,
              userType,
              token,
            },
          });
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password, loginType) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      let user = null;
      let userType = null;
      let token = null;

      if (loginType === 'hageresibket') {
        // Hageresibket login
        const hageresibket = mockHageresibket.find(
          h => h.superAdminUsername === username && h.superAdminPassword === password
        );

        if (hageresibket) {
          user = hageresibket;
          userType = 'super_admin';
          token = `hageresibket_${Date.now()}`;
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // WeredaBetekihinet login
        const foundUser = mockUsers.find(
          u => u.username === username && u.password === password
        );

        if (foundUser) {
          user = foundUser;
          userType = foundUser.role;
          token = `wereda_${Date.now()}`;
        } else {
          throw new Error('Invalid credentials');
        }
      }

      // Store in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user,
          userType,
          token,
        },
      });

      return { success: true, userType };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updatedUser) => {
    if (state.user) {
      const newUser = { ...state.user, ...updatedUser };
      localStorage.setItem('userData', JSON.stringify(newUser));
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: newUser,
          userType: state.userType,
          token: state.token,
        },
      });
    }
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
