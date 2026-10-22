import React from 'react';
import { colors, radii, shadows, typography } from '../../utils/theme';
import Button from '../common/Button';
import { DownloadIcon, XIcon, FileTextIcon } from '../common/Icons';

export default function PdfViewer({
  assignment,
  pdfDataUrl,
  onClose,
  title = 'Document Viewer'
}) {
  if (!assignment) return null;

  const handleDownload = () => {
    if (!pdfDataUrl) return;
    const link = document.createElement('a');
    link.href = pdfDataUrl;
    link.download = assignment.fileName || `${assignment.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '92vh',
          backgroundColor: colors.white,
          borderRadius: radii.lg,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: shadows.modal,
          overflow: 'hidden',
          border: `1px solid ${colors.slate200}`
        }}
      >
        {/* Viewer Top Toolbar */}
        <div
          style={{
            height: '60px',
            backgroundColor: colors.navy,
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.sm,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#93c5fd',
                flexShrink: 0
              }}
            >
              <FileTextIcon size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  ...typography.h3,
                  fontSize: '15px',
                  color: colors.white,
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {assignment.title}
              </div>
              <div style={{ fontSize: '11px', color: colors.slate300, display: 'flex', gap: '8px' }}>
                <span>{assignment.subject}</span>
                <span>•</span>
                <span>{assignment.fileName}</span>
                {assignment.fileSize && <span>({assignment.fileSize})</span>}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {pdfDataUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                icon={<DownloadIcon size={14} />}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: colors.white,
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                Download PDF
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              icon={<XIcon size={16} />}
              style={{
                color: colors.slate300,
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              Close
            </Button>
          </div>
        </div>

        {/* PDF Frame / Embed Display */}
        <div style={{ flex: 1, backgroundColor: colors.slate100, position: 'relative' }}>
          {pdfDataUrl ? (
            <iframe
              src={pdfDataUrl}
              title={assignment.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '24px',
                color: colors.slate500
              }}
            >
              <FileTextIcon size={48} color={colors.slate400} />
              <h4 style={{ ...typography.h3, margin: '16px 0 4px 0' }}>PDF Binary Unavailable</h4>
              <p style={{ ...typography.bodySmall, textAlign: 'center', maxWidth: '400px' }}>
                The preview data for this assignment could not be retrieved from local storage.
              </p>
              <Button variant="outline" size="sm" onClick={onClose} style={{ marginTop: '16px' }}>
                Back to Assignments
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
