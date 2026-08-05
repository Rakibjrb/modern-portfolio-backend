# Modern Portfolio Backend API

A robust, type-safe RESTful API built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**. This application serves as the backend engine for a modern developer portfolio and admin management panel.

---

## ✨ Features & Capabilities

- **🔐 Auth & Session Management:** JWT-based authentication with Access and Refresh Token rotation (RTR), Bcrypt password hashing, and cookie management.
- **📁 Project Management:** Full CRUD operations for portfolio projects, including automated slug generation, technology tags, live/repository links, category filtering, search, and pagination.
- **👤 About & Bio Management:** Centralized management of personal bio, experience stats, current role, downloadable CV links, contact details, social links, and skills listing.
- **✉️ Contact & Email System:** Secure contact form submission with token protection, query status filtering (`markAsRead`), and automated email notifications (user confirmation + admin alert) via **Nodemailer**.
- **💼 Work & Academic Experience:** Management of professional career history (job type, responsibilities, achievements) and educational qualifications.
- **🖼️ Media Upload:** Memory-buffered file upload middleware supporting `PNG`, `JPG`, and `JPEG` formats with Cloudinary integration.
- **🛡️ Security & Performance:** Helmet HTTP header security, CORS origin restrictions, Express Rate Limiting, Compression, and Zod schema request validation.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose ODM)
- **Validation:** Zod
- **Authentication:** JSON Web Token (`jsonwebtoken`) & `bcryptjs`
- **Email Service:** Nodemailer (SMTP)
- **Media Storage:** Cloudinary & Multer
- **Security & Utilities:** Helmet, CORS, Compression, `express-rate-limit`, Morgan

---

## 📁 Project Structure

```bash
modern-portfolio-backend/
├── src/
│   ├── app/
│   │   ├── config/             # App & Database configuration (env, database connection)
│   │   ├── errors/             # Custom AppError & global error handler middlewares
│   │   ├── managers/           # External service managers (Cloudinary, Nodemailer, Token Manager)
│   │   ├── middlewares/        # Express middlewares (auth, upload, validateRequest)
│   │   ├── modules/            # Domain-driven feature modules
│   │   │   ├── about/          # About me details & skills
│   │   │   ├── auth/           # Authentication & user sessions
│   │   │   ├── contact/        # Contact form messages & notifications
│   │   │   ├── experience/     # Professional & academic background
│   │   │   ├── project-management/ # Portfolio project CRUD & search
│   │   │   └── shared/         # Shared services & media upload controllers
│   │   ├── routes/             # Centralized API route definitions
│   │   ├── types/              # Global TypeScript declarations & interfaces
│   │   └── utils/              # Helper utilities (catchAsync, sendResponse, extractToken, hashPassword)
│   ├── app.ts                  # Express application setup & middleware configuration
│   └── server.ts               # Server entry point & graceful shutdown listeners
├── .env                        # Environment variables configuration
├── package.json                # Dependencies and npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory:

```env
# Application & Environment
NODE_ENV=development
PORT=8001
FRONTEND_URL=http://localhost:3000
ADMIN_DASHBOARD_PANEL_URL=http://localhost:3001
APP_VERSION=1.0.0
BCRYPT_SALT_ROUNDS=14

# Database Setup
CLUSTER_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net
DATABASE_NAME=modern-portfolio

# JWT Secret Keys & Expiry
AUTH_TOKEN_SECRET=your_auth_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
AUTH_TOKEN_EXPIRE_IN=15m
REFRESH_TOKEN_EXPIRE_IN=30d

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Contact & Email Setup
FRONTEND_FORM_TOKEN=your_frontend_form_token
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=your_email@gmail.com
```

---

## 📡 API Endpoints Overview

### 🔑 Authentication (`/api/auth`)
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user & clear token cookies
- `GET /api/auth/me` - Get current authenticated user profile *(Super Admin)*
- `PUT /api/auth/:id` - Update user role/profile *(Super Admin)*

### 🚀 Projects (`/api/projects`)
- `GET /api/projects` - List all projects (supports search, category, featured filter, pagination)
- `GET /api/projects/:slug` - Get single project details by slug
- `POST /api/projects` - Create a new project *(Super Admin)*
- `PUT /api/projects/:id` - Update project details by ID *(Super Admin)*
- `DELETE /api/projects/:id` - Delete project by ID *(Super Admin)*

### 👤 About (`/api/about`)
- `GET /api/about` - Get About Me details
- `GET /api/about/skills` - Get listed skills
- `POST /api/about` - Create or update About Me details *(Super Admin)*
- `PUT /api/about` - Update About Me details *(Super Admin)*

### ✉️ Contact (`/api/contacts`)
- `POST /api/contacts` - Send a contact message *(Public with form token verification)*
- `GET /api/contacts` - List all contact messages *(Super Admin)*
- `GET /api/contacts/:id` - Get contact message details by ID *(Super Admin)*
- `PUT /api/contacts/:id` - Update contact status / mark as read (`?markAsRead=true`) *(Super Admin)*

### 💼 Experience (`/api/experiences`)
- `GET /api/experiences` - Get professional and academic experience records
- `POST /api/experiences` - Create or update experience records *(Super Admin)*
- `PUT /api/experiences/:id` - Update experience record by ID *(Super Admin)*

### 🖼️ Public Upload (`/api/public`)
- `POST /api/public/upload/image` - Upload single media image (`PNG`, `JPG`, `JPEG`) to Cloudinary

---

## ⚡ Getting Started

### 1. Installation
```bash
yarn install
# or
npm install
```

### 2. Development Mode
```bash
yarn dev
# or
npm run dev
```

### 3. Production Build & Execution
```bash
yarn build
yarn start
```

---

## 📄 License
This project is proprietary and intended for personal portfolio and administrative management.
