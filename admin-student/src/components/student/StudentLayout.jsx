import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { resetDemoData } from '../../services/storageService';
import { colors, radii, shadows, typography, transitions } from '../../utils/theme';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import ConfirmDialog from '../common/ConfirmDialog';
import {
  AcademicCapIcon,
  DashboardIcon,
  CalendarCheckIcon,
  FileTextIcon,
  LogOutIcon,
  RefreshCwIcon,
  MenuIcon,
  XIcon
} from '../common/Icons';

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleReset = async () => {
    await resetDemoData();
    setShowResetConfirm(false);
    showToast('Demo data reset to original seed state.', 'info');
    window.location.reload();
  };

  const navLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: <DashboardIcon size={16} /> },
    { label: 'My Attendance', path: '/student/attendance', icon: <CalendarCheckIcon size={16} /> },
    { label: 'Assignments', path: '/student/assignments', icon: <FileTextIcon size={16} /> }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Top Main Navigation Bar */}
      <header
        style={{
          backgroundColor: colors.navy,
          color: colors.white,
          borderBottom: `1px solid ${colors.navyLight}`,
          position: 'sticky',
          top: 0,
          zIndex: 80,
          boxShadow: shadows.md
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: radii.md,
                backgroundColor: colors.blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.white
              }}
            >
              <AcademicCapIcon size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: colors.white }}>
                Apex University
              </div>
              <div style={{ fontSize: '10px', color: colors.slate400, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Student Academic Portal
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-student-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: radii.md,
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? colors.white : colors.slate300,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  textDecoration: 'none',
                  transition: transitions.fast
                })}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Reset Seed Data */}
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              title="Reset seed data"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: radii.md,
                padding: '6px 10px',
                fontSize: '11px',
                color: colors.slate300,
                cursor: 'pointer',
                transition: transitions.fast
              }}
            >
              <RefreshCwIcon size={12} />
              <span className="hide-on-mobile">Reset Seed</span>
            </button>

            {/* Logout */}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              icon={<LogOutIcon size={14} />}
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: colors.white
              }}
            >
              <span className="hide-on-mobile">Logout</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle student navigation"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: colors.white,
                padding: '6px',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '12px 24px 16px 24px',
              backgroundColor: colors.navyDark,
              borderTop: `1px solid ${colors.navyLight}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: radii.md,
                  fontSize: '14px',
                  color: isActive ? colors.white : colors.slate300,
                  backgroundColor: isActive ? colors.blue : 'transparent',
                  textDecoration: 'none'
                })}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Student Academic Details Sub-Bar */}
        <div
          style={{
            backgroundColor: colors.navyDark,
            borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
            padding: '8px 24px',
            fontSize: '12px',
            color: colors.slate300
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '600', color: colors.white }}>{user?.name}</span>
              <span style={{ color: colors.slate500 }}>•</span>
              <span>Roll: <strong style={{ color: colors.white }}>{user?.rollNumber}</strong></span>
              <span style={{ color: colors.slate500 }}>•</span>
              <span className="hide-on-mobile">Reg: {user?.registrationNumber}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{user?.course}</span>
              <span style={{ color: colors.slate500 }}>•</span>
              <span>Batch {user?.batch} (Sec {user?.section})</span>
              <StatusBadge type="info" size="sm">
                {user?.year}
              </StatusBadge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Outlet Body */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '24px 24px 48px 24px', boxSizing: 'border-box' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${colors.slate200}`,
          backgroundColor: colors.white,
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '12px',
          color: colors.slate500
        }}
      >
        Apex University • Student Management System • Academic Session 2026
      </footer>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Demo Data"
        message="Reset all student profiles, attendance ledgers, and assignments back to default demo seeds?"
        confirmText="Reset Now"
        confirmVariant="danger"
      />
    </div>
  );
}
