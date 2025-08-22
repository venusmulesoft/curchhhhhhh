/**
 * Validation utilities
 */

/**
 * Validate email address
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Ethiopian phone number
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Ethiopian phone number patterns
  const patterns = [
    /^251[79]\d{8}$/, // International format
    /^0[79]\d{8}$/, // Local format
    /^[79]\d{8}$/, // Without country code or leading zero
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password),
  };
};

/**
 * Get password strength score
 */
const getPasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

/**
 * Validate required field
 */
export const isRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate minimum length
 */
export const minLength = (value, min, fieldName = 'Field') => {
  if (value && value.length < min) {
    return `${fieldName} must be at least ${min} characters long`;
  }
  return null;
};

/**
 * Validate maximum length
 */
export const maxLength = (value, max, fieldName = 'Field') => {
  if (value && value.length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
};

/**
 * Validate number range
 */
export const numberRange = (value, min, max, fieldName = 'Field') => {
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  if (num < min || num > max) {
    return `${fieldName} must be between ${min} and ${max}`;
  }
  return null;
};

/**
 * Validate date
 */
export const isValidDate = (date, fieldName = 'Date') => {
  if (!date) return `${fieldName} is required`;
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} must be a valid date`;
  }
  
  return null;
};

/**
 * Validate age
 */
export const validateAge = (birthDate, minAge = 0, maxAge = 120) => {
  if (!birthDate) return 'Birth date is required';
  
  const today = new Date();
  const birth = new Date(birthDate);
  
  if (birth > today) {
    return 'Birth date cannot be in the future';
  }
  
  const age = Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
  
  if (age < minAge) {
    return `Age must be at least ${minAge} years`;
  }
  
  if (age > maxAge) {
    return `Age cannot exceed ${maxAge} years`;
  }
  
  return null;
};

/**
 * Validate Ethiopian ID number
 */
export const isValidEthiopianId = (id) => {
  if (!id) return false;
  
  // Remove spaces and convert to uppercase
  const cleaned = id.replace(/\s/g, '').toUpperCase();
  
  // Ethiopian ID format: 2 letters + 6 digits + 1 letter
  const pattern = /^[A-Z]{2}\d{6}[A-Z]$/;
  
  return pattern.test(cleaned);
};

/**
 * Validate file upload
 */
export const validateFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = []) => {
  const errors = [];
  
  if (!file) {
    errors.push('File is required');
    return { isValid: false, errors };
  }
  
  if (file.size > maxSize) {
    errors.push(`File size must not exceed ${Math.floor(maxSize / (1024 * 1024))}MB`);
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach(rule => {
      if (typeof rule === 'function') {
        const error = rule(value);
        if (error) {
          if (!errors[field]) errors[field] = [];
          errors[field].push(error);
        }
      }
    });
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};