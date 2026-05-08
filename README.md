# CRM Lead Management System

A full-stack CRM Lead Management System built for the Torch Labs Intern Software Engineer Assignment.

## Overview

This project includes:
- Role-based authentication with JWT
- Admin and salesperson access control
- Lead management with status workflow
- Dashboard analytics
- Activity notes on each lead
- Sequelize-based database bootstrap

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Material UI

### Backend
- Node.js
- Express.js
- TypeScript
- Sequelize

### Database
- MySQL

### Authentication
- JWT Authentication

---

## Features

### Authentication
- Secure login system
- JWT token authentication
- Protected routes

### Dashboard
- Lead statistics
- Won/Lost lead tracking
- Deal value summary

### User Management
- Create users/salespersons
- Delete users
- Role support for Admin and Salesperson

### Lead Management
- Create leads
- Edit leads
- Delete leads
- Update lead status
- Assign salesperson
- Filter/search leads

### Lead Details
- Detailed lead information
- Notes system
- Activity tracking

---

## Project Structure

### Frontend

```bash
src/
├── api/
├── components/
│   ├── common/
│   ├── layout/
│   └── leads/
├── pages/
├── routes/
├── types/
└── utils/
```

### Backend

```bash
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── utils/
```

---

## Setup Instructions

### 1) Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_lead_management

JWT_SECRET=your_secret_key

# Optional seed overrides
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=password123
SEED_SALESPERSON_EMAIL=john@example.com
SEED_SALESPERSON_PASSWORD=spjoh123
```

Create the MySQL database manually if it does not already exist:

```sql
CREATE DATABASE crm_lead_management;
```

Start the backend:

```bash
npm run dev
```

On startup, Sequelize will automatically:
- connect to the database
- create or update the tables
- seed the default admin and salesperson accounts if they do not already exist

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Database Behavior

- The MySQL database must exist before starting the backend.
- Tables are created automatically by Sequelize when the backend starts.
- The seed users are also created automatically if they are missing.

### Created Tables
- `users`
- `leads`
- `notes`

### Seeded Accounts

Admin:

```txt
Email: admin@example.com
Password: password123
```

Salesperson:

```txt
Email: john@example.com
Password: spjoh123
```

---

## Verification

After starting the backend, you should see logs similar to:

```txt
Database connection OK
Database synced (tables created/updated)
Server running on port 5000
```

You can also test login with the seeded accounts against:

```bash
POST http://localhost:5000/api/auth/login
```

---

## Future Improvements

- Pagination
- More fine-grained role permissions
- Analytics enhancements
- Email integrations
- File uploads
- Activity timeline expansion
- Dark mode

---

## Author

Developed by:
Apsara Saparamadu