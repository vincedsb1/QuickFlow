# QuickFlow Project Context

## Project Overview
QuickFlow is a collaborative decision-making platform designed to help organizations manage ideas and votes. Users can submit ideas, comment, vote, and follow the status of various proposals within their organization.

This project is built using the "Wild Code School" JS Fullstack Template, following a Monorepo structure containing both client and server applications.

## Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State/Routing**: React Router DOM, React Context
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (using `mysql2` driver)
- **Authentication**: JWT (`jsonwebtoken`) + Argon2 hashing
- **File Uploads**: Multer

## Getting Started

### 1. Installation
Install dependencies for both frontend and backend from the root directory:
```bash
npm install
```

### 2. Environment Configuration
Create `.env` files in both `backend` and `frontend` directories based on the samples:
- `backend/.env` (from `backend/.env.sample`) - Configure DB credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`=quickflow_db) and `APP_PORT`.
- `frontend/.env` (from `frontend/.env.sample`) - Configure `VITE_BACKEND_URL`.

### 3. Database Setup
Ensure your MySQL server is running, then execute the migration script to create the schema and seed data:
```bash
npm run migrate
```
*Note: This runs `backend/migrate.js`, which executes `backend/database.sql`.*

### 4. Running the Application
Start both backend and frontend concurrently in development mode:
```bash
npm run dev
```
- **Frontend**: http://localhost:3000 (default Vite port)
- **Backend**: http://localhost:5000 (or as defined in .env)

### Alternative Commands
- `npm run dev-front`: Start only frontend.
- `npm run dev-back`: Start only backend.

## Project Structure

### Root
- `backend/`: Server-side application code.
- `frontend/`: Client-side React application.
- `package.json`: Orchestration scripts for the monorepo.

### Backend (`backend/src`)
- `app.js`: Express application configuration.
- `controllers/`: Request handlers (e.g., `idee.controller.js`, `user.controller.js`).
- `models/`: Database interaction layer (Managers).
- `routes/`: API route definitions.
- `auth/`: Authentication middleware.

### Frontend (`frontend/src`)
- `pages/`: Main views (e.g., `Dashboard.jsx`, `NewIdea.jsx`).
- `components/`: Reusable UI components.
- `contexts/`: React Context providers (`UserContext`, `OrgaContext`).
- `services/`: API calls and utilities.

## Database Schema (Key Tables)
- **user**: Users with hashed passwords and profile info.
- **organisation**: Organizations managing ideas.
- **idee**: The core entity (Ideas) with status, content, and dates.
- **vote / like_idee**: Tracking user engagement.
- **commentaire**: Discussions on ideas.
- **role**: User roles within the system (admin, decisionnaire, etc.).

## Development Workflow
- **Linting**: The project uses ESLint and Prettier.
    - Run `npm run lint` to check code quality.
    - Run `npm run fix` to auto-fix issues.
- **Commit Hooks**: Husky is configured to run checks on commit.
