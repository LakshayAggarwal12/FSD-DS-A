import React from 'react';
import AttendanceManager from '../../components/admin/AttendanceManager';

export default function Attendance() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <AttendanceManager
        onAttendanceSaved={() => {
          window.dispatchEvent(new Event('portal-data-updated'));
        }}
      />
    </div>
  );
}
