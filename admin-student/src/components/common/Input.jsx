import React, { useState } from 'react';
import { colors, radii, typography, transitions } from '../../utils/theme';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = null,
  helperText = null,
  disabled = false,
  readOnly = false,
  children, // for <select> options
  prefixIcon = null,
  suffixIcon = null,
  rows = 3,
  style = {},
  inputStyle = {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
    width: '100%',
    ...style
  };

  const labelStyle = {
    ...typography.caption,
    fontSize: '12px',
    color: colors.slate700,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const fieldWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: disabled ? colors.slate100 : colors.white,
    border: `1px solid ${error ? colors.danger : isFocused ? colors.blue : colors.slate300}`,
    borderRadius: radii.md,
    boxShadow: isFocused ? `0 0 0 3px ${error ? colors.dangerLight : colors.blueLight}` : 'none',
    transition: transitions.fast,
    boxSizing: 'border-box'
  };

  const commonFieldStyle = {
    width: '100%',
    fontFamily: typography.fontFamily,
    fontSize: '14px',
    color: disabled ? colors.slate500 : colors.textPrimary,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '9px 12px',
    paddingLeft: prefixIcon ? '36px' : '12px',
    paddingRight: suffixIcon ? '36px' : '12px',
    boxSizing: 'border-box',
    borderRadius: radii.md,
    cursor: disabled ? 'not-allowed' : 'text',
    ...inputStyle
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          <span>{label}</span>
          {required && <span style={{ color: colors.danger, fontWeight: '700' }}>*</span>}
        </label>
      )}

      <div style={fieldWrapperStyle}>
        {prefixIcon && (
          <div
            style={{
              position: 'absolute',
              left: '10px',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: isFocused ? colors.blue : colors.slate400
            }}
          >
            {prefixIcon}
          </div>
        )}

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              ...commonFieldStyle,
              cursor: disabled ? 'not-allowed' : 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              backgroundSize: '16px',
              paddingRight: '34px'
            }}
            {...props}
          >
            {children}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            rows={rows}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              ...commonFieldStyle,
              resize: 'vertical',
              minHeight: '80px'
            }}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={commonFieldStyle}
            {...props}
          />
        )}

        {suffixIcon && (
          <div
            style={{
              position: 'absolute',
              right: '10px',
              display: 'flex',
              alignItems: 'center',
              color: colors.slate400
            }}
          >
            {suffixIcon}
          </div>
        )}
      </div>

      {error ? (
        <span style={{ fontSize: '12px', color: colors.danger, fontWeight: '500' }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '12px', color: colors.slate500 }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
