// Central design tokens and style utilities for consistent inline CSS styling

export const colors = {
  navy: '#0f172a',
  navyLight: '#1e293b',
  navyDark: '#020617',
  
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',

  blue: '#2563eb',
  blueHover: '#1d4ed8',
  blueLight: '#eff6ff',
  blueBorder: '#bfdbfe',

  success: '#16a34a',
  successHover: '#15803d',
  successLight: '#f0fdf4',
  successBorder: '#bbf7d0',

  danger: '#dc2626',
  dangerHover: '#b91c1c',
  dangerLight: '#fef2f2',
  dangerBorder: '#fecaca',

  warning: '#d97706',
  warningLight: '#fffbeb',
  warningBorder: '#fde68a',

  white: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b',
  border: '#e2e8f0',
  borderSubtle: '#f1f5f9',
  bg: '#f8fafc',
  surface: '#ffffff',
};

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  h1: { fontSize: '24px', fontWeight: '700', lineHeight: 1.25, color: colors.textPrimary },
  h2: { fontSize: '20px', fontWeight: '600', lineHeight: 1.3, color: colors.textPrimary },
  h3: { fontSize: '16px', fontWeight: '600', lineHeight: 1.4, color: colors.textPrimary },
  body: { fontSize: '14px', fontWeight: '400', lineHeight: 1.5, color: colors.textPrimary },
  bodySmall: { fontSize: '12px', fontWeight: '400', lineHeight: 1.4, color: colors.textMuted },
  caption: { fontSize: '11px', fontWeight: '500', letterSpacing: '0.04em', textTransform: 'uppercase', color: colors.slate500 },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
  modal: '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
};

export const radii = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

export const transitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease-in-out',
};
