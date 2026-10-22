import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AssignmentList from '../../components/student/AssignmentList';

export default function StudentAssignments() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <AssignmentList student={user} />
    </div>
  );
}
