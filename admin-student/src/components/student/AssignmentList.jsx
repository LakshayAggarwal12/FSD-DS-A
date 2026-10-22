import React, { useState, useEffect } from 'react';
import { getAssignments, getAssignmentPdf } from '../../services/storageService';
import { colors, radii, shadows, typography, transitions } from '../../utils/theme';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import PdfViewer from './PdfViewer';
import { FileTextIcon, EyeIcon } from '../common/Icons';

export default function AssignmentList({ student }) {
  const [eligibleAssignments, setEligibleAssignments] = useState([]);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);

  useEffect(() => {
    if (!student) return;

    const allAssignments = getAssignments();

    // STRICT SCOPING: Only assignments that match student's batch AND (section === 'All' or section === student.section)
    const filtered = allAssignments.filter((asg) => {
      const matchBatch = asg.batch === student.batch;
      const matchSection = asg.section === 'All' || asg.section === student.section;
      return matchBatch && matchSection;
    });

    setEligibleAssignments(filtered);
  }, [student]);

  const handleOpenPdf = async (assignment) => {
    setViewingAssignment(assignment);
    const pdfData = await getAssignmentPdf(assignment.id);
    setPdfDataUrl(pdfData);
  };


  const handleCloseViewer = () => {
    setViewingAssignment(null);
    setPdfDataUrl(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Banner */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '20px 24px',
          boxShadow: shadows.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h3 style={{ ...typography.h3, margin: 0 }}>Course Work & Assignments</h3>
          <p style={{ ...typography.bodySmall, margin: '3px 0 0 0' }}>
            Available problem sets assigned specifically to <strong>Batch {student?.batch}</strong> (Section {student?.section}).
          </p>
        </div>
        <StatusBadge type="info" size="md">
          {eligibleAssignments.length} Assignment{eligibleAssignments.length === 1 ? '' : 's'} Assigned
        </StatusBadge>
      </div>

      {/* Assignment Cards Grid */}
      {eligibleAssignments.length === 0 ? (
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: shadows.sm
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: colors.slate100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.slate400,
              margin: '0 auto 12px auto'
            }}
          >
            <FileTextIcon size={24} />
          </div>
          <h4 style={{ ...typography.h3, margin: '0 0 6px 0', color: colors.slate800 }}>
            No Active Assignments
          </h4>
          <p style={{ ...typography.bodySmall, maxWidth: '420px', margin: '0 auto' }}>
            There are currently no assignments uploaded for your batch and section. Check back later when faculty publishes new course tasks.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {eligibleAssignments.map((assignment) => (
            <div
              key={assignment.id}
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.slate200}`,
                borderRadius: radii.lg,
                padding: '20px',
                boxShadow: shadows.sm,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: transitions.normal
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.blueBorder;
                e.currentTarget.style.boxShadow = shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.slate200;
                e.currentTarget.style.boxShadow = shadows.sm;
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                  <StatusBadge type="info" size="sm">
                    {assignment.subject}
                  </StatusBadge>
                  <span style={{ fontSize: '11px', color: colors.slate500 }}>
                    {assignment.uploadDate}
                  </span>
                </div>

                <h4 style={{ ...typography.h3, fontSize: '16px', margin: '0 0 8px 0', color: colors.slate900 }}>
                  {assignment.title}
                </h4>

                <p
                  style={{
                    ...typography.body,
                    fontSize: '13px',
                    color: colors.slate600,
                    margin: '0 0 16px 0',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {assignment.description}
                </p>

                {/* PDF attachment indicator */}
                <div
                  style={{
                    backgroundColor: colors.slate50,
                    border: `1px solid ${colors.slate200}`,
                    borderRadius: radii.md,
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px'
                  }}
                >
                  <FileTextIcon size={18} color={colors.blue} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: colors.slate800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {assignment.fileName}
                    </div>
                    {assignment.fileSize && (
                      <div style={{ fontSize: '11px', color: colors.slate500 }}>
                        {assignment.fileSize}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* View Action */}
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleOpenPdf(assignment)}
                icon={<EyeIcon size={14} />}
              >
                View Assignment PDF
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Embedded In-App PDF Viewer */}
      {viewingAssignment && (
        <PdfViewer
          assignment={viewingAssignment}
          pdfDataUrl={pdfDataUrl}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}
