import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredSession, saveStoredSession, clearStoredSession, getStudents, initializeStorage } from '../services/storageService';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  email: 'admin@college.edu',
  password: 'admin123',
  name: 'Dean of Academic Affairs',
  role: 'admin'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize storage seeds and verify existing stored session on app mount
  useEffect(() => {
    async function setup() {
      await initializeStorage();
      const existing = getStoredSession();
      if (existing) {
        setUser(existing);
      }
      setLoading(false);
    }
    setup();
  }, []);

  const login = useCallback((identifier, password) => {
    if (!identifier || !password) {
      return { success: false, error: 'Please enter both your email/ID and password.' };
    }

    const cleanId = identifier.trim().toLowerCase();
    const cleanPw = password.trim();

    // 1. Check Admin Credentials
    if (cleanId === ADMIN_CREDENTIALS.email.toLowerCase() && cleanPw === ADMIN_CREDENTIALS.password) {
      const adminSession = {
        id: 'ADMIN-001',
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: 'admin'
      };
      setUser(adminSession);
      saveStoredSession(adminSession);
      return { success: true, user: adminSession };
    }

    // 2. Check Student Credentials against dynamic students dataset
    const students = getStudents();
    const student = students.find(s => 
      (s.email?.trim().toLowerCase() === cleanId || s.rollNumber?.trim().toLowerCase() === cleanId) &&
      s.password?.trim() === cleanPw
    );

    if (student) {
      const studentSession = {
        ...student,
        role: 'student'
      };
      setUser(studentSession);
      saveStoredSession(studentSession);
      return { success: true, user: studentSession };
    }

    return {
      success: false,
      error: 'Invalid email/roll number or password. Please verify your credentials.'
    };
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    const existing = getStoredSession();
    if (existing && existing.role === 'student') {
      const students = getStudents();
      const updated = students.find(s => s.id === existing.id);
      if (updated) {
        const refreshed = { ...updated, role: 'student' };
        setUser(refreshed);
        saveStoredSession(refreshed);
      } else {
        // Student was deleted while logged in
        logout();
      }
    }
  }, [logout]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    login,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
