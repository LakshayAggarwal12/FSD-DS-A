import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StudentDirectory from '../../components/admin/StudentDirectory';

export default function DeleteStudent() {
  const outletContext = useOutletContext();
  const onOpenAddStudent = outletContext?.onOpenAddStudent;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <StudentDirectory
        onOpenAddStudent={onOpenAddStudent}
        onStudentDeleted={() => {
          window.dispatchEvent(new Event('portal-data-updated'));
        }}
      />
    </div>
  );
}
