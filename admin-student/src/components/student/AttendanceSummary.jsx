import React from 'react';
import { colors, radii, shadows, typography } from '../../utils/theme';
import StatusBadge from '../common/StatusBadge';
import { formatPercentage } from '../../utils/calculations';
import { CalendarCheckIcon, AlertTriangleIcon, CheckIcon, XIcon } from '../common/Icons';

export default function AttendanceSummary({ stats }) {
  const { totalClasses, presentCount, missedCount, percentage, subjectStats = [] } = stats;

  const isLowAttendance = totalClasses > 0 && percentage < 75;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overall Attendance Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Attendance Rate */}
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${isLowAttendance ? colors.dangerBorder : colors.slate200}`,
            borderRadius: radii.lg,
            padding: '20px',
            boxShadow: shadows.sm,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Overall Attendance</span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: isLowAttendance ? colors.dangerLight : colors.blueLight,
                color: isLowAttendance ? colors.danger : colors.blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CalendarCheckIcon size={16} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: isLowAttendance ? colors.danger : colors.navy,
                fontFamily: typography.fontFamily
              }}
            >
              {formatPercentage(percentage)}
            </span>
            <StatusBadge type={isLowAttendance ? 'danger' : 'success'} size="sm">
              {isLowAttendance ? 'Below 75%' : 'Satisfactory'}
            </StatusBadge>
          </div>
          <span style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Based on {totalClasses} scheduled lectures
          </span>
        </div>

        {/* Total Classes */}
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
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Total Lectures</span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: colors.slate100,
                color: colors.slate700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CalendarCheckIcon size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.navy }}>
            {totalClasses}
          </div>
          <span style={{ ...typography.bodySmall, marginTop: '6px' }}>
            Total lecture sessions recorded
          </span>
        </div>

        {/* Classes Attended */}
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
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Attended Sessions</span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: colors.successLight,
                color: colors.success,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckIcon size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.success }}>
            {presentCount}
          </div>
          <span style={{ ...typography.bodySmall, marginTop: '6px', color: colors.success }}>
            Marked present in classroom
          </span>
        </div>

        {/* Classes Missed */}
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
            <span style={{ ...typography.caption, fontSize: '12px', color: colors.slate600 }}>Missed Sessions</span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: colors.dangerLight,
                color: colors.danger,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <XIcon size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.danger }}>
            {missedCount}
          </div>
          <span style={{ ...typography.bodySmall, marginTop: '6px', color: colors.danger }}>
            Unexcused lecture absences
          </span>
        </div>
      </div>

      {/* Low Attendance Alert if < 75% */}
      {isLowAttendance && (
        <div
          style={{
            backgroundColor: colors.warningLight,
            border: `1px solid ${colors.warningBorder}`,
            borderRadius: radii.md,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <AlertTriangleIcon size={20} color={colors.warning} />
          <div style={{ fontSize: '13px', color: colors.slate800 }}>
            <strong>Attendance Warning:</strong> Your aggregate attendance is currently below the mandatory institutional requirement of <strong>75%</strong>. Please contact your department academic advisor.
          </div>
        </div>
      )}

      {/* Subject-wise breakdown table */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '24px',
          boxShadow: shadows.sm
        }}
      >
        <h3 style={{ ...typography.h3, margin: '0 0 16px 0' }}>
          Subject-Wise Attendance Breakdown
        </h3>

        <div style={{ overflowX: 'auto', border: `1px solid ${colors.slate200}`, borderRadius: radii.md }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: typography.fontFamily,
              fontSize: '13px'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: colors.slate50, borderBottom: `1px solid ${colors.slate200}` }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>
                  Course Subject
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600, width: '120px' }}>
                  Total Sessions
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600, width: '110px' }}>
                  Attended
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600, width: '110px' }}>
                  Missed
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.slate600, width: '150px' }}>
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {subjectStats.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: colors.slate500 }}>
                    No subject records logged yet.
                  </td>
                </tr>
              ) : (
                subjectStats.map((item, idx) => {
                  const isSubjectLow = item.percentage < 75;
                  return (
                    <tr
                      key={item.subject}
                      style={{
                        borderBottom: idx < subjectStats.length - 1 ? `1px solid ${colors.slate100}` : 'none'
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: colors.slate900 }}>
                        {item.subject}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.slate700 }}>
                        {item.total}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.success, fontWeight: '600' }}>
                        {item.attended}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.danger, fontWeight: '600' }}>
                        {item.missed}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span
                          style={{
                            fontWeight: '700',
                            color: isSubjectLow ? colors.danger : colors.success,
                            padding: '3px 8px',
                            borderRadius: radii.sm,
                            backgroundColor: isSubjectLow ? colors.dangerLight : colors.successLight
                          }}
                        >
                          {formatPercentage(item.percentage)}
                        </span>
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
