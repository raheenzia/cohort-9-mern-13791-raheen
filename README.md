# cohort-9-mern-13791-raheen
Cohort 9 — MERN (NodeJS+ReactJS) assignment for Raheen Zia

# Petal Notes

Petal Notes is a full-stack notes management application built with the MERN stack. Users can create, edit, delete, and organize their personal notes with a simple pastel-themed interface.

## Features

* User registration and login
* JWT-based authentication
* Protected notes routes
* Create, edit, and delete notes
* Rich-text note editor
* Note color selection
* Note preview cards
* User profile modal
* Note count in user profile
* Logout functionality
* HTML sanitization for rich-text content
* Error handling for API requests
* Backend logging with Pino
* Frontend unit testing with Jest and React Testing Library
* Code quality analysis with SonarQube

## Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Lucide React
* Jest
* React Testing Library

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Pino

### Development Tools

* Git & GitHub
* SonarQube Cloud

## Project Structure

```text
/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── modals/
│   │   ├── pages/
│   │   ├── tests/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── tests/
│   └── package.json
│
├── sonarqube-report/
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

### Clone the Repository

```bash
git clone https://github.com/raheenzia/cohort-9-mern-13791-raheen
cd Petal-Notes
```

## Backend Setup

Navigate to the backend:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## Authentication

Petal Notes uses JWT authentication.

After a successful login or registration, the JWT token is stored in the browser's local storage and is sent with protected API requests using the `Authorization` header:

```text
Authorization: Bearer <token>
```

Protected notes routes require a valid token.

## Notes API

The notes API provides the following operations:

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/api/notes`     | Create a note                |
| GET    | `/api/notes`     | Get the current user's notes |
| GET    | `/api/notes/:id` | Get a specific note          |
| PUT    | `/api/notes/:id` | Update a note                |
| DELETE | `/api/notes/:id` | Delete a note                |

Authentication is required for these routes.

## Testing

Frontend tests use Jest and React Testing Library.

Run the frontend tests with:

```bash
npm test
```

Run tests for a specific file:

```bash
npm test -- --runTestsByPath src/tests/NoteCard.test.js
```

Generate a coverage report:

```bash
npm test -- --coverage --watchAll=false
```

## Code Quality

SonarQube Cloud is used to analyze the project for:

* Bugs
* Code smells
* Vulnerabilities
* Duplicated code
* Test coverage
* JavaScript/TypeScript code quality

The project is configured to exclude generated files and dependencies such as `node_modules`, build files, and coverage output from source analysis.

## Git Workflow

Development was done using feature branches based on the `develop` branch.

```text
develop
   │
   ├── feature/frontend/...
   ├── feature/backend/...
   ├── feature/auth-integration
   ├── feature/logging
   ├── feature/testing
   └── feature/sonarqube-integration
```

Feature branches are merged into `develop` through pull requests.

## Environment Variables

Environment files should not be committed to Git.

Example frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Example backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Security

* Passwords are handled by the backend authentication system.
* Protected API routes use JWT authentication.
* Rich-text content is sanitized before being rendered.
* Environment variables are used for sensitive configuration.
* `.env` files should remain excluded from version control.

## Author

Developed as a MERN stack project using React, Node.js, Express, and MongoDB.
