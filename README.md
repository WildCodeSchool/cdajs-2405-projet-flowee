# 🧠 Flowee - Project Management Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Apollo](https://img.shields.io/badge/Apollo-GraphQL-311C87?logo=apollo-graphql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-1.21.x-009639?logo=nginx)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/WildCodeSchool/cdajs-2405-projet-flowee)

Flowee is a SaaS application built to streamline project management between companies and their clients. By centralizing communications and tracking deliverables, Flowee enhances visibility, organization, and accountability across all stages of a project.

---

## 🌍 Overview

Flowee provides a secure and adaptive platform that includes:
- 🧾 Client profile management
- 📁 Project and deliverable tracking
- ✅ Task assignment and status updates
- 📊 Role-based dashboards
- 🔐 Built-in authentication and access control

---

## 💡 Tech Stack

### Backend
- Node.js
- TypeORM
- TypeGraphQL
- Apollo Server
- PostgreSQL

### Frontend
- React
- Apollo Client
- Tailwind CSS
- TypeScript

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/flowee.git
cd flowee
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Edit the `.env` file to match your database/user/port config.

### 3. First Launch (Development)
```bash
make first-launch
```

---

## 🐳 Docker & Makefile

### Start Containers
```bash
make run
```

### Stop Containers
```bash
make stop
```

### Restart Containers
```bash
make restart
```

---

## 💾 PostgreSQL Management

### 🗃️ Roles
| Role               | Username          | Purpose                                | Created via           |
|--------------------|-------------------|----------------------------------------|------------------------|
| **Superadmin**     | `postgres`        | Create roles and databases             | `init_db_user.ts`      |
| **Application user** | `flowee_user`   | Used by app & TypeORM for operations   | `dataSource.ts`        |

### 🔧 Initialize DB
```bash
make init-db-user
```
Executes:
- User & DB creation
- Full privileges on schema, tables, sequences

Run this when:
- `.env` changes (DB_USER / DB_NAME)
- You reset your DB container

### 🧼 Cleanup Test DB/User
```bash
make clean-test-users
```

### 🔄 Reset DB Schema
```bash
make reset-db
```

---

## 🔁 TypeORM Migrations

### Generate a migration
```bash
make migration-generate
```

### Apply migrations
```bash
make migrations
```

### Revert last migration
```bash
make migration-revert
```

### Create empty migration
```bash
make migration-create
```

---

## 🌱 Seed Data

```bash
make seed
```

Seeds initial records like an admin account.

---

## 🧪 Dev Tools

### Access backend shell
```bash
make bash
```

### View container logs
```bash
make logs
```

### Check if backend is running
```bash
make check-backend
```

### Display DB user
```bash
make whoami
```

---

## 🗂️ Project Structure
```
backend/
  └── src/
       ├── entities/       # TypeORM Entities
       ├── migration/      # SQL Migrations
       ├── scripts/        # DB init, seed, cleanup
       └── dataSource/     # TypeORM config
frontend/
  └── ...                  # React app
```

---

## 🏗️ Architecture

Flowee follows a modern 3-tier architecture:

### 1. Presentation Layer (Frontend)
- React + Tailwind
- Atomic Design (Atoms, Molecules, Organisms)
- Apollo Client for state & GraphQL

### 2. Business Logic Layer (Backend)
- Apollo Server + TypeGraphQL
- Authorization, resolvers, and input validation

### 3. Persistence Layer (Database)
- PostgreSQL
- TypeORM (entities, migrations, relations)

---

## 🔄 CI / CD

Flowee uses GitHub Actions for CI/CD workflows:

### ✅ Automated Tests
- Unit (Jest)
- Integration (API <-> Frontend)
- Linting + TypeScript validation

### 🚀 Deployment Pipeline
- `dev`: auto deploy on every push
- `staging`: auto deploy on PR merge
- `main`: validated production deployment

---

## 📜 License
MIT

---

## ❤️ About

Flowee was created to help freelancers and small businesses better collaborate with clients. Its goal is to make project communication structured, traceable, and simple.
