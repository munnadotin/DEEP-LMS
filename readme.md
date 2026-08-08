# Introduction

**DEEP LMS** is a full-stack Learning Management System (LMS) designed to provide a structured platform for educators to create and publish courses and for students to enroll in courses, track their learning progress, and complete lessons.

Educators can manage their courses through chapters and lessons, while students can access their enrolled courses, continue learning from where they left off, and mark lessons as completed.

The project is built with a focus on **clean backend architecture, role-based access control, authentication, course management, enrollment, and progress tracking**, making it more than a basic CRUD application.

## Tech Stack
### Frontend
- Nextjs
- TypeScript
- Tailwind css
### Backend
- Nodejs
- Express
- TypeScript
### Database
- MongoDB

### Authentication & Security
- JWT
- bcrypt
- HTTP-only Cookies
- Role-Based Access Control

### Caching
- Redis
- Docker

### Development Tools
- Git
- GitHub
- Postman
## Frontend Environment variables
```
NEXT_PUBLIC_SERVER_URL = http://localhost:5000
```
## Backend Environment variables
```
PORT=5000
MONGODB_URL=mongodb+srv://xxxx.mongodb.net/LMS
JWT_SECRET=xxxxxx
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mygmail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
imageKitPrivateKey=private_xxxxxxxx=
RAZORPAY_API_KEY=rzp_test_xxxxxx
RAZORPAY_SECRET_KEY=xxxxxxx
```
### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/munnadotin/Learning-Management-System-LMS-
cd deep-lms
```

#### 2. Install dependencies

Install dependencies for both frontend and backend:

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

#### 3. Configure environment variables

Create a `.env` file inside the `client` directory and add the required frontend environment variables.

Create a `.env` file inside the `server` directory and add the required backend environment variables.

Make sure all required environment variables are configured before starting the application.

#### 4. Start the backend

```bash
cd server
npm run dev
```

#### 5. Start the frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

The backend will run on the configured server port.
