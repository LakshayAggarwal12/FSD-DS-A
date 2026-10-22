/**
 * Utility functions for attendance statistics and calculations.
 */

/**
 * Calculates overall attendance percentage.
 * Formula: (Number of Present Records / Total Attendance Records) * 100
 * Handles 0 total records cleanly without NaN.
 */
export function calculateAttendancePercentage(presentCount, totalCount) {
  if (!totalCount || totalCount <= 0) return 0;
  const pct = (presentCount / totalCount) * 100;
  return Math.round(pct * 10) / 10; // 1 decimal place
}

/**
 * Formats attendance percentage nicely with % sign.
 */
export function formatPercentage(percentage) {
  if (percentage === undefined || percentage === null || isNaN(percentage)) return '0.0%';
  return `${Number(percentage).toFixed(1)}%`;
}

/**
 * Calculates detailed statistics for a specific student given an array of all attendance records.
 */
export function getStudentAttendanceStats(studentId, attendanceRecords = []) {
  const studentRecords = attendanceRecords.filter(r => r.studentId === studentId);
  const totalClasses = studentRecords.length;
  const presentCount = studentRecords.filter(r => r.status === 'Present').length;
  const missedCount = totalClasses - presentCount;
  const percentage = calculateAttendancePercentage(presentCount, totalClasses);

  // Group by subject
  const subjectMap = {};
  studentRecords.forEach(record => {
    const subj = record.subject || 'General';
    if (!subjectMap[subj]) {
      subjectMap[subj] = {
        subject: subj,
        total: 0,
        attended: 0,
        missed: 0,
        percentage: 0
      };
    }
    subjectMap[subj].total += 1;
    if (record.status === 'Present') {
      subjectMap[subj].attended += 1;
    } else {
      subjectMap[subj].missed += 1;
    }
  });

  const subjectStats = Object.values(subjectMap).map(item => ({
    ...item,
    percentage: calculateAttendancePercentage(item.attended, item.total)
  }));

  return {
    totalClasses,
    presentCount,
    missedCount,
    percentage,
    records: studentRecords,
    subjectStats
  };
}

/**
 * Helper to format date strings like "2026-10-15" to readable "15 Oct 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[parseInt(parts[1], 10) - 1] || parts[1];
      const day = parts[2];
      return `${day} ${month} ${year}`;
    }
    return dateString;
  } catch {
    return dateString;
  }
}
