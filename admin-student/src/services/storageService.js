/**
 * Storage service managing localStorage state, seed initialization,
 * and data manipulation with cascading cleanup.
 */

import initialStudents from '../data/students.json';
import initialSubjects from '../data/subjects.json';
import initialAttendance from '../data/attendance.json';
import initialAssignments from '../data/assignments.json';
import { storePdfBlob, getPdfBlob, removePdfBlob, clearAllPdfs } from './indexedDbService';

const STORAGE_KEYS = {
  STUDENTS: 'college_portal_students_v1',
  SUBJECTS: 'college_portal_subjects_v1',
  ATTENDANCE: 'college_portal_attendance_v1',
  ASSIGNMENTS: 'college_portal_assignments_v1',
  SESSION: 'college_portal_auth_session_v1',
  INITIALIZED: 'college_portal_seeded_v1'
};

// Safe JSON parser
function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error parsing localStorage key "${key}":`, err);
    return fallback;
  }
}

// Safe JSON setter
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error writing to localStorage key "${key}":`, err);
    return false;
  }
}

/**
 * Initializes the browser storage from local JSON files if it hasn't been initialized yet.
 */
export async function initializeStorage() {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    // Seed students
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      safeSet(STORAGE_KEYS.STUDENTS, initialStudents);
    }
    // Seed subjects
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      safeSet(STORAGE_KEYS.SUBJECTS, initialSubjects);
    }
    // Seed attendance
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
      safeSet(STORAGE_KEYS.ATTENDANCE, initialAttendance);
    }
    // Seed assignments metadata & save PDF binary to IndexedDB
    if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
      const metadataList = [];
      for (const asg of initialAssignments) {
        const { pdfData, ...meta } = asg;
        metadataList.push(meta);
        if (pdfData) {
          await storePdfBlob(asg.id, pdfData);
        }
      }
      safeSet(STORAGE_KEYS.ASSIGNMENTS, metadataList);
    }
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
}

/**
 * Resets all stored data back to the clean JSON seed data.
 */
export async function resetDemoData() {
  localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
  localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
  localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  await clearAllPdfs();
  await initializeStorage();
  return true;
}

// ====================== STUDENTS ====================== //

export function getStudents() {
  return safeParse(STORAGE_KEYS.STUDENTS, initialStudents);
}

export function saveStudents(students) {
  return safeSet(STORAGE_KEYS.STUDENTS, students);
}

export function addStudent(newStudent) {
  const current = getStudents();
  const updated = [newStudent, ...current];
  saveStudents(updated);
  return updated;
}

export function deleteStudent(studentId) {
  // 1. Remove student
  const currentStudents = getStudents();
  const updatedStudents = currentStudents.filter(s => s.id !== studentId);
  saveStudents(updatedStudents);

  // 2. Cascade delete student attendance records to prevent orphan data
  const currentAttendance = getAttendance();
  const updatedAttendance = currentAttendance.filter(r => r.studentId !== studentId);
  saveAttendance(updatedAttendance);

  return { students: updatedStudents, attendance: updatedAttendance };
}

// ====================== SUBJECTS ====================== //

export function getSubjects() {
  return safeParse(STORAGE_KEYS.SUBJECTS, initialSubjects);
}

// ====================== ATTENDANCE ====================== //

export function getAttendance() {
  return safeParse(STORAGE_KEYS.ATTENDANCE, initialAttendance);
}

export function saveAttendance(attendanceList) {
  return safeSet(STORAGE_KEYS.ATTENDANCE, attendanceList);
}

/**
 * Saves or updates attendance records for a batch/section/subject/date session.
 * If records already exist for the selected session, updates them to avoid duplicates.
 */
export function recordAttendanceSession({ batch, section, subject, date, studentStatuses }) {
  const current = getAttendance();

  // Filter out any existing records matching this exact batch, section, subject, date and student
  const studentIdsInSession = new Set(studentStatuses.map(s => s.studentId));

  const remainingRecords = current.filter(r => {
    const isSameSession =
      r.batch === batch &&
      r.section === section &&
      r.subject === subject &&
      r.date === date &&
      studentIdsInSession.has(r.studentId);
    return !isSameSession;
  });

  // Construct new records
  const newRecords = studentStatuses.map((s, idx) => ({
    id: `att-${Date.now()}-${idx}-${s.rollNumber}`,
    studentId: s.studentId,
    rollNumber: s.rollNumber,
    studentName: s.studentName,
    batch: batch,
    section: section,
    subject: subject,
    date: date,
    status: s.status // 'Present' or 'Absent'
  }));

  const combined = [...newRecords, ...remainingRecords];
  saveAttendance(combined);
  return combined;
}

// ====================== ASSIGNMENTS ====================== //

export function getAssignments() {
  return safeParse(STORAGE_KEYS.ASSIGNMENTS, initialAssignments.map(({ pdfData, ...meta }) => meta));
}

export function saveAssignments(assignments) {
  return safeSet(STORAGE_KEYS.ASSIGNMENTS, assignments);
}

export async function addAssignment(assignmentMeta, pdfDataUrl) {
  const current = getAssignments();
  const updated = [assignmentMeta, ...current];
  saveAssignments(updated);

  if (pdfDataUrl) {
    await storePdfBlob(assignmentMeta.id, pdfDataUrl);
  }
  return updated;
}

export async function deleteAssignment(assignmentId) {
  const current = getAssignments();
  const updated = current.filter(a => a.id !== assignmentId);
  saveAssignments(updated);
  await removePdfBlob(assignmentId);
  return updated;
}

export async function getAssignmentPdf(assignmentId) {
  return await getPdfBlob(assignmentId);
}

// ====================== SESSION ====================== //

export function getStoredSession() {
  return safeParse(STORAGE_KEYS.SESSION, null);
}

export function saveStoredSession(user) {
  return safeSet(STORAGE_KEYS.SESSION, user);
}

export function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}
