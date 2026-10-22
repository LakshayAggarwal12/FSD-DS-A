import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getStudents, getAttendance, getAssignments, getSubjects } from '../../services/storageService';
import { colors, radii, shadows, typography } from '../../utils/theme';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import {
  UsersIcon,
  CalendarCheckIcon,
  FileTextIcon,
  UserPlusIcon
} from '../../components/common/Icons';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const onOpenAddStudent = outletContext?.onOpenAddStudent;

  const [students, setStudents] = useState(() => getStudents());
  const [attendance, setAttendance] = useState(() => getAttendance());
  const [assignments, setAssignments] = useState(() => getAssignments());
  const [subjects, setSubjects] = useState(() => getSubjects());

  const refreshData = useCallback(() => {
    setStudents(getStudents());
    setAttendance(getAttendance());
    setAssignments(getAssignments());
    setSubjects(getSubjects());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refreshData();
    window.addEventListener('portal-data-updated', handleUpdate);
    return () => window.removeEventListener('portal-data-updated', handleUpdate);
  }, [refreshData]);


  // Compute Batch & Section distribution
  const cohortDistribution = React.useMemo(() => {
    const map = {};
    students.forEach((s) => {
      const key = `${s.batch || 'General'} - Sec ${s.section || 'A'}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([cohort, count]) => ({ cohort, count }));
  }, [students]);

  // Compute recent attendance sessions (grouped by date + subject + batch + section)
  const recentSessions = React.useMemo(() => {
    const sessionMap = {};
    attendance.forEach((rec) => {
      const key = `${rec.date}_${rec.subject}_${rec.batch}_${rec.section}`;
      if (!sessionMap[key]) {
        sessionMap[key] = {
          date: rec.date,
          subject: rec.subject,
          batch: rec.batch,
          section: rec.section,
          present: 0,
          absent: 0,
          total: 0
        };
      }
      sessionMap[key].total += 1;
      if (rec.status === 'Present') {
        sessionMap[key].present += 1;
      } else {
        sessionMap[key].absent += 1;
      }
    });

    return Object.values(sessionMap)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [attendance]);

  // Compute recent assignments
  const recentAssignments = React.useMemo(() => {
    return [...assignments]
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      .slice(0, 4);
  }, [assignments]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Welcome & Quick Actions Bar */}
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
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ ...typography.h2, margin: '0 0 4px 0', fontSize: '20px' }}>
            Academic Administration Console
          </h2>
          <p style={{ ...typography.bodySmall, margin: 0 }}>
            Live status of enrolled student cohorts, attendance tracking, and digital course resources.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="outline"
            onClick={() => navigate('/admin/attendance')}
            icon={<CalendarCheckIcon size={16} />}
          >
            Mark Attendance
          </Button>
          <Button
            variant="primary"
            onClick={onOpenAddStudent}
            icon={<UserPlusIcon size={16} />}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Total Students */}
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '20px',
            boxShadow: shadows.sm
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Total Registered Students</span>
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
              <UsersIcon size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.navy }}>
            {students.length}
          </div>
          <div style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Across {cohortDistribution.length} distinct batch sections
          </div>
        </div>

        {/* Total Attendance Records */}
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '20px',
            boxShadow: shadows.sm
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Attendance Records</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.md,
                backgroundColor: colors.successLight,
                color: colors.success,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CalendarCheckIcon size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.success }}>
            {attendance.length}
          </div>
          <div style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Total individual presence logs saved
          </div>
        </div>

        {/* Total Assignments */}
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '20px',
            boxShadow: shadows.sm
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Uploaded Assignments</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.md,
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                color: colors.blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileTextIcon size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.navy }}>
            {assignments.length}
          </div>
          <div style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Active course PDFs in repository
          </div>
        </div>

        {/* Total Subjects */}
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '20px',
            boxShadow: shadows.sm
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Course Curriculum</span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: radii.md,
                backgroundColor: colors.slate100,
                color: colors.slate700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileTextIcon size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.navy }}>
            {subjects.length}
          </div>
          <div style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Accredited course modules
          </div>
        </div>
      </div>

      {/* Cohort Breakdown & Recent Activity Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Cohort Distribution Panel */}
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
            <h3 style={{ ...typography.h3, margin: 0 }}>Enrollment by Cohort & Section</h3>
            <StatusBadge type="info" size="sm">Live Roster</StatusBadge>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cohortDistribution.map((item) => (
              <div
                key={item.cohort}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: colors.slate50,
                  borderRadius: radii.md,
                  border: `1px solid ${colors.slate200}`
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: colors.slate800 }}>
                  Batch {item.cohort}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: colors.slate500 }}>
                    {item.count} student{item.count === 1 ? '' : 's'}
                  </span>
                  <div
                    style={{
                      height: '8px',
                      width: '60px',
                      backgroundColor: colors.slate200,
                      borderRadius: radii.full,
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, (item.count / students.length) * 100 * 2.5)}%`,
                        backgroundColor: colors.blue
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Uploaded Assignments */}
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
            <h3 style={{ ...typography.h3, margin: 0 }}>Recent Course Material</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/assignments')}
            >
              View All
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentAssignments.length === 0 ? (
              <div style={{ ...typography.bodySmall, textAlign: 'center', padding: '24px' }}>
                No assignments recorded yet.
              </div>
            ) : (
              recentAssignments.map((asg) => (
                <div
                  key={asg.id}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: colors.slate50,
                    borderRadius: radii.md,
                    border: `1px solid ${colors.slate200}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontWeight: '600', fontSize: '13px', color: colors.slate900 }}>
                      {asg.title}
                    </div>
                    <span style={{ fontSize: '11px', color: colors.slate500 }}>
                      {asg.uploadDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: colors.slate600, display: 'flex', gap: '8px' }}>
                    <span>{asg.subject}</span>
                    <span>•</span>
                    <span>Batch {asg.batch} ({asg.section === 'All' ? 'All Sections' : `Sec ${asg.section}`})</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Attendance Activity Table */}
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
            <h3 style={{ ...typography.h3, margin: 0 }}>Recent Attendance Activity Sessions</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Summary of the most recently recorded classroom lecture sessions.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/attendance')}
          >
            Manage Attendance
          </Button>
        </div>

        <div style={{ overflowX: 'auto', border: `1px solid ${colors.slate200}`, borderRadius: radii.md }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: typography.fontFamily }}>
            <thead>
              <tr style={{ backgroundColor: colors.slate50, borderBottom: `1px solid ${colors.slate200}` }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>Course Subject</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>Cohort</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>Enrolled</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>Present</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>Absent</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: colors.slate600 }}>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: colors.slate500 }}>
                    No classroom sessions recorded yet.
                  </td>
                </tr>
              ) : (
                recentSessions.map((s, idx) => {
                  const pct = Math.round((s.present / s.total) * 100);
                  return (
                    <tr
                      key={`${s.date}_${s.subject}_${idx}`}
                      style={{ borderBottom: idx < recentSessions.length - 1 ? `1px solid ${colors.slate100}` : 'none' }}
                    >
                      <td style={{ padding: '10px 14px', fontWeight: '600', color: colors.slate900 }}>{s.date}</td>
                      <td style={{ padding: '10px 14px', color: colors.slate800 }}>{s.subject}</td>
                      <td style={{ padding: '10px 14px', color: colors.slate600 }}>Batch {s.batch} (Sec {s.section})</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center', color: colors.slate700 }}>{s.total}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center', color: colors.success, fontWeight: '600' }}>{s.present}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'center', color: colors.danger, fontWeight: '600' }}>{s.absent}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <StatusBadge type={pct >= 75 ? 'success' : 'danger'} size="sm">
                          {pct}%
                        </StatusBadge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
