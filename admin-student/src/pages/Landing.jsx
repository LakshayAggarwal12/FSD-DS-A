import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { colors, radii, shadows, typography, transitions } from '../utils/theme';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import {
  AcademicCapIcon,
  DashboardIcon,
  CalendarCheckIcon,
  FileTextIcon,
  UsersIcon,
  CheckIcon,
  UserPlusIcon,
  UploadIcon,
  EyeIcon,
  LogOutIcon
} from '../components/common/Icons';

export default function Landing() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('admin');

  // One-click demo launcher helper
  const handleLaunchDemo = (email, pass, role) => {
    const res = login(email, pass);
    if (res.success) {
      showToast(`Logged in as ${role === 'admin' ? 'Administrator' : 'Student (Aarav Sharma)'}!`, 'success');
      navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Top Floating Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${colors.slate200}`,
          boxShadow: shadows.sm
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: radii.md,
                backgroundColor: colors.navy,
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)'
              }}
            >
              <AcademicCapIcon size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '17px', color: colors.slate900, letterSpacing: '-0.02em' }}>
                Apex University
              </div>
              <div style={{ fontSize: '11px', color: colors.slate500, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: '600' }}>
                Student Management System
              </div>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a
              href="#features"
              style={{ textDecoration: 'none', color: colors.slate700, fontSize: '14px', fontWeight: '500', transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate700)}
            >
              System Features
            </a>
            <a
              href="#roles"
              style={{ textDecoration: 'none', color: colors.slate700, fontSize: '14px', fontWeight: '500', transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate700)}
            >
              Dual Roles
            </a>
            <a
              href="#demo-access"
              style={{ textDecoration: 'none', color: colors.slate700, fontSize: '14px', fontWeight: '500', transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate700)}
            >
              Demo Credentials
            </a>
          </nav>

          {/* Header Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user ? (
              <Button
                variant="primary"
                onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
                icon={<DashboardIcon size={16} />}
              >
                Go to {user.role === 'admin' ? 'Admin Console' : 'Student Dashboard'}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleLaunchDemo('admin@college.edu', 'admin123', 'admin')}
                  size="sm"
                  icon={<CheckIcon size={14} />}
                >
                  Live Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 60px 24px',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Institutional Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              backgroundColor: colors.blueLight,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: radii.full,
              marginBottom: '24px',
              animation: 'badgeGlow 3s infinite ease-in-out'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: colors.blue
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: '600', color: colors.blue }}>
              Official Institutional Portal • Academic Session 2026-2027
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              ...typography.h1,
              fontSize: '46px',
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              color: colors.navy,
              maxWidth: '900px',
              margin: '0 auto 20px auto',
              animation: 'heroFadeUp 0.6s ease-out'
            }}
          >
            Unified Academic Administration & Student Information System
          </h1>

          {/* Subheading */}
          <p
            style={{
              ...typography.body,
              fontSize: '18px',
              color: colors.slate600,
              maxWidth: '780px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
              animation: 'heroFadeUp 0.8s ease-out'
            }}
          >
            A high-performance collegiate management platform with role-based environments for <strong>Administrators</strong> and <strong>Students</strong>. Featuring persistent session attendance tracking, integrated PDF courseware distribution, and zero-latency client storage.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '60px',
              animation: 'heroFadeUp 1s ease-out'
            }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleLaunchDemo('admin@college.edu', 'admin123', 'admin')}
              icon={<UsersIcon size={18} />}
            >
              Launch Admin Console
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleLaunchDemo('student01@college.edu', 'student123', 'student')}
              icon={<AcademicCapIcon size={18} />}
            >
              Launch Student Portal
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Traditional Sign In →
            </Button>
          </div>

          {/* Hero Interactive UI Mockup Showcase */}
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto',
              position: 'relative',
              borderRadius: radii.xl,
              backgroundColor: colors.white,
              border: `1px solid ${colors.slate200}`,
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              overflow: 'hidden',
              animation: 'heroFadeUp 1.1s ease-out'
            }}
          >
            {/* Mock Window Top Bar */}
            <div
              style={{
                height: '42px',
                backgroundColor: colors.slate100,
                borderBottom: `1px solid ${colors.slate200}`,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '8px'
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <div
                style={{
                  margin: '0 auto',
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.slate300}`,
                  borderRadius: radii.sm,
                  padding: '3px 20px',
                  fontSize: '11px',
                  color: colors.slate600,
                  fontFamily: 'monospace'
                }}
              >
                https://portal.apex.edu/admin/dashboard
              </div>
            </div>

            {/* Mock Dashboard Preview Content */}
            <div style={{ padding: '24px', backgroundColor: colors.bg }}>
              {/* Top stats row in mockup */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: colors.white, padding: '14px', borderRadius: radii.md, border: `1px solid ${colors.slate200}`, textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: colors.slate500, fontWeight: '600', textTransform: 'uppercase' }}>Enrolled Students</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: colors.navy }}>30 Active</div>
                </div>
                <div style={{ backgroundColor: colors.white, padding: '14px', borderRadius: radii.md, border: `1px solid ${colors.slate200}`, textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: colors.slate500, fontWeight: '600', textTransform: 'uppercase' }}>Attendance Ratio</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: colors.success }}>89.4%</div>
                </div>
                <div style={{ backgroundColor: colors.white, padding: '14px', borderRadius: radii.md, border: `1px solid ${colors.slate200}`, textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: colors.slate500, fontWeight: '600', textTransform: 'uppercase' }}>Curriculum</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: colors.blue }}>7 Modules</div>
                </div>
                <div style={{ backgroundColor: colors.white, padding: '14px', borderRadius: radii.md, border: `1px solid ${colors.slate200}`, textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: colors.slate500, fontWeight: '600', textTransform: 'uppercase' }}>PDF Courseware</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: colors.slate800 }}>3 Active</div>
                </div>
              </div>

              {/* Simulated active attendance table */}
              <div style={{ backgroundColor: colors.white, borderRadius: radii.md, border: `1px solid ${colors.slate200}`, overflow: 'hidden', textAlign: 'left' }}>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.slate200}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: colors.slate800 }}>
                    Live Classroom Attendance Roll: Batch 2022-2026 (Section A)
                  </span>
                  <StatusBadge type="success" size="sm">Session Synced</StatusBadge>
                </div>
                <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.slate100}` }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: colors.slate800 }}>CS2201 • Aarav Sharma</div>
                  <div style={{ fontSize: '12px', color: colors.slate500 }}>Data Structures & Algorithms</div>
                  <StatusBadge type="present" size="sm">Present</StatusBadge>
                </div>
                <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: colors.slate800 }}>CS2202 • Priya Nair</div>
                  <div style={{ fontSize: '12px', color: colors.slate500 }}>Data Structures & Algorithms</div>
                  <StatusBadge type="present" size="sm">Present</StatusBadge>
                </div>
              </div>
            </div>

            {/* Floating Floating Badges */}
            <div
              className="hide-on-mobile"
              style={{
                position: 'absolute',
                top: '55px',
                right: '-25px',
                backgroundColor: colors.white,
                padding: '12px 18px',
                borderRadius: radii.lg,
                boxShadow: shadows.lg,
                border: `1px solid ${colors.slate200}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'floatSlow 4s infinite ease-in-out',
                zIndex: 10
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors.success }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.slate900 }}>Batch 2022-2026</div>
                <div style={{ fontSize: '11px', color: colors.slate500 }}>88.5% Aggregate Presence</div>
              </div>
            </div>

            <div
              className="hide-on-mobile"
              style={{
                position: 'absolute',
                bottom: '30px',
                left: '-25px',
                backgroundColor: colors.navy,
                color: colors.white,
                padding: '12px 18px',
                borderRadius: radii.lg,
                boxShadow: shadows.lg,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'floatSlow 4s infinite ease-in-out reverse',
                zIndex: 10
              }}
            >
              <FileTextIcon size={18} color="#93c5fd" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.white }}>IndexedDB PDF Engine</div>
                <div style={{ fontSize: '11px', color: colors.slate300 }}>Persistent in-app reader</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Institutional Features */}
      <section id="features" style={{ padding: '80px 24px', backgroundColor: colors.white }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ ...typography.caption, color: colors.blue, fontWeight: '700', fontSize: '12px' }}>
              Built For Campus Scale
            </span>
            <h2 style={{ ...typography.h2, fontSize: '32px', margin: '8px 0 12px 0', color: colors.navy }}>
              Core Functional Capabilities
            </h2>
            <p style={{ ...typography.body, color: colors.slate600, maxWidth: '640px', margin: '0 auto' }}>
              Engineered with clean architectural separation, client-side persistence, and role-enforced route protection.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                padding: '28px',
                borderRadius: radii.lg,
                border: `1px solid ${colors.slate200}`,
                backgroundColor: colors.slate50,
                transition: transitions.fast
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blueBorder;
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.slate200;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: radii.md,
                  backgroundColor: colors.blueLight,
                  color: colors.blue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <CalendarCheckIcon size={24} />
              </div>
              <h3 style={{ ...typography.h3, fontSize: '18px', margin: '0 0 10px 0', color: colors.slate900 }}>
                Attendance Sessions & Ledger
              </h3>
              <p style={{ ...typography.body, fontSize: '14px', color: colors.slate600, margin: 0, lineHeight: 1.5 }}>
                Filter by Batch, Section, Subject, and Date. Prevent duplicate sessions and automatically load existing records for seamless editing.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                padding: '28px',
                borderRadius: radii.lg,
                border: `1px solid ${colors.slate200}`,
                backgroundColor: colors.slate50,
                transition: transitions.fast
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blueBorder;
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.slate200;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: radii.md,
                  backgroundColor: colors.successLight,
                  color: colors.success,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <FileTextIcon size={24} />
              </div>
              <h3 style={{ ...typography.h3, fontSize: '18px', margin: '0 0 10px 0', color: colors.slate900 }}>
                IndexedDB PDF Courseware
              </h3>
              <p style={{ ...typography.body, fontSize: '14px', color: colors.slate600, margin: 0, lineHeight: 1.5 }}>
                Upload syllabus and assignment PDFs with 5MB validation. Store documents securely in browser IndexedDB with an integrated in-app viewer.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                padding: '28px',
                borderRadius: radii.lg,
                border: `1px solid ${colors.slate200}`,
                backgroundColor: colors.slate50,
                transition: transitions.fast
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blueBorder;
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.slate200;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: radii.md,
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: colors.blue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <UsersIcon size={24} />
              </div>
              <h3 style={{ ...typography.h3, fontSize: '18px', margin: '0 0 10px 0', color: colors.slate900 }}>
                Enrollment & Cascading Cleanup
              </h3>
              <p style={{ ...typography.body, fontSize: '14px', color: colors.slate600, margin: 0, lineHeight: 1.5 }}>
                Register students with duplicate Roll Number and Email validation. Deleting a student cascades and purges credentials and attendance records cleanly.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              style={{
                padding: '28px',
                borderRadius: radii.lg,
                border: `1px solid ${colors.slate200}`,
                backgroundColor: colors.slate50,
                transition: transitions.fast
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blueBorder;
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.slate200;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: radii.md,
                  backgroundColor: colors.slate200,
                  color: colors.slate800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <AcademicCapIcon size={24} />
              </div>
              <h3 style={{ ...typography.h3, fontSize: '18px', margin: '0 0 10px 0', color: colors.slate900 }}>
                Real-Time Attendance Formula
              </h3>
              <p style={{ ...typography.body, fontSize: '14px', color: colors.slate600, margin: 0, lineHeight: 1.5 }}>
                Calculated strictly via <code style={{ backgroundColor: colors.slate200, padding: '2px 4px', borderRadius: '4px' }}>(Present / Total) × 100</code> with safe zero handling and mandatory 75% threshold alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Roles Breakdown Section */}
      <section id="roles" style={{ padding: '80px 24px', backgroundColor: colors.bg }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ ...typography.caption, color: colors.blue, fontWeight: '700', fontSize: '12px' }}>
              Role-Based Architecture
            </span>
            <h2 style={{ ...typography.h2, fontSize: '32px', margin: '8px 0 12px 0', color: colors.navy }}>
              Tailored Environments for Campus Stakeholders
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
            {/* Admin Console Card */}
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: radii.xl,
                border: `1px solid ${colors.slate200}`,
                padding: '36px',
                boxShadow: shadows.md,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: radii.md, backgroundColor: colors.navy, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UsersIcon size={22} />
                  </div>
                  <div>
                    <h3 style={{ ...typography.h3, margin: 0, fontSize: '18px' }}>Administrator Console</h3>
                    <span style={{ fontSize: '12px', color: colors.slate500 }}>Department Deans & Faculty Staff</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Campus dashboard with live enrollment & attendance analytics',
                    'Modal and form registration with duplicate roll/email rejection',
                    'Classroom attendance manager with Present/Absent toggles',
                    'Comprehensive Saved Attendance Sessions Ledger with Review/Edit',
                    'PDF assignment publisher with target batch & section audience scoping',
                    'Student directory with multi-field search and cascade deletion'
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: colors.slate700 }}>
                      <span style={{ color: colors.blue, flexShrink: 0, marginTop: '2px' }}><CheckIcon size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => handleLaunchDemo('admin@college.edu', 'admin123', 'admin')}
              >
                Access Admin Console Demo →
              </Button>
            </div>

            {/* Student Portal Card */}
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: radii.xl,
                border: `1px solid ${colors.slate200}`,
                padding: '36px',
                boxShadow: shadows.md,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: radii.md, backgroundColor: colors.blue, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AcademicCapIcon size={22} />
                  </div>
                  <div>
                    <h3 style={{ ...typography.h3, margin: 0, fontSize: '18px' }}>Student Academic Portal</h3>
                    <span style={{ fontSize: '12px', color: colors.slate500 }}>Enrolled Undergraduate & Graduate Cohorts</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Personal academic identity card (Roll No, Registration No, Batch, Sec)',
                    'Live attendance metrics: Overall %, Total, Attended, and Missed lectures',
                    'Subject-wise breakdown with automatic low-attendance (< 75%) warning',
                    'Chronological session logs with subject filtering and date sorting',
                    'Batch-scoped problem sets and assignments repository',
                    'Embedded in-app PDF document viewer with native download support'
                  ].map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: colors.slate700 }}>
                      <span style={{ color: colors.success, flexShrink: 0, marginTop: '2px' }}><CheckIcon size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                fullWidth
                onClick={() => handleLaunchDemo('student01@college.edu', 'student123', 'student')}
              >
                Access Student Portal Demo →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section id="demo-access" style={{ padding: '80px 24px', backgroundColor: colors.white }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ ...typography.caption, color: colors.blue, fontWeight: '700', fontSize: '12px' }}>
            Instant Evaluation
          </span>
          <h2 style={{ ...typography.h2, fontSize: '32px', margin: '8px 0 12px 0', color: colors.navy }}>
            Pre-Seeded Demo Accounts
          </h2>
          <p style={{ ...typography.body, color: colors.slate600, maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Click below to instantly log in with pre-configured institutional profiles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Admin Box */}
            <div
              style={{
                backgroundColor: colors.slate50,
                border: `1px solid ${colors.slate200}`,
                borderRadius: radii.lg,
                padding: '24px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <StatusBadge type="navy" size="md">Administrator Role</StatusBadge>
                <span style={{ fontSize: '12px', color: colors.slate500 }}>Dean of Academic Affairs</span>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '4px' }}>
                Email: <strong>admin@college.edu</strong>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '20px' }}>
                Password: <strong>admin123</strong>
              </div>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleLaunchDemo('admin@college.edu', 'admin123', 'admin')}
              >
                Log In As Admin
              </Button>
            </div>

            {/* Student 1 Box */}
            <div
              style={{
                backgroundColor: colors.slate50,
                border: `1px solid ${colors.slate200}`,
                borderRadius: radii.lg,
                padding: '24px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <StatusBadge type="info" size="md">Student Role (CSE)</StatusBadge>
                <span style={{ fontSize: '12px', color: colors.slate500 }}>Roll: CS2201 • Sec A</span>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '4px' }}>
                Email: <strong>student01@college.edu</strong>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '20px' }}>
                Password: <strong>student123</strong>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleLaunchDemo('student01@college.edu', 'student123', 'student')}
              >
                Log In As Student (Aarav)
              </Button>
            </div>

            {/* Student 2 Box */}
            <div
              style={{
                backgroundColor: colors.slate50,
                border: `1px solid ${colors.slate200}`,
                borderRadius: radii.lg,
                padding: '24px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <StatusBadge type="info" size="md">Student Role (IT)</StatusBadge>
                <span style={{ fontSize: '12px', color: colors.slate500 }}>Roll: IT2201 • Sec A</span>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '4px' }}>
                Email: <strong>varun.chopra@college.edu</strong>
              </div>
              <div style={{ fontSize: '14px', color: colors.slate700, marginBottom: '20px' }}>
                Password: <strong>student123</strong>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleLaunchDemo('varun.chopra@college.edu', 'student123', 'student')}
              >
                Log In As Student (Varun)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          backgroundColor: colors.navy,
          color: colors.slate300,
          padding: '40px 24px',
          borderTop: `1px solid ${colors.navyLight}`
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.sm,
                backgroundColor: colors.blue,
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AcademicCapIcon size={18} />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: colors.white, fontSize: '14px' }}>
                Apex University
              </div>
              <div style={{ fontSize: '11px', color: colors.slate400 }}>
                Student Management System • Session 2026-2027
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
            <span
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer', color: colors.slate300, transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.white)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate300)}
            >
              Portal Login
            </span>
            <span
              onClick={() => handleLaunchDemo('admin@college.edu', 'admin123', 'admin')}
              style={{ cursor: 'pointer', color: colors.slate300, transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.white)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate300)}
            >
              Admin Dashboard
            </span>
            <span
              onClick={() => handleLaunchDemo('student01@college.edu', 'student123', 'student')}
              style={{ cursor: 'pointer', color: colors.slate300, transition: transitions.fast }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.white)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.slate300)}
            >
              Student Portal
            </span>
          </div>

          <div style={{ fontSize: '12px', color: colors.slate400 }}>
            Client-Side Architecture with localStorage & IndexedDB.
          </div>
        </div>
      </footer>
    </div>
  );
}
