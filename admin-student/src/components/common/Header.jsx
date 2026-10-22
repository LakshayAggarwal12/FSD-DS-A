import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { resetDemoData } from '../../services/storageService';
import { colors, radii, shadows, typography, transitions } from '../../utils/theme';
import StatusBadge from './StatusBadge';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';
import { LogOutIcon, MenuIcon, RefreshCwIcon } from './Icons';

export default function Header({
  pageTitle = 'Dashboard',
  onToggleSidebar = null,
  showMenuButton = false
}) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    await resetDemoData();
    setShowResetConfirm(false);
    setResetting(false);
    showToast('Demo data reset to original seed state.', 'info');
    // Refresh page state
    window.location.reload();
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.slate200}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: shadows.sm
      }}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showMenuButton && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.slate200}`,
              borderRadius: radii.md,
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.slate700,
              cursor: 'pointer'
            }}
          >
            <MenuIcon size={20} />
          </button>
        )}
        <div>
          <h1
            style={{
              ...typography.h2,
              fontSize: '18px',
              margin: 0,
              color: colors.slate900,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: Reset Data, User Profile & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Reset Demo Data button */}
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          title="Reset database to demo seed data"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: colors.slate50,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.md,
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: '500',
            color: colors.slate600,
            cursor: 'pointer',
            transition: transitions.fast
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.slate100;
            e.currentTarget.style.color = colors.slate900;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.slate50;
            e.currentTarget.style.color = colors.slate600;
          }}
        >
          <RefreshCwIcon size={13} />
          <span className="hide-on-mobile">Reset Seed Data</span>
        </button>

        {/* User Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderLeft: `1px solid ${colors.slate200}`,
            paddingLeft: '16px'
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: user?.role === 'admin' ? colors.navy : colors.blue,
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                ...typography.body,
                fontSize: '13px',
                fontWeight: '600',
                color: colors.slate900,
                lineHeight: 1.2
              }}
            >
              {user?.name || 'Authorized User'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <StatusBadge
                type={user?.role === 'admin' ? 'navy' : 'info'}
                size="sm"
              >
                {user?.role === 'admin' ? 'Administrator' : `Roll: ${user?.rollNumber || 'Student'}`}
              </StatusBadge>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          icon={<LogOutIcon size={14} />}
          title="Sign out of your session"
        >
          <span className="hide-on-mobile">Logout</span>
        </Button>
      </div>

      {/* Confirmation Dialog for Resetting Seed Data */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Demo Data"
        message="Are you sure you want to restore the initial demo seed data? All newly added students, updated attendance sessions, and uploaded assignments will be returned to initial sample state."
        confirmText={resetting ? 'Resetting...' : 'Reset to Seed'}
        confirmVariant="danger"
      />
    </header>
  );
}
