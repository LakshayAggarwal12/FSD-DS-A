import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { validateStudentForm } from '../../utils/validators';
import { addStudent, getStudents } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Electrical & Electronics Engineering'
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const BATCHES = ['2021-2025', '2022-2026', '2023-2027', '2024-2028'];
const SECTIONS = ['A', 'B', 'C'];

const INITIAL_FORM = {
  name: '',
  rollNumber: '',
  registrationNumber: '',
  email: '',
  password: 'student123',
  course: 'Computer Science & Engineering',
  year: '3rd Year',
  batch: '2022-2026',
  section: 'A',
  gender: 'Male',
  contactNumber: ''
};

export default function AddStudentModal({
  isOpen,
  onClose,
  onStudentAdded = () => {}
}) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  const handleClose = () => {
    handleResetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const existingStudents = getStudents();
    const validation = validateStudentForm(formData, existingStudents);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitting(false);
      return;
    }

    // Generate unique ID
    const studentId = `STU-${String(existingStudents.length + 1).padStart(3, '0')}-${Date.now().toString().slice(-3)}`;

    const newStudent = {
      id: studentId,
      name: formData.name.trim(),
      rollNumber: formData.rollNumber.trim().toUpperCase(),
      registrationNumber: formData.registrationNumber.trim().toUpperCase(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      course: formData.course,
      year: formData.year,
      batch: formData.batch,
      section: formData.section,
      gender: formData.gender,
      contactNumber: formData.contactNumber.trim() || '-'
    };

    // Save to storage
    addStudent(newStudent);

    // Notify user
    showToast('Student recorded successfully.', 'success');

    // Notify parent
    onStudentAdded(newStudent);

    // Close and reset
    handleResetForm();
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Student"
      subtitle="Register a new student profile and set up their portal access."
      maxWidth="680px"
      footer={
        <>
          <Button variant="outline" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Saving Student...' : 'Save Student'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {/* Full Name */}
          <div style={{ gridColumn: 'span 2' }}>
            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
            />
          </div>

          {/* Roll Number */}
          <Input
            label="College Roll Number"
            name="rollNumber"
            placeholder="e.g. CS2221"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            error={errors.rollNumber}
            helperText="Must be unique across all students."
          />

          {/* Registration Number */}
          <Input
            label="Registration Number"
            name="registrationNumber"
            placeholder="e.g. REG2022CS021"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            error={errors.registrationNumber}
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. student@college.edu"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
            helperText="Used by student to log into the portal."
          />

          {/* Password */}
          <Input
            label="Student Demo Password"
            name="password"
            type="text"
            placeholder="e.g. student123"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          {/* Course */}
          <div style={{ gridColumn: 'span 2' }}>
            <Input
              label="Course / Department"
              name="course"
              type="select"
              value={formData.course}
              onChange={handleChange}
              required
              error={errors.course}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Input>
          </div>

          {/* Year of Study */}
          <Input
            label="Year of Study"
            name="year"
            type="select"
            value={formData.year}
            onChange={handleChange}
            required
            error={errors.year}
          >
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </Input>

          {/* Batch */}
          <Input
            label="Batch"
            name="batch"
            type="select"
            value={formData.batch}
            onChange={handleChange}
            required
            error={errors.batch}
          >
            {BATCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Input>

          {/* Section */}
          <Input
            label="Class / Section"
            name="section"
            type="select"
            value={formData.section}
            onChange={handleChange}
            required
            error={errors.section}
          >
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec}
              </option>
            ))}
          </Input>

          {/* Gender */}
          <Input
            label="Gender (Optional)"
            name="gender"
            type="select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Input>

          {/* Contact Number */}
          <div style={{ gridColumn: 'span 2' }}>
            <Input
              label="Contact Number (Optional)"
              name="contactNumber"
              placeholder="e.g. +91 98765 43210"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
