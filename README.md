# CRM Lead Management System

A full-stack CRM Lead Management System built for the Torch Labs Intern Software Engineer Assignment.

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

### Database
- MySQL

### Authentication
- JWT Authentication

---

# Features

## Authentication
- Secure login system
- JWT token authentication
- Protected routes

## Dashboard
- Lead statistics
- Won/Lost lead tracking
- Deal value summary

## User Management
- Create users/salespersons
- Delete users
- Role support (Admin / Salesperson)

## Lead Management
- Create leads
- Edit leads
- Delete leads
- Update lead status
- Assign salesperson
- Filter/search leads

## Lead Details
- Detailed lead information
- Notes system
- Activity tracking

---

# Project Structure

## Frontend

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

## Backend

```bash
src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── services/
├── types/
└── utils/
```

---

# Setup Instructions

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_lead_management

JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Database

Create MySQL database:

```sql
CREATE DATABASE crm_system;
```

Import SQL tables.

---

# Demo Credentials

```txt
admin username & password
Admin Email:
admin@example.com

Password:
password123
```

```txt
one of selsperson username & password
Email:
john@abc.com

Password:
spjoh123
```

---

# Future Improvements

- Pagination
- Role permissions
- Analytics charts
- Email integrations
- File uploads
- Activity timeline
- Dark mode

---

# Author

Developed by:
Apsara Saparamadu