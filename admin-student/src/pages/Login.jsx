import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { colors, radii, shadows, typography, transitions } from '../utils/theme';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { AcademicCapIcon, EyeIcon, EyeOffIcon } from '../components/common/Icons';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your university email or student roll number.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your portal password.');
      return;
    }

    setSubmitting(true);
    const result = login(identifier, password);
    setSubmitting(false);

    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`, 'success');
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    } else {
      setError(result.error);
    }
  };

  // Quick fill helper for convenience
  const handleQuickFill = (email, pass) => {
    setIdentifier(email);
    setPassword(pass);
    setError(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.slate100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px', marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.slate600,
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 0',
            transition: transitions.fast
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.blue)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate600)}
        >
          ← Back to University Home
        </button>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: colors.white,
          borderRadius: radii.xl,
          boxShadow: shadows.lg,
          border: `1px solid ${colors.slate200}`,
          overflow: 'hidden',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >

        {/* Top University Branding Banner */}
        <div
          style={{
            backgroundColor: colors.navy,
            color: colors.white,
            padding: '32px 28px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: radii.lg,
              backgroundColor: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px auto',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <AcademicCapIcon size={32} />
          </div>
          <h2 style={{ ...typography.h2, color: colors.white, margin: '0 0 6px 0', fontSize: '22px' }}>
            Apex University
          </h2>
          <p style={{ ...typography.bodySmall, color: colors.slate300, margin: 0, letterSpacing: '0.02em' }}>
            Unified Student Management & Academic Information System
          </p>
        </div>

        {/* Login Form Body */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h3 style={{ ...typography.h3, margin: '0 0 4px 0', fontSize: '18px' }}>
              Institutional Sign In
            </h3>
            <p style={{ ...typography.bodySmall, margin: 0 }}>
              Access authorized admin operations or student course details.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: colors.dangerLight,
                border: `1px solid ${colors.dangerBorder}`,
                borderRadius: radii.md,
                padding: '12px 14px',
                color: colors.danger,
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address or Roll Number"
              name="identifier"
              type="text"
              placeholder="admin@college.edu or student01@college.edu"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <Input
              label="Portal Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your assigned password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suffixIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.slate400,
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              }
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting}
              style={{ marginTop: '8px' }}
            >
              {submitting ? 'Authenticating...' : 'Sign In to Portal'}
            </Button>
          </form>

          {/* Quick Fill Demo Credentials Section */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: `1px solid ${colors.slate200}`
            }}
          >
            <div style={{ ...typography.caption, fontSize: '11px', textAlign: 'center', marginBottom: '12px', color: colors.slate500 }}>
              Quick Demo Accounts (Click to Autofill)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@college.edu', 'admin123')}
                style={{
                  backgroundColor: colors.slate50,
                  border: `1px solid ${colors.slate300}`,
                  borderRadius: radii.md,
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: transitions.fast
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.slate100)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.slate50)}
              >
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.navy }}>
                  Admin Demo
                </div>
                <div style={{ fontSize: '11px', color: colors.slate600 }}>
                  admin@college.edu
                </div>
                <div style={{ fontSize: '10px', color: colors.slate400, marginTop: '2px' }}>
                  pass: admin123
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('student01@college.edu', 'student123')}
                style={{
                  backgroundColor: colors.slate50,
                  border: `1px solid ${colors.slate300}`,
                  borderRadius: radii.md,
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: transitions.fast
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.slate100)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.slate50)}
              >
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.blue }}>
                  Student Demo
                </div>
                <div style={{ fontSize: '11px', color: colors.slate600 }}>
                  student01@college.edu
                </div>
                <div style={{ fontSize: '10px', color: colors.slate400, marginTop: '2px' }}>
                  pass: student123
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security notice footer */}
      <div
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: colors.slate500,
          textAlign: 'center',
          maxWidth: '440px'
        }}
      >
        <span>Demo environment with client-side local persistence.</span>
      </div>
    </div>
  );
}
