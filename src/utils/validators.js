// ─── Contact Form Validators ─────────────────────────────────

/**
 * Validate the entire contact form.
 * Returns { isValid: boolean, errors: Record<string, string> }
 */
export const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!data.state || data.state === 'All States') {
    errors.state = 'Please select your state.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!data.message || data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ─── Individual Validators ────────────────────────────────────

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone.replace(/[\s\-]/g, ''));
};

export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim().length > 0;
};
