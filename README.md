# Project Camp Backend

A robust, RESTful API service built with Node.js, Express, and MongoDB, designed to support a collaborative project management system. The platform allows teams to seamlessly organize projects, manage hierarchical tasks (with subtasks), maintain project notes, and enforce secure role-based access control.

## 🚀 Features

### 🔐 Authentication & Security
- **JWT-based Authentication** with robust Access & Refresh token rotation
- **Email Verification** required for full account access
- **Password Management** including secure reset flows via email tokens
- **Role-Based Access Control (RBAC)** enforcing distinct permissions for Admins, Project Admins, and Members

### 📁 Project & Team Management
- Create and manage distinct collaborative projects
- Invite users and manage team membership seamlessly
- Enforced project-level permission boundaries

### 📋 Task & Subtask Architecture
- Create detailed tasks assigned to specific project members
- Track statuses (`Todo`, `In Progress`, `Done`)
- Break tasks down into manageable Subtasks
- **File Attachments:** Integrated Multer support for uploading up to 5 attachments per task

### 📓 Project Notes
- Admins can maintain and manage centralized project notes

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JSON Web Tokens (JWT), bcrypt
- **File Handling:** Multer
- **Validation:** Express-Validator

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shrdx/Backend-bootcamp.git
   cd Backend-bootcamp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173
   
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   SERVER_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server should now be running on `http://localhost:8000`

---

## 🔒 Permission Matrix

| Feature | Admin | Project Admin | Member |
|---|:---:|:---:|:---:|
| Create Project | ✅ | ❌ | ❌ |
| Update/Delete Project | ✅ | ❌ | ❌ |
| Manage Project Members | ✅ | ❌ | ❌ |
| Create/Update/Delete Tasks | ✅ | ✅ | ❌ |
| View Tasks | ✅ | ✅ | ✅ |
| Update Subtask Status | ✅ | ✅ | ✅ |
| Create/Delete Subtasks | ✅ | ✅ | ❌ |
| Create/Update/Delete Notes | ✅ | ❌ | ❌ |
| View Notes | ✅ | ✅ | ✅ |

---

## 📚 API Structure Overview

- `/api/v1/auth/` — Registration, Login, Token Management, Password Resets
- `/api/v1/projects/` — Project CRUD, Member Management
- `/api/v1/tasks/` — Task & Subtask Management (Includes file uploads)
- `/api/v1/notes/` — Project Notes Management
- `/api/v1/healthcheck/` — System status monitoring

---

*Built as part of a Backend Bootcamp project.*
