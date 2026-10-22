import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { colors, typography } from '../../utils/theme';
import { AlertTriangleIcon } from './Icons';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  children = null
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="480px"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: colors.dangerLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: colors.danger
          }}
        >
          <AlertTriangleIcon size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ ...typography.body, margin: '0 0 12px 0', color: colors.slate800, fontWeight: '500' }}>
            {message}
          </p>
          {children}
        </div>
      </div>
    </Modal>
  );
}
