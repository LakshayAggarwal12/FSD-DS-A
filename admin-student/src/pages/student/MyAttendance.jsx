import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAttendance } from '../../services/storageService';
import { getStudentAttendanceStats } from '../../utils/calculations';
import AttendanceSummary from '../../components/student/AttendanceSummary';
import AttendanceHistory from '../../components/student/AttendanceHistory';
import { colors, radii, shadows, typography } from '../../utils/theme';

export default function MyAttendance() {
  const { user } = useAuth();

  // Query records strictly for the active session student
  const stats = useMemo(() => {
    if (!user) return { totalClasses: 0, presentCount: 0, missedCount: 0, percentage: 0, subjectStats: [], records: [] };
    const all = getAttendance();
    return getStudentAttendanceStats(user.id, all);
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Student Academic Identification Header */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '20px 24px',
          boxShadow: shadows.sm,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div>
          <h2 style={{ ...typography.h2, margin: '0 0 4px 0', fontSize: '18px' }}>
            Academic Attendance Record
          </h2>
          <p style={{ ...typography.bodySmall, margin: 0 }}>
            Official institutional presence log for <strong>{user?.name}</strong> (Roll: {user?.rollNumber}) • Batch {user?.batch} (Sec {user?.section})
          </p>
        </div>
      </div>

      {/* Aggregate Subject Summary */}
      <AttendanceSummary stats={stats} />

      {/* Detailed Chronological Attendance History */}
      <AttendanceHistory records={stats.records} />
    </div>
  );
}
