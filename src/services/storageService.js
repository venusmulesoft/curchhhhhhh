class StorageService {
  constructor() {
    this.tokenKey = 'church_auth_token';
    this.userKey = 'church_user_data';
    this.settingsKey = 'church_settings';
  }

  // Token management
  setToken(token) {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  getToken() {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  removeToken() {
    try {
      localStorage.removeItem(this.tokenKey);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // User data management
  setUserData(userData) {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  getUserData() {
    try {
      const userData = localStorage.getItem(this.userKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  removeUserData() {
    try {
      localStorage.removeItem(this.userKey);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  }

  // Settings management
  setSettings(settings) {
    try {
      localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    } catch (error) {
      console.error('Error storing settings:', error);
    }
  }

  getSettings() {
    try {
      const settings = localStorage.getItem(this.settingsKey);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error retrieving settings:', error);
      return {};
    }
  }

  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeUserData();
  }

  // Clear all data
  clearAll() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Check if storage is available
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const storageService = new StorageService();