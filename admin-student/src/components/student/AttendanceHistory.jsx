import React, { useState, useMemo } from 'react';
import { colors, radii, shadows, typography } from '../../utils/theme';
import StatusBadge from '../common/StatusBadge';
import Input from '../common/Input';
import DataTable from '../common/DataTable';
import { formatDate } from '../../utils/calculations';
import { CalendarCheckIcon } from '../common/Icons';

export default function AttendanceHistory({ records = [] }) {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc'

  // Extract distinct subjects from student's records
  const subjects = useMemo(() => {
    return ['All', ...Array.from(new Set(records.map((r) => r.subject))).filter(Boolean).sort()];
  }, [records]);

  // Filter and sort records
  const processedRecords = useMemo(() => {
    let result = records.filter((r) => selectedSubject === 'All' || r.subject === selectedSubject);

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [records, selectedSubject, sortOrder]);

  const columns = [
    {
      header: 'Session Date',
      key: 'date',
      width: '160px',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarCheckIcon size={14} color={colors.slate400} />
          <span style={{ fontWeight: '600', color: colors.slate900 }}>
            {formatDate(row.date)}
          </span>
        </div>
      )
    },
    {
      header: 'Course Subject',
      key: 'subject',
      render: (row) => (
        <span style={{ fontWeight: '500', color: colors.slate800 }}>
          {row.subject}
        </span>
      )
    },
    {
      header: 'Batch & Section',
      key: 'cohort',
      width: '180px',
      render: (row) => (
        <span style={{ fontSize: '12px', color: colors.slate600 }}>
          Batch {row.batch} • Sec {row.section}
        </span>
      )
    },
    {
      header: 'Attendance Status',
      key: 'status',
      width: '140px',
      align: 'right',
      render: (row) => (
        <StatusBadge type={row.status === 'Present' ? 'present' : 'absent'} size="md">
          {row.status}
        </StatusBadge>
      )
    }
  ];

  return (
    <div
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate200}`,
        borderRadius: radii.lg,
        padding: '24px',
        boxShadow: shadows.sm
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h3 style={{ ...typography.h3, margin: 0 }}>Chronological Attendance Log</h3>
          <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
            Comprehensive log of all individual class sessions and recorded presence.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '220px' }}>
            <Input
              name="subjectFilter"
              type="select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Subjects' : s}
                </option>
              ))}
            </Input>
          </div>

          <div style={{ width: '160px' }}>
            <Input
              name="sortOrder"
              type="select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ marginBottom: 0 }}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </Input>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={processedRecords}
        emptyMessage="No attendance sessions recorded yet"
        emptySubtext="When your faculty records attendance, your logs will appear here immediately."
      />
    </div>
  );
}
