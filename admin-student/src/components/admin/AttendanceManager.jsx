import React, { useState, useEffect, useMemo } from 'react';
import { getStudents, getSubjects, getAttendance, recordAttendanceSession } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { colors, radii, typography, shadows, transitions } from '../../utils/theme';
import Button from '../common/Button';
import Input from '../common/Input';
import StatusBadge from '../common/StatusBadge';
import { CalendarCheckIcon, CheckIcon, XIcon, UsersIcon } from '../common/Icons';

export default function AttendanceManager({ onAttendanceSaved = () => {} }) {
  const { showToast } = useToast();

  const [students] = useState(() => getStudents());
  const [subjects] = useState(() => getSubjects());

  // Session selector states
  const [selectedBatch, setSelectedBatch] = useState(() => {
    const stus = getStudents();
    const batches = Array.from(new Set(stus.map((s) => s.batch))).sort();
    return batches[0] || '';
  });

  const [selectedSection, setSelectedSection] = useState(() => {
    const stus = getStudents();
    const sections = Array.from(new Set(stus.map((s) => s.section))).sort();
    return sections[0] || '';
  });

  const [selectedSubject, setSelectedSubject] = useState(() => {
    const subjs = getSubjects();
    return subjs[0]?.name || '';
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  // All recorded attendance sessions
  const [allAttendance, setAllAttendance] = useState(() => getAttendance());

  // Loaded students and their live statuses
  const [loadedSession, setLoadedSession] = useState(null); // { batch, section, subject, date, isExisting }
  const [studentRows, setStudentRows] = useState([]);
  const [saving, setSaving] = useState(false);

  // Compute aggregated list of all saved attendance sessions
  const savedSessionsList = useMemo(() => {
    const map = {};
    allAttendance.forEach((rec) => {
      const key = `${rec.date}_${rec.subject}_${rec.batch}_${rec.section}`;
      if (!map[key]) {
        map[key] = {
          date: rec.date,
          subject: rec.subject,
          batch: rec.batch,
          section: rec.section,
          present: 0,
          absent: 0,
          total: 0
        };
      }
      map[key].total += 1;
      if (rec.status === 'Present') {
        map[key].present += 1;
      } else {
        map[key].absent += 1;
      }
    });

    return Object.values(map).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [allAttendance]);



  // Compute unique batches and sections based on student data
  const availableBatches = useMemo(() => {
    return Array.from(new Set(students.map((s) => s.batch))).filter(Boolean).sort();
  }, [students]);

  const availableSections = useMemo(() => {
    const filtered = selectedBatch
      ? students.filter((s) => s.batch === selectedBatch)
      : students;
    return Array.from(new Set(filtered.map((s) => s.section))).filter(Boolean).sort();
  }, [students, selectedBatch]);

  // Load students for the selected criteria
  const handleLoadStudents = () => {
    if (!selectedBatch || !selectedSection || !selectedSubject || !selectedDate) {
      showToast('Please select batch, section, subject, and date first.', 'error');
      return;
    }

    const matchingStudents = students.filter(
      (s) => s.batch === selectedBatch && s.section === selectedSection
    );

    if (matchingStudents.length === 0) {
      showToast(`No students found for Batch ${selectedBatch}, Section ${selectedSection}.`, 'warning');
      setStudentRows([]);
      setLoadedSession(null);
      return;
    }

    // Check if attendance already recorded for this exact combination
    const existingRecords = getAttendance();
    const sessionRecords = existingRecords.filter(
      (r) =>
        r.batch === selectedBatch &&
        r.section === selectedSection &&
        r.subject === selectedSubject &&
        r.date === selectedDate
    );

    const recordByStudentId = new Map(sessionRecords.map((r) => [r.studentId, r.status]));
    const isExisting = sessionRecords.length > 0;

    const rows = matchingStudents.map((s) => {
      // If already recorded, use saved status; otherwise default to 'Present'
      const status = recordByStudentId.get(s.id) || 'Present';
      return {
        studentId: s.id,
        rollNumber: s.rollNumber,
        studentName: s.name,
        section: s.section,
        status: status
      };
    });

    setStudentRows(rows);
    setLoadedSession({
      batch: selectedBatch,
      section: selectedSection,
      subject: selectedSubject,
      date: selectedDate,
      isExisting
    });

    if (isExisting) {
      showToast(`Loaded existing attendance record for ${selectedSubject} (${selectedDate}).`, 'info');
    } else {
      showToast(`Loaded ${rows.length} students. Ready to record attendance.`, 'info');
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setStudentRows((prev) =>
      prev.map((row) => (row.studentId === studentId ? { ...row, status: newStatus } : row))
    );
  };

  const handleMarkAll = (status) => {
    setStudentRows((prev) => prev.map((row) => ({ ...row, status })));
  };

  const handleSaveAttendance = () => {
    if (!loadedSession || studentRows.length === 0) {
      showToast('Please load students and mark attendance before saving.', 'error');
      return;
    }

    setSaving(true);

    try {
      const updated = recordAttendanceSession({
        batch: loadedSession.batch,
        section: loadedSession.section,
        subject: loadedSession.subject,
        date: loadedSession.date,
        studentStatuses: studentRows
      });

      setAllAttendance(updated);
      showToast('Attendance record saved successfully.', 'success');
      onAttendanceSaved();

      // Refresh loaded session state to show as saved/existing
      setLoadedSession((prev) => ({ ...prev, isExisting: true }));
    } catch (err) {
      console.error('Failed to save attendance:', err);
      showToast('Failed to save attendance. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLoadSpecificSession = (session) => {
    setSelectedBatch(session.batch);
    setSelectedSection(session.section);
    setSelectedSubject(session.subject);
    setSelectedDate(session.date);

    const matchingStudents = students.filter(
      (s) => s.batch === session.batch && s.section === session.section
    );

    const sessionRecords = allAttendance.filter(
      (r) =>
        r.batch === session.batch &&
        r.section === session.section &&
        r.subject === session.subject &&
        r.date === session.date
    );

    const recordByStudentId = new Map(sessionRecords.map((r) => [r.studentId, r.status]));

    const rows = matchingStudents.map((s) => ({
      studentId: s.id,
      rollNumber: s.rollNumber,
      studentName: s.name,
      section: s.section,
      status: recordByStudentId.get(s.id) || 'Present'
    }));

    setStudentRows(rows);
    setLoadedSession({
      batch: session.batch,
      section: session.section,
      subject: session.subject,
      date: session.date,
      isExisting: true
    });

    showToast(`Loaded ${session.subject} session for ${session.date}.`, 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Compute live present / absent counters
  const presentCount = studentRows.filter((r) => r.status === 'Present').length;
  const absentCount = studentRows.filter((r) => r.status === 'Absent').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Session Selection Panel */}
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '24px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
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
            <CalendarCheckIcon size={18} />
          </div>
          <div>
            <h3 style={{ ...typography.h3, margin: 0 }}>Configure Attendance Session</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Select target batch, section, course subject, and session date to load registered students.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'flex-end'
          }}
        >
          {/* Batch */}
          <Input
            label="Academic Batch"
            name="batch"
            type="select"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            style={{ marginBottom: 0 }}
          >
            {availableBatches.map((b) => (
              <option key={b} value={b}>
                Batch {b}
              </option>
            ))}
          </Input>

          {/* Section */}
          <Input
            label="Class / Section"
            name="section"
            type="select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            style={{ marginBottom: 0 }}
          >
            {availableSections.map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </Input>

          {/* Subject */}
          <Input
            label="Subject"
            name="subject"
            type="select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ marginBottom: 0 }}
          >
            {subjects.map((subj) => (
              <option key={subj.code} value={subj.name}>
                {subj.code} - {subj.name}
              </option>
            ))}
          </Input>

          {/* Date */}
          <Input
            label="Session Date"
            name="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ marginBottom: 0 }}
          />

          {/* Load Students Button */}
          <div style={{ height: '38px' }}>
            <Button
              variant="primary"
              onClick={handleLoadStudents}
              fullWidth
              icon={<UsersIcon size={16} />}
            >
              Load Students
            </Button>
          </div>
        </div>
      </div>

      {/* Attendance Sheet */}
      {loadedSession && (
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate200}`,
            borderRadius: radii.lg,
            padding: '24px',
            boxShadow: shadows.sm,
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Header & Stats Banner */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '16px',
              borderBottom: `1px solid ${colors.slate200}`,
              marginBottom: '20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ ...typography.h3, margin: 0 }}>
                  Attendance Roll: Batch {loadedSession.batch} ({loadedSession.section})
                </h3>
                {loadedSession.isExisting ? (
                  <StatusBadge type="warning" size="sm">
                    Existing Record (Editing)
                  </StatusBadge>
                ) : (
                  <StatusBadge type="info" size="sm">
                    New Session
                  </StatusBadge>
                )}
              </div>
              <p style={{ ...typography.bodySmall, margin: '4px 0 0 0' }}>
                Subject: <strong>{loadedSession.subject}</strong> | Date: <strong>{loadedSession.date}</strong>
              </p>
            </div>

            {/* Counters and Quick Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: colors.slate100,
                  padding: '6px 12px',
                  borderRadius: radii.md,
                  fontSize: '13px'
                }}
              >
                <span style={{ color: colors.slate600 }}>Total: <strong>{studentRows.length}</strong></span>
                <span style={{ color: colors.slate300 }}>|</span>
                <span style={{ color: colors.success, fontWeight: '600' }}>Present: {presentCount}</span>
                <span style={{ color: colors.slate300 }}>|</span>
                <span style={{ color: colors.danger, fontWeight: '600' }}>Absent: {absentCount}</span>
              </div>

              {/* Shortcuts */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAll('Present')}
                icon={<CheckIcon size={14} color={colors.success} />}
              >
                Mark All Present
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAll('Absent')}
                icon={<XIcon size={14} color={colors.danger} />}
              >
                Mark All Absent
              </Button>
            </div>
          </div>

          {/* Student Attendance Table */}
          <div
            style={{
              overflowX: 'auto',
              border: `1px solid ${colors.slate200}`,
              borderRadius: radii.md,
              marginBottom: '20px'
            }}
          >
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
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600, width: '120px' }}>
                    Roll Number
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>
                    Student Name
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600, width: '90px' }}>
                    Section
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600, width: '220px' }}>
                    Attendance Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentRows.map((row, idx) => {
                  const isPresent = row.status === 'Present';
                  return (
                    <tr
                      key={row.studentId}
                      style={{
                        borderBottom: idx < studentRows.length - 1 ? `1px solid ${colors.slate100}` : 'none',
                        backgroundColor: isPresent ? 'rgba(240, 253, 244, 0.4)' : 'rgba(254, 242, 242, 0.4)',
                        transition: transitions.fast
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: colors.slate900 }}>
                        {row.rollNumber}
                      </td>
                      <td style={{ padding: '12px 16px', color: colors.slate800 }}>
                        {row.studentName}
                      </td>
                      <td style={{ padding: '12px 16px', color: colors.slate600 }}>
                        Section {row.section}
                      </td>
                      <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                          {/* Present Toggle */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(row.studentId, 'Present')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              borderRadius: radii.md,
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              border: `1px solid ${isPresent ? colors.success : colors.slate300}`,
                              backgroundColor: isPresent ? colors.success : colors.white,
                              color: isPresent ? colors.white : colors.slate600,
                              boxShadow: isPresent ? '0 1px 3px rgba(22, 163, 74, 0.3)' : 'none',
                              transition: transitions.fast
                            }}
                          >
                            <CheckIcon size={14} color={isPresent ? colors.white : colors.slate400} />
                            Present
                          </button>

                          {/* Absent Toggle */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(row.studentId, 'Absent')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              borderRadius: radii.md,
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              border: `1px solid ${!isPresent ? colors.danger : colors.slate300}`,
                              backgroundColor: !isPresent ? colors.danger : colors.white,
                              color: !isPresent ? colors.white : colors.slate600,
                              boxShadow: !isPresent ? '0 1px 3px rgba(220, 38, 38, 0.3)' : 'none',
                              transition: transitions.fast
                            }}
                          >
                            <XIcon size={14} color={!isPresent ? colors.white : colors.slate400} />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Save Action Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '8px'
            }}
          >
            <span style={{ ...typography.bodySmall, color: colors.slate500 }}>
              {loadedSession.isExisting
                ? 'Updates will overwrite the existing record for this subject and date.'
                : 'Clicking save records attendance permanently in the institutional ledger.'}
            </span>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSaveAttendance}
              disabled={saving}
              icon={<CheckIcon size={16} />}
            >
              {saving ? 'Saving Attendance...' : 'Save Attendance Record'}
            </Button>
          </div>
        </div>
      )}

      {/* Saved Attendance Sessions Ledger */}
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
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          <div>
            <h3 style={{ ...typography.h3, margin: 0 }}>Saved Attendance Sessions Ledger</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Chronological log of all recorded classroom sessions. Click <strong>Review / Edit</strong> to inspect or modify student attendance.
            </p>
          </div>
          <StatusBadge type="navy" size="md">
            {savedSessionsList.length} Sessions Logged
          </StatusBadge>
        </div>

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
                  Session Date
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>
                  Course Subject
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.slate600 }}>
                  Cohort
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>
                  Total
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>
                  Present
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>
                  Absent
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.slate600 }}>
                  Attendance %
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.slate600 }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {savedSessionsList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: colors.slate500 }}>
                    No attendance sessions recorded yet. Use the selector above to record your first session.
                  </td>
                </tr>
              ) : (
                savedSessionsList.map((session, idx) => {
                  const pct = Math.round((session.present / session.total) * 100);
                  const isCurrentLoaded =
                    loadedSession &&
                    loadedSession.batch === session.batch &&
                    loadedSession.section === session.section &&
                    loadedSession.subject === session.subject &&
                    loadedSession.date === session.date;

                  return (
                    <tr
                      key={`${session.date}_${session.subject}_${session.batch}_${session.section}_${idx}`}
                      style={{
                        borderBottom: idx < savedSessionsList.length - 1 ? `1px solid ${colors.slate100}` : 'none',
                        backgroundColor: isCurrentLoaded ? colors.blueLight : 'transparent',
                        transition: transitions.fast
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontWeight: '600', color: colors.slate900 }}>
                        {session.date}
                      </td>
                      <td style={{ padding: '12px 16px', color: colors.slate800 }}>
                        {session.subject}
                      </td>
                      <td style={{ padding: '12px 16px', color: colors.slate600 }}>
                        Batch {session.batch} (Sec {session.section})
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.slate700 }}>
                        {session.total}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.success, fontWeight: '600' }}>
                        {session.present}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: colors.danger, fontWeight: '600' }}>
                        {session.absent}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <StatusBadge type={pct >= 75 ? 'success' : 'danger'} size="sm">
                          {pct}%
                        </StatusBadge>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <Button
                          variant={isCurrentLoaded ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleLoadSpecificSession(session)}
                        >
                          {isCurrentLoaded ? 'Editing Now' : 'Review / Edit'}
                        </Button>
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

