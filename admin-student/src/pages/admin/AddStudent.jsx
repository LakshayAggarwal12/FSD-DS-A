import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent, getStudents } from '../../services/storageService';
import { validateStudentForm } from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import { colors, radii, shadows, typography } from '../../utils/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { UserPlusIcon, CheckIcon } from '../../components/common/Icons';

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

export default function AddStudent() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
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

    addStudent(newStudent);
    showToast('Student recorded successfully.', 'success');
    window.dispatchEvent(new Event('portal-data-updated'));
    setSubmitting(false);
    navigate('/admin/delete-student');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate200}`,
          borderRadius: radii.lg,
          padding: '28px',
          boxShadow: shadows.sm
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: radii.md,
              backgroundColor: colors.blueLight,
              color: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <UserPlusIcon size={20} />
          </div>
          <div>
            <h3 style={{ ...typography.h2, margin: 0, fontSize: '18px' }}>Register New Student</h3>
            <p style={{ ...typography.bodySmall, margin: '2px 0 0 0' }}>
              Create an official student record and establish their login credentials.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
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

            <Input
              label="College Roll Number"
              name="rollNumber"
              placeholder="e.g. CS2235"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              error={errors.rollNumber}
            />

            <Input
              label="Registration Number"
              name="registrationNumber"
              placeholder="e.g. REG2022CS035"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
              error={errors.registrationNumber}
            />

            <Input
              label="Email Address (Login Username)"
              name="email"
              type="email"
              placeholder="e.g. student@college.edu"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />

            <Input
              label="Initial Password"
              name="password"
              placeholder="e.g. student123"
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />

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

            <Input
              label="Section"
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting} icon={<CheckIcon size={16} />}>
              {submitting ? 'Saving Student...' : 'Save Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
