export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  criteria: PasswordCriteria;
}

interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function validatePassword(password: string): PasswordValidationResult {
  const criteria: PasswordCriteria = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const errors: string[] = [];

  if (!criteria.hasMinLength) {
    errors.push("Password must contain at least 8 characters");
  }
  if (!criteria.hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!criteria.hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!criteria.hasNumber) {
    errors.push("Password must contain at least one number");
  }
  if (!criteria.hasSpecialChar) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
    criteria,
  };
}

export function isPasswordDifferent(
  oldPassword: string,
  newPassword: string,
): boolean {
  return oldPassword !== newPassword;
}

export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
): PasswordValidationResult {
  const errors: string[] = [];

  if (currentPassword === newPassword) {
    errors.push("New password must be different from the current one");
  }

  // Validate new password
  const validationResult = validatePassword(newPassword);
  if (!validationResult.isValid) {
    errors.push(...validationResult.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
    criteria: validationResult.criteria,
  };
}
