import React from 'react';
import { colors, radii, typography } from '../../utils/theme';

export default function StatusBadge({
  type = 'default', // 'present', 'absent', 'info', 'warning', 'neutral', 'success'
  children,
  size = 'md', // 'sm', 'md'
  style = {}
}) {
  let bg = colors.slate100;
  let text = colors.slate700;
  let border = colors.slate200;

  const normalized = (typeof children === 'string' ? children.toLowerCase() : type.toLowerCase());

  if (normalized === 'present' || type === 'present' || type === 'success') {
    bg = colors.successLight;
    text = colors.success;
    border = colors.successBorder;
  } else if (normalized === 'absent' || type === 'absent' || type === 'danger') {
    bg = colors.dangerLight;
    text = colors.danger;
    border = colors.dangerBorder;
  } else if (type === 'warning') {
    bg = colors.warningLight;
    text = colors.warning;
    border = colors.warningBorder;
  } else if (type === 'info' || type === 'blue') {
    bg = colors.blueLight;
    text = colors.blue;
    border = colors.blueBorder;
  } else if (type === 'navy') {
    bg = colors.slate100;
    text = colors.navy;
    border = colors.slate300;
  }

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: size === 'sm' ? '2px 8px' : '4px 10px',
    borderRadius: radii.full,
    fontSize: size === 'sm' ? '11px' : '12px',
    fontWeight: '600',
    fontFamily: typography.fontFamily,
    backgroundColor: bg,
    color: text,
    border: `1px solid ${border}`,
    lineHeight: 1.3,
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    ...style
  };

  return <span style={badgeStyle}>{children}</span>;
}
