import React, { useState, useMemo } from 'react';
import { getStudents, deleteStudent } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { colors, radii, shadows, typography } from '../../utils/theme';
import Button from '../common/Button';
import Input from '../common/Input';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import ConfirmDialog from '../common/ConfirmDialog';
import { SearchIcon, TrashIcon, UserPlusIcon, UsersIcon } from '../common/Icons';

export default function StudentDirectory({
  onStudentDeleted = () => {},
  onOpenAddStudent = () => {}
}) {
  const { showToast } = useToast();
  const [students, setStudents] = useState(() => getStudents());

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Deletion modal state
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Dynamic filter options
  const batches = useMemo(() => {
    return ['All', ...Array.from(new Set(students.map((s) => s.batch))).filter(Boolean).sort()];
  }, [students]);

  const sections = useMemo(() => {
    return ['All', ...Array.from(new Set(students.map((s) => s.section))).filter(Boolean).sort()];
  }, [students]);

  // Filtered dataset
  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return students.filter((s) => {
      const matchesSearch =
        !term ||
        s.name?.toLowerCase().includes(term) ||
        s.rollNumber?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term) ||
        s.registrationNumber?.toLowerCase().includes(term);

      const matchesBatch = selectedBatch === 'All' || s.batch === selectedBatch;
      const matchesSection = selectedSection === 'All' || s.section === selectedSection;

      return matchesSearch && matchesBatch && matchesSection;
    });
  }, [students, searchTerm, selectedBatch, selectedSection]);

  const handleConfirmDelete = () => {
    if (!studentToDelete) return;

    try {
      const { students: updatedList } = deleteStudent(studentToDelete.id);
      setStudents(updatedList);
      showToast('Student deleted successfully.', 'success');
      onStudentDeleted(studentToDelete);
    } catch (err) {
      console.error('Error deleting student:', err);
      showToast('Failed to delete student.', 'error');
    } finally {
      setStudentToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Roll Number',
      key: 'rollNumber',
      width: '130px',
      render: (row) => (
        <span style={{ fontWeight: '600', color: colors.slate900 }}>
          {row.rollNumber}
        </span>
      )
    },
    {
      header: 'Student Name',
      key: 'name',
      render: (row) => (
        <div>
          <div style={{ fontWeight: '600', color: colors.slate900 }}>{row.name}</div>
          <div style={{ fontSize: '11px', color: colors.slate500 }}>ID: {row.registrationNumber || row.id}</div>
        </div>
      )
    },
    {
      header: 'Course / Department',
      key: 'course',
      render: (row) => (
        <span style={{ fontSize: '13px', color: colors.slate700 }}>
          {row.course}
        </span>
      )
    },
    {
      header: 'Batch',
      key: 'batch',
      width: '110px',
      render: (row) => <StatusBadge type="info" size="sm">{row.batch}</StatusBadge>
    },
    {
      header: 'Section',
      key: 'section',
      width: '90px',
      render: (row) => <StatusBadge type="neutral" size="sm">Sec {row.section}</StatusBadge>
    },
    {
      header: 'Email / Username',
      key: 'email',
      render: (row) => (
        <span style={{ fontSize: '13px', color: colors.slate600 }}>
          {row.email}
        </span>
      )
    },
    {
      header: 'Action',
      key: 'action',
      width: '100px',
      align: 'right',
      render: (row) => (
        <Button
          variant="dangerOutline"
          size="sm"
          onClick={() => setStudentToDelete(row)}
          icon={<TrashIcon size={14} />}
          title="Delete student and cascade clean records"
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Search & Filter Toolbar */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '20px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ ...typography.h3, margin: 0 }}>Registered Student Directory</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Search across university cohorts, inspect records, or manage individual student enrollment.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={onOpenAddStudent}
            icon={<UserPlusIcon size={16} />}
          >
            Add New Student
          </Button>
        </div>

        {/* Filter controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}
        >
          {/* Search box */}
          <div style={{ gridColumn: 'span 2' }}>
            <Input
              name="search"
              placeholder="Search by student name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefixIcon={<SearchIcon size={16} />}
              style={{ marginBottom: 0 }}
            />
          </div>

          {/* Batch Filter */}
          <Input
            name="batchFilter"
            type="select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            style={{ marginBottom: 0 }}
          >
            {batches.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Batches' : `Batch ${b}`}
              </option>
            ))}
          </Input>

          {/* Section Filter */}
          <Input
            name="sectionFilter"
            type="select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            style={{ marginBottom: 0 }}
          >
            {sections.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Sections' : `Section ${s}`}
              </option>
            ))}
          </Input>
        </div>
      </div>

      {/* Table Results Card */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '20px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UsersIcon size={16} color={colors.slate500} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: colors.slate700 }}>
              Showing {filteredStudents.length} of {students.length} students
            </span>
          </div>

          {(searchTerm || selectedBatch !== 'All' || selectedSection !== 'All') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedBatch('All');
                setSelectedSection('All');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        <DataTable
          columns={columns}
          data={filteredStudents}
          emptyMessage="No students match the selected filters"
          emptySubtext="Try clearing your search term or selecting another cohort."
        />
      </div>

      {/* Confirmation Modal for Student Deletion */}
      <ConfirmDialog
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm Student Deletion"
        message={`Are you sure you want to permanently delete student "${studentToDelete?.name}"?`}
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
          <div>Roll Number: <strong>{studentToDelete?.rollNumber}</strong></div>
          <div>Registration No: {studentToDelete?.registrationNumber}</div>
          <div>Email: {studentToDelete?.email}</div>
          <div>Cohort: {studentToDelete?.course} ({studentToDelete?.batch}, Sec {studentToDelete?.section})</div>
          <div style={{ color: colors.danger, fontWeight: '500', marginTop: '6px' }}>
            Warning: This action will revoke their login credentials and permanently remove their recorded attendance history.
          </div>
        </div>
      </ConfirmDialog>
    </div>
  );
}
