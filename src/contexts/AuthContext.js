import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  userType: null,
  token: null,
  permissions: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        userType: action.payload.userType,
        token: action.payload.token,
        permissions: action.payload.permissions || [],
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userType: null,
        token: null,
        permissions: [],
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = storageService.getToken();
        const userData = storageService.getUserData();
        
        if (token && userData) {
          const userType = authService.getUserType(userData);
          const permissions = authService.getUserPermissions(userData);
          
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: userData,
              userType,
              token,
              permissions,
            },
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        storageService.clearAuth();
        dispatch({ type: 'AUTH_FAILURE' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials, loginType) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await authService.login(credentials, loginType);
      
      if (result.success) {
        const { user, userType, token, permissions } = result.data;
        
        // Store in localStorage
        storageService.setToken(token);
        storageService.setUserData(user);

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user,
            userType,
            token,
            permissions,
          },
        });

        toast.success('Login successful!');
        return { success: true, userType };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      toast.error(error.message || 'Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      storageService.clearAuth();
      dispatch({ type: 'AUTH_LOGOUT' });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server logout fails
      storageService.clearAuth();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const updateUser = (updatedUser) => {
    if (state.user) {
      const newUser = { ...state.user, ...updatedUser };
      storageService.setUserData(newUser);
      dispatch({
        type: 'UPDATE_USER',
        payload: updatedUser,
      });
    }
  };

  const hasPermission = (permission) => {
    return state.permissions.includes(permission) || state.userType === 'super_admin';
  };

  const hasRole = (role) => {
    return state.userType === role;
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    hasPermission,
    hasRole,
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