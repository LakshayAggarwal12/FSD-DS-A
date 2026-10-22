# Apex University - Student Management System

A modern, functional frontend web application for a **College Student Management System** featuring role-based dashboards for **Administrators** and **Students**.

Built with **React.js**, **React Router**, **Inline CSS** (with React's `style` prop), **localStorage**, and **IndexedDB** for local PDF binary persistence.

---

## 1. Demo Credentials

The portal is pre-seeded with realistic institutional accounts. You can also click the quick-fill buttons on the login screen.

| Role | Username / Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@college.edu` | `admin123` | Dean of Academic Affairs (Full Admin Rights) |
| **Student** (Sample 1) | `student01@college.edu` | `student123` | Aarav Sharma (CS2201 • Batch 2022-2026, Sec A) |
| **Student** (Sample 2) | `priya.nair@college.edu` | `student123` | Priya Nair (CS2202 • Batch 2022-2026, Sec A) |
| **Student** (Sample 3) | `kunal.bansal@college.edu` | `student123` | Kunal Bansal (CS2211 • Batch 2022-2026, Sec B) |
| **Student** (Sample 4) | `varun.chopra@college.edu` | `student123` | Varun Chopra (IT2201 • IT Batch 2022-2026, Sec A) |
| **Student** (Sample 5) | `yash.mittal@college.edu` | `student123` | Yash Mittal (EC2301 • ECE Batch 2023-2027, Sec A) |

*Note: All 30 pre-seeded students have the default password `student123` and can log in using either their registered email address or roll number.*

---

## 2. Key Features

### Animated Landing Page (`/`)
- **Institutional Branding & Aesthetics:** High-impact hero section with university crest, glowing badge, and academic session tags.
- **Interactive Live Dashboard Preview:** Animated mockup with floating statistics pills, live attendance sync badge, and IndexedDB storage indicator.
- **Dual Role Showcase:** Clear visual comparison between Administrator and Student portals.
- **One-Click Instant Demo Launchers:** Immediate entry buttons that authenticate and redirect into either the Admin Console or Student Portal without typing credentials.
- **Direct Navigation:** Seamless links between the landing page, login screen, and both role portals.

### Authentication & Role-Based Navigation
- **Portal Branding & Verification:** Clean college portal sign-in interface with email/roll number and password fields.
- **Show/Hide Password:** One-click toggle to reveal or mask passwords safely.
- **Role Guards (`AdminRoute` & `StudentRoute`):** Prevents students from accessing admin management routes and ensures admins operate within their designated administrative tools.
- **Quick-Fill Buttons:** One-click credentials autofill on the login page for rapid evaluation.


### Administrator Console (`/admin/*`)
1. **Dashboard Overview:**
   - Real-time KPI summaries calculated from live data: Total Students, Total Attendance Records, Uploaded Assignments, and Curriculum Modules.
   - Student cohort distribution by Batch and Section.
   - Recent lecture session activity and latest course materials.
2. **Add Student (Modal & Dedicated Page):**
   - Modal form accessible from the sidebar navigation or dashboard.
   - Comprehensive fields: Full Name, Roll Number, Registration Number, Email, Password, Course/Department, Year of Study, Batch, Section, Gender, Contact Number.
   - Uniqueness validations preventing duplicate Roll Numbers, Registration Numbers, and Emails.
   - Instant local persistence in `localStorage`; newly created students can immediately sign in with their assigned credentials.
3. **Attendance Management:**
   - Cohort selection by Batch, Section, Subject, and Date.
   - "Load Students" dynamically displays the matching student roll.
   - Individual "Present" and "Absent" status toggles with clear color-coded states.
   - "Mark All Present" and "Mark All Absent" batch shortcuts.
   - Live counter of Present and Absent students.
   - **Duplicate Prevention & Editing:** If an attendance session already exists for the selected Batch, Section, Subject, and Date, existing records are loaded for editing rather than duplicated.
4. **Course Assignments:**
   - Upload course problem sets and syllabus documents in PDF format.
   - Enforces PDF-only MIME validation and 5 MB file size limit.
   - Target cohort targeting: Specify Batch and Section ("All Sections", "Section A", "Section B", etc.).
   - Integrated **IndexedDB storage** for PDF binary blobs to bypass the ~5MB `localStorage` limit.
   - Embedded in-app PDF preview modal and download support.
   - Assignment deletion with a confirmation dialog.
5. **Student Directory & Deletion:**
   - Filterable, searchable student directory with live search by Name, Roll Number, or Email.
   - Filter dropdowns for Batch and Section.
   - Safe student deletion with a confirmation modal displaying the student's academic record.
   - **Cascading Cleanup:** Automatically purges the student's credentials and related attendance records to prevent orphan data in the portal.

### Student Portal (`/student/*`)
1. **Academic Dashboard:**
   - Identity banner displaying Full Name, Roll Number, Registration Number, Course, Year, Batch, and Section.
   - Key metrics: Aggregate Attendance Percentage (`(Present / Total) × 100`), Total Classes, Attended, Missed. Safe division handling (0% without `NaN`).
   - Subject-wise attendance breakdown table.
   - Low attendance warning notification if overall attendance drops below 75%.
2. **My Attendance:**
   - Detailed subject summary table with percentage calculations.
   - Chronological session history log with dates and status badges.
   - Subject filter and date sorting (Newest / Oldest).
   - Strict scoping to the logged-in student's ID.
3. **Course Assignments:**
   - Displays only assignments intended for the logged-in student's Batch and Section.
   - In-app embedded PDF viewer with native zoom, download button, and return navigation.

### Reset Demo Data
- A persistent "Reset Seed Data" button is located in the top navigation bar of both Admin and Student portals.
- Restores the initial JSON dataset of 30 students, historical attendance sessions, and sample PDF assignments with a single confirmation.

---

## 3. Technology Stack & Constraints

- **Core:** React 19, JavaScript (JSX), Vite.
- **Routing:** React Router v7.
- **Styling:** Inline CSS using React's `style` prop, guided by a centralized theme system (`src/utils/theme.js`).
- **Global Styles:** Minimal `index.css` for `@import` font (Inter), global box-sizing reset, subtle keyframe animations (`fadeIn`, `scaleUp`, `toastSlideIn`), custom scrollbars, and mobile media queries.
- **Data Persistence:**
  - `localStorage` for students, attendance records, assignment metadata, and authentication sessions.
  - `IndexedDB` (`CollegePortalDB`) for PDF document blobs to guarantee seamless document viewing after page refreshes without storage quota errors.
- **Icons:** Inline SVG icons (`src/components/common/Icons.jsx`).
- **No External Frameworks:** No Tailwind CSS, Bootstrap, Material UI, or external database APIs.

---

## 4. Project Directory Structure

```
admin-student/
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── AuthContext.jsx       # Authentication state, login, logout, role checks
    │   └── ToastContext.jsx      # Global toast notification management
    ├── data/
    │   ├── students.json         # 30 realistic student seed records
    │   ├── subjects.json         # University course subjects
    │   ├── attendance.json       # Historical attendance logs
    │   └── assignments.json      # Sample PDF assignments
    ├── services/
    │   ├── storageService.js     # localStorage management & cascading cleanup
    │   └── indexedDbService.js   # IndexedDB helper for PDF binary persistence
    ├── utils/
    │   ├── theme.js              # Palette, typography, shadows, radii constants
    │   ├── validators.js         # Form, email, duplicate check, and PDF validators
    │   └── calculations.js       # Attendance percentage and grouping logic
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx        # Reusable button with variants & sizes
    │   │   ├── Input.jsx         # Text, select, textarea, search fields
    │   │   ├── Modal.jsx         # Accessible modal dialog
    │   │   ├── ConfirmDialog.jsx # Confirmation dialog for destructive actions
    │   │   ├── StatusBadge.jsx   # Present/Absent and cohort badges
    │   │   ├── DataTable.jsx     # Responsive styled data table
    │   │   ├── Header.jsx        # Top header with profile & reset button
    │   │   ├── Sidebar.jsx       # Admin navigation sidebar
    │   │   └── Icons.jsx         # Inline SVG icons
    │   ├── admin/
    │   │   ├── AdminLayout.jsx   # Shell with sidebar, header, global modal
    │   │   ├── AddStudentModal.jsx
    │   │   ├── AttendanceManager.jsx
    │   │   ├── AssignmentUploader.jsx
    │   │   └── StudentDirectory.jsx
    │   └── student/
    │       ├── StudentLayout.jsx # Shell with top nav & academic bar
    │       ├── AttendanceSummary.jsx
    │       ├── AttendanceHistory.jsx
    │       ├── AssignmentList.jsx
    │       └── PdfViewer.jsx     # Embedded in-app PDF previewer
    └── pages/
        ├── Login.jsx
        ├── admin/
        │   ├── AdminDashboard.jsx
        │   ├── AddStudent.jsx
        │   ├── Attendance.jsx
        │   ├── Assignments.jsx
        │   └── DeleteStudent.jsx
        └── student/
            ├── StudentDashboard.jsx
            ├── MyAttendance.jsx
            └── StudentAssignments.jsx
```

---

## 5. Installation & Local Execution

1. Clone or navigate to the project directory:
   ```bash
   cd admin-student
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local address displayed in the terminal (typically `http://localhost:5173/`).

---

## 6. Testing Workflows

1. **Admin Login:**
   - Sign in with `admin@college.edu` / `admin123`.
2. **Add a New Student:**
   - Click **Add Student** in the sidebar.
   - Enter student details (e.g. Roll: `CS2299`, Email: `alex.stone@college.edu`, Password: `student123`, Batch: `2022-2026`, Sec: `A`).
   - Click **Save Student**. Verify the toast message **"Student recorded successfully."**
3. **Verify Immediate Login for New Student:**
   - Log out, then log in using `alex.stone@college.edu` / `student123`.
   - Verify the student dashboard displays their name and 0% attendance cleanly without errors.
4. **Mark Attendance:**
   - Log back in as Admin and go to **Attendance**.
   - Select Batch `2022-2026`, Section `A`, Subject `Data Structures & Algorithms`, and pick today's date.
   - Click **Load Students**, toggle presence, and click **Save Attendance Record**.
5. **Verify Student Attendance:**
   - Sign back in as `student01@college.edu`.
   - Navigate to **My Attendance** to see updated subject percentages and historical logs.
6. **Upload & View PDF Assignments:**
   - As Admin, visit **Assignments**, upload any PDF (or use the sample PDF), assign to Batch `2022-2026` Section `A`.
   - As `student01@college.edu`, visit **Assignments** and click **View Assignment PDF** to preview inside the application.
7. **Delete Student:**
   - As Admin, visit **Delete Student**, search for a student, click **Delete**, and confirm. Verify that their login access and attendance records are removed.

---

## 7. Limitations & Security Notice

- This application is a **frontend-only demonstration**. Authentication is simulated in client-side storage and does not provide production-level cryptographic security.
- Data persistence is bound to the user's browser via `localStorage` and `IndexedDB`. Clearing browser data or using incognito mode will reset state back to the seed files.
