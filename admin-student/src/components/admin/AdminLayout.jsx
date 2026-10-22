import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import AddStudentModal from './AddStudentModal';
import { colors } from '../../utils/theme';

export default function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Compute page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/attendance')) return 'Institutional Attendance Management';
    if (path.includes('/admin/assignments')) return 'Course Assignments & Learning Material';
    if (path.includes('/admin/delete-student')) return 'Student Directory & Enrollment';
    if (path.includes('/admin/add-student')) return 'Add Student Profile';
    return 'University Administration Overview';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.bg }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenAddStudent={() => setIsAddStudentOpen(true)}
      />

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          pageTitle={getPageTitle()}
          showMenuButton={true}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', boxSizing: 'border-box' }}>
          <Outlet context={{ onOpenAddStudent: () => setIsAddStudentOpen(true) }} />
        </main>
      </div>

      {/* Global Add Student Modal */}
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onStudentAdded={() => {
          // Trigger a custom event so active pages refresh their data
          window.dispatchEvent(new Event('portal-data-updated'));
        }}
      />
    </div>
  );
}
