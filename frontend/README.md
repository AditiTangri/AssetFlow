# AssetFlow - Frontend

## Overview

AssetFlow is a React-based Enterprise Asset Management System frontend that helps organizations efficiently manage assets throughout their lifecycle. The application provides role-based access for Admin, Department Head, and Employee users to perform various asset management operations through an intuitive user interface.

---

# Technologies Used

- React.js
- React Router DOM
- Bootstrap
- Tailwind CSS
- JavaScript (ES6+)
- HTML5
- CSS3
- Local Storage

---

# Features

## 1. User Authentication

- Login using role-based access
- Supports:
  - Admin
  - Department Head
  - Employee
- Logout functionality
- Session stored using Local Storage

---

## 2. Dashboard

Displays a quick overview of the organization.

Includes:

- Total Assets
- Allocated Assets
- Available Assets
- Assets Under Maintenance

---

## 3. Organization Management

Allows administrators to:

- Create Departments
- Add Employees
- Assign Employees to Departments
- View organization structure

---

## 4. Asset Management

Manage organization assets by:

- Registering new assets
- Viewing asset details
- Updating asset information
- Tracking asset status

---

## 5. Asset Allocation

Allocate assets to employees.

Features include:

- Assign assets
- Update allocation status
- Track allocated assets
- Department-wise allocation

---

## 6. Resource Booking

Employees can reserve shared resources.

Examples:

- Meeting Rooms
- Projectors
- Laptops

Booking includes:

- Resource Name
- Date
- Start Time
- End Time

---

## 7. Maintenance Management

Complete maintenance workflow.

Includes:

- Raise Maintenance Request
- Approve Request
- Reject Request
- Assign Technician
- Start Maintenance
- Resolve Maintenance
- Maintenance History

---

## 8. Asset Audit

Perform periodic asset verification.

Features:

- Create Audit Cycle
- Assign Auditor
- Verify Assets
- Mark Assets as:
  - Verified
  - Missing
  - Damaged
- Generate Discrepancy Report
- Close Audit Cycle
- Audit History

---

## 9. Reports & Analytics

Provides management reports such as:

- Asset Utilization Trends
- Maintenance Frequency
- Assets Due for Maintenance
- Assets Near Retirement
- Department-wise Allocation Summary
- Resource Booking Heatmap
- Export Reports (CSV)

---

## 10. Activity Logs & Notifications

Tracks system activities.

Notifications include:

- Asset Assigned
- Maintenance Approved
- Maintenance Rejected
- Booking Confirmed
- Booking Cancelled
- Transfer Approved
- Overdue Return Alert
- Audit Discrepancy Flagged

Activity Logs display:

- User
- Role
- Action
- Date
- Time

---

# Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Organization.jsx
│   ├── Assets.jsx
│   ├── Allocation.jsx
│   ├── ResourceBooking.jsx
│   ├── MaintenanceManagement.jsx
│   ├── AssetAudit.jsx
│   ├── Reports.jsx
│   ├── ActivityLogs.jsx
│
├── styles/
│   └── globals.css
│
├── App.jsx
└── main.jsx
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to project directory

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

# Role-Based Access

### Admin

Can access:

- Dashboard
- Organization Management
- Asset Management
- Asset Allocation
- Resource Booking
- Maintenance Management
- Asset Audit
- Reports & Analytics
- Activity Logs & Notifications

---

### Department Head

Can access:

- Dashboard
- Organization Management
- Asset Allocation
-
