import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { colors, radii, typography, transitions } from '../../utils/theme';
import {
  DashboardIcon,
  UserPlusIcon,
  CalendarCheckIcon,
  FileTextIcon,
  TrashIcon,
  LogOutIcon,
  AcademicCapIcon,
  XIcon
} from './Icons';

export default function Sidebar({
  isOpen = true,
  onClose = () => {},
  onOpenAddStudent = () => {}
}) {
  const { logout } = useAuth();


  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <DashboardIcon size={18} />
    },
    {
      label: 'Add Student',
      action: onOpenAddStudent,
      icon: <UserPlusIcon size={18} />,
      isAction: true
    },
    {
      label: 'Attendance',
      path: '/admin/attendance',
      icon: <CalendarCheckIcon size={18} />
    },
    {
      label: 'Assignments',
      path: '/admin/assignments',
      icon: <FileTextIcon size={18} />
    },
    {
      label: 'Delete Student',
      path: '/admin/delete-student',
      icon: <TrashIcon size={18} />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 90,
            display: 'none' // toggled via CSS media query
          }}
        />
      )}

      <aside
        className={`portal-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          backgroundColor: colors.navy,
          color: colors.white,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 95,
          flexShrink: 0,
          borderRight: `1px solid ${colors.navyLight}`,
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
          }}
        >
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
              <div style={{ fontWeight: '700', fontSize: '15px', letterSpacing: '-0.01em' }}>
                Apex University
              </div>
              <div style={{ fontSize: '11px', color: colors.slate400, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Admin Portal
              </div>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.slate400,
              cursor: 'pointer',
              display: 'none',
              padding: '4px'
            }}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          <div style={{ ...typography.caption, color: colors.slate400, padding: '0 12px 8px 12px', fontSize: '11px' }}>
            Main Navigation
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item, index) => {
              if (item.isAction) {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: radii.md,
                        color: colors.slate300,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        fontFamily: typography.fontFamily,
                        transition: transitions.fast,
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = colors.white;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.slate300;
                      }}
                    >
                      <span style={{ display: 'flex', color: colors.blue }}>{item.icon}</span>
                      <span>{item.label}</span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontSize: '10px',
                          backgroundColor: 'rgba(37, 99, 235, 0.2)',
                          color: '#93c5fd',
                          padding: '2px 6px',
                          borderRadius: radii.sm,
                          fontWeight: '600'
                        }}
                      >
                        MODAL
                      </span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: radii.md,
                      color: isActive ? colors.white : colors.slate300,
                      backgroundColor: isActive ? colors.blue : 'transparent',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '500',
                      transition: transitions.fast
                    })}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.classList.contains('active')) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = colors.white;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.classList.contains('active')) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.slate300;
                      }
                    }}
                  >
                    <span style={{ display: 'flex' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Logout */}
        <div
          style={{
            padding: '16px 12px',
            borderTop: `1px solid rgba(255, 255, 255, 0.1)`
          }}
        >
          <button
            type="button"
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: radii.md,
              color: '#fca5a5',
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: typography.fontFamily,
              transition: transitions.fast
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
              e.currentTarget.style.color = '#fee2e2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            <LogOutIcon size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
