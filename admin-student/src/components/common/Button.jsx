import React, { useState } from 'react';
import { colors, radii, typography, transitions } from '../../utils/theme';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'dangerOutline', 'outline', 'ghost', 'success'
  size = 'md', // 'sm', 'md', 'lg'
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  style = {},
  className = '',
  title = '',
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Size styling
  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: '13px',
      height: '32px',
      gap: '6px'
    },
    md: {
      padding: '8px 16px',
      fontSize: '14px',
      height: '38px',
      gap: '8px'
    },
    lg: {
      padding: '11px 22px',
      fontSize: '15px',
      height: '46px',
      gap: '10px'
    }
  };

  // Base styling
  let bg = colors.blue;
  let textColor = colors.white;
  let border = '1px solid transparent';
  let cursor = disabled ? 'not-allowed' : 'pointer';
  let opacity = disabled ? 0.6 : 1;

  if (variant === 'primary') {
    bg = isHovered && !disabled ? colors.blueHover : colors.blue;
    textColor = colors.white;
    border = '1px solid transparent';
  } else if (variant === 'secondary') {
    bg = isHovered && !disabled ? colors.slate200 : colors.slate100;
    textColor = colors.slate800;
    border = `1px solid ${colors.slate200}`;
  } else if (variant === 'outline') {
    bg = isHovered && !disabled ? colors.slate50 : 'transparent';
    textColor = colors.slate700;
    border = `1px solid ${colors.slate300}`;
  } else if (variant === 'danger') {
    bg = isHovered && !disabled ? colors.dangerHover : colors.danger;
    textColor = colors.white;
    border = '1px solid transparent';
  } else if (variant === 'dangerOutline') {
    bg = isHovered && !disabled ? colors.dangerLight : 'transparent';
    textColor = colors.danger;
    border = `1px solid ${colors.dangerBorder}`;
  } else if (variant === 'success') {
    bg = isHovered && !disabled ? colors.successHover : colors.success;
    textColor = colors.white;
    border = '1px solid transparent';
  } else if (variant === 'ghost') {
    bg = isHovered && !disabled ? colors.slate100 : 'transparent';
    textColor = colors.slate700;
    border = '1px solid transparent';
  }

  const combinedStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    borderRadius: radii.md,
    fontFamily: typography.fontFamily,
    fontWeight: '500',
    lineHeight: 1,
    cursor,
    opacity,
    backgroundColor: bg,
    color: textColor,
    border,
    transition: transitions.fast,
    transform: isActive && !disabled ? 'scale(0.98)' : 'none',
    boxSizing: 'border-box',
    textDecoration: 'none',
    userSelect: 'none',
    ...sizeStyles[size],
    ...style
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled}
      title={title}
      style={combinedStyle}
      className={className}
      {...props}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
}
