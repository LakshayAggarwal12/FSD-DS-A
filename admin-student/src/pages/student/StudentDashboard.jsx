import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAttendance } from '../../services/storageService';
import { getStudentAttendanceStats } from '../../utils/calculations';
import { colors, radii, shadows, typography } from '../../utils/theme';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import AttendanceSummary from '../../components/student/AttendanceSummary';
import {
  CalendarCheckIcon,
  FileTextIcon
} from '../../components/common/Icons';


export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Compute live attendance statistics for the logged in student
  const stats = useMemo(() => {
    if (!user) return { totalClasses: 0, presentCount: 0, missedCount: 0, percentage: 0, subjectStats: [] };
    const allAttendance = getAttendance();
    return getStudentAttendanceStats(user.id, allAttendance);
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Student Academic Identity Card */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '24px',
          boxShadow: shadows.sm,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: colors.blue,
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: '700'
            }}
          >
            {user?.name ? user.name.charAt(0) : 'S'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ ...typography.h2, margin: 0, fontSize: '20px' }}>
                {user?.name}
              </h2>
              <StatusBadge type="info" size="sm">
                Active Student
              </StatusBadge>
            </div>
            <div style={{ fontSize: '13px', color: colors.slate600, marginTop: '4px' }}>
              <span>Roll No: <strong>{user?.rollNumber}</strong></span>
              <span style={{ margin: '0 8px', color: colors.slate300 }}>|</span>
              <span>Reg: <strong>{user?.registrationNumber}</strong></span>
              <span style={{ margin: '0 8px', color: colors.slate300 }}>|</span>
              <span>{user?.email}</span>
            </div>
            <div style={{ fontSize: '12px', color: colors.slate500, marginTop: '2px' }}>
              {user?.course} • {user?.year} • Batch {user?.batch} (Section {user?.section})
            </div>
          </div>
        </div>

        {/* Quick Nav Shortcuts */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outline"
            onClick={() => navigate('/student/attendance')}
            icon={<CalendarCheckIcon size={16} />}
          >
            Detailed Attendance
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/student/assignments')}
            icon={<FileTextIcon size={16} />}
          >
            Course Assignments
          </Button>
        </div>
      </div>

      {/* Attendance Metrics & Subject Breakdown */}
      <AttendanceSummary stats={stats} />
    </div>
  );
}
