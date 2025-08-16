# Digital Land Registry Hub

A full-stack web application for a Digital Land Registry Hub, with a Next.js frontend and a FastAPI backend. This project provides a secure platform for citizens and officers to manage land registration, property records, and related services.

### Features

* **User Management**: Secure user registration, login, and authentication with JWT tokens.
* **Multi-language Support**: The frontend supports English, Sinhala, and Tamil.
* **User Dashboard**: A personalized dashboard for authenticated users to view available services and track application status.
* **Available Services**: Services such as Land Transfer, Application for Certified Copy of a Land, Application for Search of Land Registers, and Application for Search Duplicate of Deeds.
* **File Uploads**: Functionality to attach documents to applications.
* **Admin/Officer Functionality**: A separate set of API endpoints for officers to review and update application and document statuses.

-----

### Technologies Used

#### Frontend

* **Framework**: Next.js 15.2.4
* **Language**: TypeScript
* **Styling**: Tailwind CSS, `tailwindcss-animate`
* **UI Components**: Shadcn/ui, Radix UI
* **State Management**: React Context (`AuthContext`, `TranslationContext`)
* **Forms**: `react-hook-form` with `zod` validation

#### Backend

* **Framework**: FastAPI
* **Language**: Python
* **Database**: PostgreSQL
* **ORM**: SQLAlchemy with `asyncio`
* **Authentication**: JWT (JSON Web Tokens), `passlib` for password hashing

-----

### File and Folder Structure

```

Team-Imprez\_digital-land-registry/
├── backend/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           ├── **init**.py
│   │           ├── admin\_applications.py       \# Admin routes for application management
│   │           ├── admin\_documents.py          \# Admin routes for document management
│   │           ├── user\_applications.py        \# User routes for their own applications
│   │           ├── user\_auth.py                \# User authentication routes (register, login)
│   │           ├── user\_documents.py           \# User routes for their own documents
│   │           └── user\_payments.py            \# User routes for payments
│   ├── crud/
│   │   ├── **init**.py
│   │   ├── admin\_applications.py       \# CRUD functions for admin application management
│   │   ├── applications.py             \# General CRUD functions for applications
│   │   ├── documents.py                \# CRUD functions for documents
│   │   ├── payments.py                 \# CRUD functions for payments
│   │   └── users.py                    \# CRUD functions for users
│   ├── database/
│   │   ├── **init**.py
│   │   └── session.py                  \# Database session management
│   ├── models/
│   │   ├── **init**.py
│   │   ├── applications.py             \# SQLAlchemy models for applications
│   │   ├── base.py                     \# Base model for SQLAlchemy
│   │   ├── documents.py                \# SQLAlchemy models for documents
│   │   ├── enums.py                    \# Enum definitions for database models
│   │   ├── lro\_backend\_models.py       \# Main file for all SQLAlchemy models
│   │   ├── officers.py                 \# SQLAlchemy models for officers
│   │   ├── offices.py                  \# SQLAlchemy models for offices
│   │   ├── payments.py                 \# SQLAlchemy models for payments
│   │   ├── security.py                 \# Security-related models and utilities
│   │   ├── seed\_data.py                \# Script for seeding the database with initial data
│   │   └── services.py                 \# SQLAlchemy models for services
│   ├── schemas/
│   │   ├── **init**.py
│   │   ├── admin\_schemas.py            \# Pydantic models for admin endpoints
│   │   ├── common.py                   \# Common enums and schemas
│   │   └── user\_schemas.py             \# Pydantic models for user endpoints
│   ├── scripts/
│   │   └── setup\_test\_db.py            \# Script to set up a test database
│   ├── tests/
│   │   ├── **init**.py
│   │   ├── conftest.py                 \# Pytest configuration and fixtures
│   │   ├── test\_crud\_smoke.py          \# Smoke tests for CRUD operations
│   │   ├── test\_enums.py               \# Tests for enums
│   │   ├── test\_models\_registration.py \# Tests for model registration
│   │   └── test\_routes.py              \# Tests for API routes
│   ├── tools/
│   │   └── check\_db\_enums.py           \# Tool to check database enums
│   ├── .gitignore                      \# Git ignore file for the backend
│   ├── init\_db.py                      \# Script to initialize the database
│   ├── main.py                         \# Main FastAPI application entry point
│   ├── plan.md                         \# Project planning document
│   └── requirements.txt                \# Python dependencies
└── Frontend/
├── app/
│   ├── copy/
│   │   ├── application/
│   │   │   └── page.tsx              \# Application page for 'copy' service
│   │   ├── confirmation/
│   │   │   └── page.tsx              \# Confirmation page for 'copy' service
│   │   ├── payment/
│   │   │   └── page.tsx              \# Payment page for 'copy' service
│   │   └── qr-confirmation/
│   │       └── page.tsx              \# QR confirmation page for 'copy' service
│   ├── copy-of-land/
│   │   ├── application/
│   │   │   └── page.tsx              \# Application page for 'copy-of-land' service
│   │   ├── confirmation/
│   │   │   └── page.tsx              \# Confirmation page for 'copy-of-land' service
│   │   ├── payment/
│   │   │   └── page.tsx              \# Payment page for 'copy-of-land' service
│   │   └── qr-confirmation/
│   │       └── page.tsx              \# QR confirmation page for 'copy-of-land' service
│   ├── dashboard/
│   │   ├── layout.tsx                \# Layout for the dashboard
│   │   └── page.tsx                  \# User dashboard page
│   ├── land-transfer/
│   │   ├── application/
│   │   │   └── page.tsx              \# Application page for 'land-transfer' service
│   │   ├── confirmation/
│   │   │   └── page.tsx              \# Confirmation page for 'land-transfer' service
│   │   ├── payment/
│   │   │   └── page.tsx              \# Payment page for 'land-transfer' service
│   │   └── qr-confirmation/
│   │       └── page.tsx              \# QR confirmation page for 'land-transfer' service
│   ├── register/
│   │   └── page.tsx                  \# User registration page
│   ├── search-duplicate-deeds/
│   │   ├── application/
│   │   │   └── page.tsx              \# Application page for 'search-duplicate-deeds' service
│   │   ├── confirmation/
│   │   │   └── page.tsx              \# Confirmation page for 'search-duplicate-deeds' service
│   │   ├── payment/
│   │   │   └── page.tsx              \# Payment page for 'search-duplicate-deeds' service
│   │   └── qr-confirmation/
│   │       └── page.tsx              \# QR confirmation page for 'search-duplicate-deeds' service
│   ├── search-land/
│   │   ├── application/
│   │   │   └── page.tsx              \# Application page for 'search-land' service
│   │   ├── confirmation/
│   │   │   └── page.tsx              \# Confirmation page for 'search-land' service
│   │   ├── payment/
│   │   │   └── page.tsx              \# Payment page for 'search-land' service
│   │   └── qr-confirmation/
│   │       └── page.tsx              \# QR confirmation page for 'search-land' service
│   ├── globals.css                   \# Global CSS styles
│   ├── layout.tsx                    \# Main application layout
│   └── page.tsx                      \# Home page
├── components/
│   ├── ui/
│   │   ├── ...                       \# Reusable UI components (from Shadcn/ui)
│   ├── announcements-section.tsx     \# Component for news and announcements
│   ├── contact-section.tsx           \# Component for contact information
│   ├── dashboard-navigation-bar.tsx  \# Dashboard-specific navigation bar
│   ├── faq-section.tsx               \# Component for frequently asked questions
│   ├── file-upload.tsx               \# Component for file uploads
│   ├── footer.tsx                    \# Footer component
│   ├── government-header.tsx         \# Government header with language switcher
│   ├── hero-section.tsx              \# Hero section component
│   ├── home-navigation-bar.tsx       \# Home page navigation bar
│   ├── login-overlay.tsx             \# Login modal/overlay component
│   ├── navigation-bar.tsx            \# General navigation bar logic
│   ├── process-section.tsx           \# "How it works" section
│   ├── services-section.tsx          \# Services list component
│   └── theme-provider.tsx            \# Theme provider (e.g., for dark mode)
├── contexts/
│   ├── auth-context.tsx              \# React context for authentication state
│   └── translation-context.tsx       \# React context for multi-language support
├── hooks/
│   ├── use-mobile.ts                 \# Custom hook to detect mobile devices
│   └── use-toast.ts                  \# Custom hook for toast notifications
├── lib/
│   ├── use-smooth-scroll.ts          \# Custom hook for smooth scrolling
│   └── utils.ts                      \# Utility functions
├── public/
│   └── ...                           \# Image and asset files
├── styles/
│   └── globals.css                   \# Global CSS styles
├── .gitignore                        \# Git ignore file for the frontend
├── README.md                         \# README file for the frontend
├── components.json                   \# Configuration for Shadcn/ui
├── next.config.mjs                   \# Next.js configuration
├── package.json                      \# Node.js dependencies and scripts
├── pnpm-lock.yaml                    \# PNPM lock file
├── postcss.config.mjs                \# PostCSS configuration
└── tsconfig.json                     \# TypeScript configuration

````

### Database Schema

The database models are defined using SQLAlchemy in `backend/db/lro_backend_models.py`. Here's a summary of the key tables:

| Table Name | Description | Key Fields |
| :--- | :--- | :--- |
| **users** | Stores user registration and authentication information. | `user_id`, `email`, `nic_number`, `password_hash` |
| **offices** | Manages the different land registry offices. | `office_id`, `office_name` |
| **lro_officers** | Stores information for Land Registry Officer accounts. | `officer_id`, `user_id`, `employee_id` |
| **services** | Defines the types of land registry services available. | `service_id`, `service_name`, `service_code` |
| **application_status** | A lookup table for application statuses. | `status_id`, `status_name` |
| **applications** | Core table for all user applications. | `application_id`, `user_id`, `service_id`, `status_id` |
| **payments** | Records payment details for applications. | `payment_id`, `application_id`, `amount` |
| **uploaded_documents** | Stores metadata for documents attached to applications. | `document_id`, `application_id`, `file_name`, `verification_status` |
| **application_log** | Logs actions and remarks for each application. | `log_id`, `application_id`, `action_taken` |
| **app_land_transfer** | Details specific to a Land Transfer application. | `land_transfer_id`, `application_id` |
| **app_search_duplicate_deeds** | Details for a search for duplicate deeds application. | `search_duplicate_id`, `application_id` |
| **app_copy_of_land_registers** | Details for a copy of land registers application. | `copy_register_id`, `application_id` |
| **app_search_land_registers** | Details for a search of land registers application. | `search_register_id`, `application_id` |
| **search_register_folios** | Stores folio details for search register applications. | `folio_request_id`, `search_register_id` |
| **app_copy_of_document** | Details for a copy of a document application. | `copy_doc_id`, `application_id` |

-----

### API Structure

The API is built with FastAPI and includes separate routers for user and administrative functions. All endpoints are prefixed with `/api`.

#### User Endpoints (`/api/user/`)

These endpoints are for authenticated users (citizens) to manage their applications and related activities. All of these routes require a valid JWT token.

| Endpoint | Method | Description | Source File |
| :--- | :--- | :--- | :--- |
| `/api/user/auth/register` | `POST` | Registers a new user account. Returns the new user's details. | |
| `/api/user/auth/login` | `POST` | Authenticates a user with email and password. Returns an access token. | |
| `/api/user/applications/` | `GET` | Lists all applications submitted by the current user. | |
| `/api/user/applications/` | `POST` | Creates a new application for a specified service. | |
| `/api/user/applications/{application_id}` | `GET` | Retrieves the details of a specific application. | |
| `/api/user/applications/documents` | `POST` | Attaches metadata for an uploaded document to an application. | |
| `/api/user/applications/{application_id}/documents` | `GET` | Lists all documents associated with a specific application. | |
| `/api/user/documents/` | `GET` | Lists all documents uploaded by the current user across all applications. | |
| `/api/user/payments/` | `POST` | Creates a new payment record for an application. | |
| `/api/user/payments/application/{application_id}` | `GET` | Lists all payments made for a specific application. | |

-----

#### Admin Endpoints (`/api/admin/`)

These endpoints are for authenticated officers to review and manage applications and documents. All of these routes require a valid JWT token associated with an officer account.

| Endpoint | Method | Description | Source File |
| :--- | :--- | :--- | :--- |
| `/api/admin/applications/` | `GET` | Lists all applications in the system. | |
| `/api/admin/applications/{application_id}` | `GET` | Retrieves the details of a specific application for review. | |
| `/api/admin/applications/{application_id}/status` | `POST` | Updates the status of an application. | |
| `/api/admin/applications/{application_id}/logs` | `GET` | Retrieves the log history for a specific application. | |
| `/api/admin/documents/` | `GET` | Lists all documents uploaded across all applications. | |
| `/api/admin/documents/{document_id}/verify` | `POST` | Sets the verification status for a specific document. | |

-----

### Prerequisites

To set up and run this project, you will need the following installed on your machine:

* Python (3.8+)
* Node.js (18+)
* pnpm (or npm/yarn if you prefer, but `pnpm` is used in the lockfile)
* PostgreSQL database instance

-----

### Setup Instructions

Follow these steps to get the project running on your local machine.

#### 1\. Backend Setup

1.  Navigate to the `backend` directory.
    ```sh
    cd backend
    ```
2.  Install the required Python packages. If you face an issue with the `pip` command not being recognized, use `python -m pip` instead.
    ```sh
    python -m pip install -r requirements.txt
    ```
3.  **Database Configuration**: The project is set up to use PostgreSQL. You must have a database running. Open `backend/db/lro_backend_models.py` and update the `DATABASE_URL_ASYNC` with your database credentials.
    ```python
    DATABASE_URL_ASYNC = "postgresql+asyncpg://user:password@localhost:5432/lro_db"
    ```
4.  The database schema is defined in `backend/db/lro_backend_models.py`. You'll need to create the tables. The models file includes a helper function `create_all_tables()` for development purposes, but for a production environment, it is highly recommended to use a migration tool like Alembic.

#### 2\. Frontend Setup

1.  Navigate to the `Frontend` directory.
    ```sh
    cd Frontend
    ```
2.  Install the Node.js dependencies using pnpm.
    ```sh
    pnpm install
    ```

-----

### Running the Application

Once both the backend and frontend are configured, you can start them separately.

#### 1\. Start the Backend Server

From the `backend` directory, run the following command:

```sh
Uvicorn main:app --reload
````

The backend API will be available at `http://127.0.0.1:8000`.

#### 2\. Start the Frontend Server

From the `Frontend` directory, run the following command:

```sh
pnpm dev
```
-----

### Admin Dashboard

The admin dashboard provides a centralized interface for managing the Digital Land Registry Hub. Key features include:

* **Dashboard Overview**: View key metrics such as total applications, pending reviews, and active users.
* **Application Management**: Table to view, filter, and manage applications. Includes search, sorting, and bulk actions.
* **Document Verification**: Interface for verifying uploaded documents with an AI-powered authenticity score and side-by-side preview.
* **Appointment Scheduling**: Calendar system (day/week/month) for managing applicant appointments.
* **Analytics and Reports**: Charts and graphs showing trends, SLA performance, rejection reasons, and activity peaks.
* **User Management**: Manage user accounts, roles, and permissions.
* **Audit Logs**: Security logs for tracking all admin activities.
* **Notifications**: Create and broadcast system-wide notifications.
* **Profile Management**: Admin profile settings, including password changes and activity history.

-----

### File and Folder Structure

Team-Imprez_digital-land-registry-admin/
├── app/
│ ├── admin/
│ │ ├── analytics/
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── applications/
│ │ │ ├── [id]/page.tsx
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── appointments/
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── audit/
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── Header.tsx
│ │ │ └── Sidebar.tsx
│ │ ├── documents/
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── notifications/
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── profile/
│ │ │ ├── activity-log/page.tsx
│ │ │ ├── change-password/page.tsx
│ │ │ └── settings/page.tsx
│ │ ├── reports/page.tsx
│ │ ├── users/page.tsx
│ │ ├── layout.tsx
│ │ ├── loading.tsx
│ │ └── page.tsx
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── auth/
│ │ ├── LoginForm.tsx
│ │ └── RegisterForm.tsx
│ ├── dashboard/Dashboard.tsx
│ ├── layout/Header.tsx
│ ├── ui/ # Shadcn UI components
│ │ ├── accordion.tsx
│ │ ├── alert-dialog.tsx
│ │ ├── alert.tsx
│ │ └── ...
│ └── theme-provider.tsx
├── hooks/
│ ├── use-mobile.ts
│ └── use-toast.ts
├── lib/
│ ├── api.ts
│ └── utils.ts
├── public/
│ ├── document-stack.png
│ ├── placeholder-user.jpg
│ ├── sri-lanka-logo.png
│ └── survey-plan.png
├── styles/globals.css
├── .gitignore
├── README.md
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json

