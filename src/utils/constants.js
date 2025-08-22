// Application constants
export const APP_NAME = 'Church Management System';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'Professional Church Management System for Ethiopian Orthodox Churches';

// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Authentication
export const TOKEN_KEY = 'church_auth_token';
export const USER_KEY = 'church_user_data';

// User roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'Admin',
  WEREDA_ADMIN: 'wereda_admin',
};

// Permissions
export const PERMISSIONS = {
  // Wereda management
  MANAGE_WEREDA: 'manage_wereda',
  VIEW_WEREDA: 'view_wereda',
  
  // User management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  
  // Believer management
  MANAGE_BELIEVERS: 'manage_believers',
  VIEW_BELIEVERS: 'view_believers',
  
  // Atbiya management
  MANAGE_ATBIYA: 'manage_atbiya',
  VIEW_ATBIYA: 'view_atbiya',
  
  // Sacrament management
  MANAGE_BAPTISMS: 'manage_baptisms',
  MANAGE_MARRIAGES: 'manage_marriages',
  MANAGE_DEATHS: 'manage_deaths',
  
  // Reports and statistics
  VIEW_STATISTICS: 'view_statistics',
  GENERATE_REPORTS: 'generate_reports',
  
  // Certificates
  GENERATE_CERTIFICATES: 'generate_certificates',
  
  // System
  SYSTEM_SETTINGS: 'system_settings',
  AUDIT_LOGS: 'audit_logs',
  BACKUP_RESTORE: 'backup_restore',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

// Status options
export const STATUS_OPTIONS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Gender options
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
};

// Believer roles
export const BELIEVER_ROLES = {
  ELDER: 'elder',
  ADULT: 'adult',
  YOUTH: 'youth',
  CHILD: 'child',
};

// Atbiya roles
export const ATBIYA_ROLES = {
  PRIEST: 'priest',
  DEACON: 'deacon',
  MONK: 'monk',
  NUN: 'nun',
  SUNDAY_SCHOOL_TEACHER: 'sunday_school_teacher',
};

// Ethiopian calendar months
export const ETHIOPIAN_MONTHS = [
  'Meskerem',
  'Tikimt',
  'Hidar',
  'Tahsas',
  'Tir',
  'Yekatit',
  'Megabit',
  'Miazia',
  'Ginbot',
  'Sene',
  'Hamle',
  'Nehase',
  'Pagume',
];

// Regional divisions
export const REGIONS = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'SNNPR',
  'Somali',
  'Tigray',
];

// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'church_theme',
  LANGUAGE: 'church_language',
  SETTINGS: 'church_settings',
  SIDEBAR_COLLAPSED: 'church_sidebar_collapsed',
};

// Languages
export const LANGUAGES = {
  EN: 'en',
  AM: 'am',
  OR: 'or',
  TI: 'ti',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Record created successfully.',
  UPDATED: 'Record updated successfully.',
  DELETED: 'Record deleted successfully.',
  SAVED: 'Changes saved successfully.',
  LOGIN: 'Login successful.',
  LOGOUT: 'Logout successful.',
};