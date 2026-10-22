/**
 * Form and data validation helpers
 */

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validateStudentForm(formData, existingStudents = []) {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Full name is required';
  }

  if (!formData.rollNumber?.trim()) {
    errors.rollNumber = 'Roll number is required';
  } else {
    const rollTrim = formData.rollNumber.trim().toUpperCase();
    const isDup = existingStudents.some(
      s => s.rollNumber?.trim().toUpperCase() === rollTrim && s.id !== formData.id
    );
    if (isDup) {
      errors.rollNumber = 'This Roll Number is already registered';
    }
  }

  if (!formData.registrationNumber?.trim()) {
    errors.registrationNumber = 'Registration number is required';
  } else {
    const regTrim = formData.registrationNumber.trim().toUpperCase();
    const isDup = existingStudents.some(
      s => s.registrationNumber?.trim().toUpperCase() === regTrim && s.id !== formData.id
    );
    if (isDup) {
      errors.registrationNumber = 'This Registration Number is already registered';
    }
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  } else {
    const emailTrim = formData.email.trim().toLowerCase();
    const isDup = existingStudents.some(
      s => s.email?.trim().toLowerCase() === emailTrim && s.id !== formData.id
    );
    if (isDup) {
      errors.email = 'This email is already associated with another student';
    }
  }

  if (!formData.password?.trim()) {
    errors.password = 'Student password is required';
  } else if (formData.password.trim().length < 4) {
    errors.password = 'Password must be at least 4 characters';
  }

  if (!formData.course?.trim()) {
    errors.course = 'Please select a course / department';
  }

  if (!formData.year?.trim()) {
    errors.year = 'Please select year of study';
  }

  if (!formData.batch?.trim()) {
    errors.batch = 'Batch is required';
  }

  if (!formData.section?.trim()) {
    errors.section = 'Class section is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validatePdfFile(file, maxSizeBytes = 5 * 1024 * 1024) {
  if (!file) {
    return { isValid: false, error: 'Please select a PDF file to upload.' };
  }

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    return { isValid: false, error: 'Only PDF documents (.pdf) are permitted.' };
  }

  if (file.size > maxSizeBytes) {
    const sizeMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    return { isValid: false, error: `File size exceeds the ${sizeMb} MB limit.` };
  }

  return { isValid: true, error: null };
}

export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
