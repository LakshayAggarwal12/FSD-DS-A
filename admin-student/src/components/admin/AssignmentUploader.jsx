import React, { useState, useEffect, useRef } from 'react';
import {
  getAssignments,
  addAssignment,
  deleteAssignment,
  getAssignmentPdf,
  getSubjects,
  getStudents
} from '../../services/storageService';
import { validatePdfFile, formatFileSize } from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import { colors, radii, shadows, typography, transitions } from '../../utils/theme';
import Button from '../common/Button';
import Input from '../common/Input';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ConfirmDialog from '../common/ConfirmDialog';
import PdfViewer from '../student/PdfViewer';
import {
  FileTextIcon,
  UploadIcon,
  EyeIcon,
  TrashIcon,
  XIcon,
  CheckIcon
} from '../common/Icons';

export default function AssignmentUploader() {
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState(() => getAssignments());
  const [subjects] = useState(() => getSubjects());
  const [batches] = useState(() => {
    const stus = getStudents();
    return Array.from(new Set(stus.map((s) => s.batch))).filter(Boolean).sort();
  });

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(() => {
    const subjs = getSubjects();
    return subjs[0]?.name || '';
  });
  const [batch, setBatch] = useState(() => {
    const stus = getStudents();
    const uniqueBatches = Array.from(new Set(stus.map((s) => s.batch))).filter(Boolean).sort();
    return uniqueBatches[0] || '';
  });
  const [section, setSection] = useState('All');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  // PDF Viewer Modal State
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [viewingPdfData, setViewingPdfData] = useState(null);

  // Delete Confirmation State
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);


  // Handle File Input Change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validatePdfFile(file);
    if (!validation.isValid) {
      setFileError(validation.error);
      setSelectedFile(null);
      setFileDataUrl(null);
      return;
    }

    setFileError(null);
    setSelectedFile(file);

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result);
    };
    reader.onerror = () => {
      setFileError('Failed to read the selected file.');
    };
    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setFileDataUrl(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Submit / Save Assignment
  const handleSaveAssignment = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!title.trim()) errors.title = 'Assignment title is required';
    if (!subject) errors.subject = 'Please select a subject';
    if (!batch) errors.batch = 'Please select target batch';
    if (!description.trim()) errors.description = 'Instructions/description required';
    if (!selectedFile || !fileDataUrl) errors.file = 'Please upload a PDF document';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setUploading(true);

    try {
      const assignmentId = `asg-${Date.now()}`;
      const newAssignment = {
        id: assignmentId,
        title: title.trim(),
        subject,
        batch,
        section,
        description: description.trim(),
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
        uploadDate: new Date().toISOString().split('T')[0]
      };

      const updated = await addAssignment(newAssignment, fileDataUrl);
      setAssignments(updated);

      showToast('Assignment uploaded successfully.', 'success');

      // Reset form
      setTitle('');
      setDescription('');
      handleClearFile();
      setFormErrors({});
    } catch (err) {
      console.error('Error saving assignment:', err);
      showToast('Could not save assignment. Please check available browser storage.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle View PDF
  const handleOpenPdf = async (assignment) => {
    setViewingAssignment(assignment);
    const pdf = await getAssignmentPdf(assignment.id);
    setViewingPdfData(pdf);
  };


  // Handle Delete Assignment
  const handleConfirmDelete = async () => {
    if (!assignmentToDelete) return;
    try {
      const updated = await deleteAssignment(assignmentToDelete.id);
      setAssignments(updated);
      showToast('Assignment deleted successfully.', 'success');
    } catch (err) {
      console.error('Error deleting assignment:', err);
      showToast('Failed to delete assignment.', 'error');
    } finally {
      setAssignmentToDelete(null);
    }
  };

  // Columns for assignments list
  const columns = [
    {
      header: 'Title & File',
      key: 'title',
      render: (row) => (
        <div>
          <div style={{ fontWeight: '600', color: colors.slate900, marginBottom: '2px' }}>
            {row.title}
          </div>
          <div style={{ fontSize: '12px', color: colors.slate500, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileTextIcon size={13} color={colors.blue} />
            <span>{row.fileName}</span>
            <span>•</span>
            <span>{row.fileSize}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Subject',
      key: 'subject',
      render: (row) => <StatusBadge type="info" size="sm">{row.subject}</StatusBadge>
    },
    {
      header: 'Target Audience',
      key: 'audience',
      render: (row) => (
        <div style={{ fontSize: '12px', color: colors.slate700 }}>
          <div>Batch: <strong>{row.batch}</strong></div>
          <div style={{ color: colors.slate500 }}>
            Section: {row.section === 'All' ? 'All Sections' : `Section ${row.section}`}
          </div>
        </div>
      )
    },
    {
      header: 'Uploaded Date',
      key: 'uploadDate',
      width: '120px',
      render: (row) => <span style={{ fontSize: '13px', color: colors.slate600 }}>{row.uploadDate}</span>
    },
    {
      header: 'Actions',
      key: 'actions',
      width: '160px',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenPdf(row)}
            icon={<EyeIcon size={14} />}
            title="Open embedded PDF preview"
          >
            View
          </Button>
          <Button
            variant="dangerOutline"
            size="sm"
            onClick={() => setAssignmentToDelete(row)}
            icon={<TrashIcon size={14} />}
            title="Delete assignment"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Upload Form Card */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '24px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: radii.md,
              backgroundColor: colors.blueLight,
              color: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UploadIcon size={18} />
          </div>
          <div>
            <h3 style={{ ...typography.h3, margin: 0 }}>Upload Course Assignment</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Publish course problem sets, term projects, or reading materials in PDF format.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveAssignment}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {/* Title */}
            <div style={{ gridColumn: 'span 2' }}>
              <Input
                label="Assignment Title"
                placeholder="e.g. Assignment 3: Relational Query Optimization and B-Tree Indexing"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (formErrors.title) setFormErrors((p) => ({ ...p, title: null }));
                }}
                required
                error={formErrors.title}
              />
            </div>

            {/* Subject */}
            <Input
              label="Subject"
              type="select"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (formErrors.subject) setFormErrors((p) => ({ ...p, subject: null }));
              }}
              required
              error={formErrors.subject}
            >
              {subjects.map((s) => (
                <option key={s.code} value={s.name}>
                  {s.code} - {s.name}
                </option>
              ))}
            </Input>

            {/* Target Batch */}
            <Input
              label="Intended Batch"
              type="select"
              value={batch}
              onChange={(e) => {
                setBatch(e.target.value);
                if (formErrors.batch) setFormErrors((p) => ({ ...p, batch: null }));
              }}
              required
              error={formErrors.batch}
            >
              {batches.map((b) => (
                <option key={b} value={b}>
                  Batch {b}
                </option>
              ))}
            </Input>

            {/* Target Section */}
            <Input
              label="Class / Section Audience"
              type="select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              helperText="Only students matching this section can see this assignment."
            >
              <option value="All">All Sections (Entire Batch)</option>
              <option value="A">Section A Only</option>
              <option value="B">Section B Only</option>
              <option value="C">Section C Only</option>
            </Input>

            {/* Instructions */}
            <div style={{ gridColumn: 'span 2' }}>
              <Input
                label="Instructions & Submission Guidelines"
                type="textarea"
                rows={3}
                placeholder="Specify requirements, grading rubric, acceptable formats, and deadline details..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (formErrors.description) setFormErrors((p) => ({ ...p, description: null }));
                }}
                required
                error={formErrors.description}
              />
            </div>

            {/* PDF File Upload Zone */}
            <div style={{ gridColumn: 'span 2', marginBottom: '16px' }}>
              <label style={{ ...typography.caption, fontSize: '12px', color: colors.slate700, fontWeight: '600', display: 'flex', gap: '4px', marginBottom: '6px' }}>
                <span>Attach Assignment Document (PDF Only, Max 5MB)</span>
                <span style={{ color: colors.danger, fontWeight: '700' }}>*</span>
              </label>

              <div
                style={{
                  border: `2px dashed ${fileError ? colors.danger : selectedFile ? colors.blue : colors.slate300}`,
                  borderRadius: radii.lg,
                  padding: '24px',
                  backgroundColor: selectedFile ? colors.blueLight : colors.slate50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textAlign: 'center',
                  transition: transitions.fast,
                  position: 'relative'
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="pdf-file-input"
                />

                {!selectedFile ? (
                  <>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: colors.white,
                        boxShadow: shadows.sm,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.blue
                      }}
                    >
                      <UploadIcon size={22} />
                    </div>
                    <div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose PDF File
                      </Button>
                      <p style={{ ...typography.bodySmall, margin: '6px 0 0 0' }}>
                        Supports PDF files up to 5 MB in size.
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      maxWidth: '480px',
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.blueBorder}`,
                      padding: '12px 16px',
                      borderRadius: radii.md,
                      boxShadow: shadows.sm
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', minWidth: 0 }}>
                      <FileTextIcon size={24} color={colors.blue} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: colors.slate900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {selectedFile.name}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.slate500 }}>
                          Size: {formatFileSize(selectedFile.size)} • PDF Document
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Replace
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFile}
                        title="Remove file"
                      >
                        <XIcon size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {fileError && (
                <div style={{ color: colors.danger, fontSize: '12px', fontWeight: '500', marginTop: '6px' }}>
                  {fileError}
                </div>
              )}
              {formErrors.file && (
                <div style={{ color: colors.danger, fontSize: '12px', fontWeight: '500', marginTop: '6px' }}>
                  {formErrors.file}
                </div>
              )}
            </div>

            {/* Preview Banner before Saving */}
            {selectedFile && title && (
              <div
                style={{
                  gridColumn: 'span 2',
                  backgroundColor: colors.slate50,
                  border: `1px solid ${colors.slate200}`,
                  borderRadius: radii.md,
                  padding: '14px 18px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '600', color: colors.slate500, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Preview Before Saving:
                </div>
                <div style={{ fontWeight: '600', color: colors.slate900 }}>
                  {title}
                </div>
                <div style={{ fontSize: '13px', color: colors.slate600, marginTop: '2px' }}>
                  {subject} • Batch {batch} • {section === 'All' ? 'All Sections' : `Section ${section}`}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <Button
              variant="outline"
              onClick={() => {
                setTitle('');
                setDescription('');
                handleClearFile();
                setFormErrors({});
              }}
            >
              Reset Form
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={uploading}
              icon={<CheckIcon size={16} />}
            >
              {uploading ? 'Storing Assignment...' : 'Save Assignment'}
            </Button>
          </div>
        </form>
      </div>

      {/* Uploaded Assignments Table */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '24px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ ...typography.h3, margin: 0 }}>Institutional Assignment Repository</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Listing all active problem sets, downloadable documents, and target student cohorts.
            </p>
          </div>
          <StatusBadge type="navy" size="md">
            Total: {assignments.length}
          </StatusBadge>
        </div>

        <DataTable
          columns={columns}
          data={assignments}
          emptyMessage="No assignments uploaded yet"
          emptySubtext="Use the form above to upload your first course PDF document."
        />
      </div>

      {/* Embedded PDF Viewer Modal */}
      {viewingAssignment && (
        <PdfViewer
          assignment={viewingAssignment}
          pdfDataUrl={viewingPdfData}
          onClose={() => {
            setViewingAssignment(null);
            setViewingPdfData(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!assignmentToDelete}
        onClose={() => setAssignmentToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to delete "${assignmentToDelete?.title}"?`}
        confirmText="Confirm Delete"
        confirmVariant="danger"
      >
        <div
          style={{
            backgroundColor: colors.slate100,
            padding: '12px',
            borderRadius: radii.md,
            fontSize: '12px',
            color: colors.slate700,
            marginTop: '8px'
          }}
        >
          <div>Subject: <strong>{assignmentToDelete?.subject}</strong></div>
          <div>Audience: Batch {assignmentToDelete?.batch} ({assignmentToDelete?.section})</div>
          <div>File: {assignmentToDelete?.fileName} ({assignmentToDelete?.fileSize})</div>
        </div>
      </ConfirmDialog>
    </div>
  );
}
