
---

# Task Management API

This Task Management API is a RESTful backend service that supports user registration, login, role-based access control, task management, and task notifications. Built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**, it is designed for managing tasks within teams, allowing role-specific permissions for tasks and assignments.

## Table of Contents

1. [Features](#features)
2. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Environment Variables](#environment-variables)
   - [Installation](#installation)
   - [Starting the Server](#starting-the-server)
3. [API Documentation](#api-documentation)
   - [User Endpoints](#user-endpoints)
   - [Task Management Endpoints](#task-management-endpoints)
   - [Notifications](#notifications)
4. [Assumptions & Design Decisions](#assumptions--design-decisions)
5. [License](#license)

---

## Features

- **User Registration and Authentication**: Sign up, log in, and log out with JWT token-based authentication.
- **Role-Based Access Control**: Supports roles such as Admin, Manager, and User, each with different permissions.
- **Task Management**: Create, view, update, delete, and assign tasks with CRUD operations.
- **Task Assignment**: Managers can assign tasks to team members and view assigned tasks.
- **Notifications**: Integrate with SendGrid for task assignment notifications. Optionally, set up for other notification services like nodemailer.

## Setup

### Prerequisites

- **Node.js** and **npm** installed. Download from [Node.js official site](https://nodejs.org/).
- **MongoDB** server running locally or a MongoDB Atlas URI.

### Environment Variables

Create a `.env` file in the project root directory with the following variables:

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_verified_sendgrid_email
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Starting the Server

Start the server with the following command:

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Documentation

The API documentation is generated using Swagger and available at `http://localhost:5000/api-docs` when the server is running.

### Authentication

Most endpoints require an **Authorization header** with the format:
```
Authorization: Bearer <your_token>
```

### User Endpoints

| Endpoint       | Method | Description                              | Access      |
| -------------- | ------ | ---------------------------------------- | ----------- |
| `/api/auth/register` | POST   | Register a new user with a role (Admin, Manager, User) | Public |
| `/api/auth/login`    | POST   | Log in a user and issue a JWT token      | Public      |
| `/api/auth/logout`   | POST   | Log out the authenticated user           | Authenticated |

### Task Management Endpoints

| Endpoint       | Method | Description                              | Access      |
| -------------- | ------ | ---------------------------------------- | ----------- |
| `/api/tasks`   | POST   | Create a new task                        | Admin, Manager |
| `/api/tasks`   | GET    | Get all tasks with optional filters and sorting | Admin, Manager |
| `/api/tasks/:id` | PATCH | Update a specific task by ID            | Admin, Manager |
| `/api/tasks/:id` | DELETE | Delete a task by ID                     | Admin      |
| `/api/tasks/assign` | POST   | Assign a task to a user                | Manager   |
| `/api/tasks/assigned` | GET    | View assigned tasks for authenticated user | Authenticated |

### Notifications

- **Email Notifications**: Notifications are sent using SendGrid upon task assignment or status updates.
- To configure and manage notification preferences, adjust environment variables as required for your setup.

## Assumptions & Design Decisions

1. **Role-Based Access Control**:
   - **Admin**: Has full access to all endpoints and user management.
   - **Manager**: Can create tasks, assign them, and manage tasks within their team.
   - **User**: Can view and manage only their assigned tasks.

2. **Task Notifications**:
   - Task assignment notifications are sent via email using SendGrid. Optionally, replace SendGrid with **nodemailer** if preferred.

3. **Task Assignment and Management**:
   - Only managers have permissions to assign tasks to users, supporting team-based task allocation.
   - CRUD operations on tasks are restricted by role to ensure security and task integrity.



