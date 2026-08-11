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
git clone https://github.com/munnadotin/DEEP-LMS
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


Haan bhai. **Ab complete project deploy karte hain Render par, Docker ke saath.** Tumhara setup already local Docker Compose mein chal raha hai, so ab bas usko production services mein todna hai.

Tumhara final architecture:

```text
GitHub: LMS
│
├── client/
│   └── Dockerfile
│
├── server/
│   └── Dockerfile
│
└── docker-compose.yml       ← local development
```

Production:

```text
Render
├── Client → Docker Web Service
├── Server → Docker Web Service
└── Redis  → Key Value / Redis service

MongoDB Atlas → already external
SMTP → already external
```

## 1. Pehle Server deploy karo

Render Dashboard → **New → Web Service**

GitHub ka `LMS` repo select karo.

Settings:

```text
Name: lms-server
Root Directory: server
Runtime: Docker
Instance Type: Free
```

Render `server/Dockerfile` automatically use karega.

### Environment variables

Server ke `.env` ko **copy-paste values ke saath Render ke Environment Variables mein daalo**:

```text
MONGODB_URI=...
JWT_SECRET=...
REDIS_URL=...
SMTP_HOST=...
SMTP_PORT=...
SMTP_USER=...
SMTP_PASSWORD=...
```

`.env` GitHub par upload mat karna.

### Port

Server code mein ensure karo:

```js
app.listen(process.env.PORT || 5000, "0.0.0.0");
```

Agar already aisa hai, kuch mat change karo.

**Deploy Web Service** dabao.

Deploy successful hone ke baad Render tumhe URL dega:

```text
https://lms-server-xxxx.onrender.com
```

Is URL ko copy kar lena.

---

# 2. Redis deploy karo

Render Dashboard:

**New → Key Value**

Name:

```text
lms-redis
```

Free option available ho toh select karo.

Redis create hone ke baad Render jo connection information/environment variable deta hai, usse server ke:

```text
REDIS_URL
```

mein set karo.

⚠️ Local wala:

```text
redis://redis:6379
```

**production mein use mat karna.**

Ye sirf Compose ke andar kaam karta hai.

Production mein:

```text
Server → Render Redis
```

hoga.

Redis variable update karne ke baad server redeploy/restart kar dena.

---

# 3. Ab Client deploy karo

Render → **New → Web Service**

Same `LMS` GitHub repo select karo.

Settings:

```text
Name: lms-client
Root Directory: client
Runtime: Docker
Instance Type: Free
```

Ab Render:

```text
LMS/client/Dockerfile
```

use karega.

---

# 4. Client environment variables

Yahan **Next.js ka important part** hai.

Agar tumhara frontend backend ko:

```env
NEXT_PUBLIC_API_URL=...
```

se access karta hai, toh Render client service mein:

```text
NEXT_PUBLIC_API_URL=https://lms-server-xxxx.onrender.com
```

set karo.

**Tumhare actual variable ka naam jo code mein hai wahi use karna.**

Agar Next.js variable `NEXT_PUBLIC_*` hai, toh yaad rakho ki Docker build ke time bhi uski zarurat pad sakti hai. Isliye agar tumhare Dockerfile mein:

```dockerfile
RUN npm run build
```

hai aur build ke waqt `NEXT_PUBLIC_API_URL` chahiye, toh Render ke build environment mein variable available hona zaroori hai.

---

# 5. Client Dockerfile check

Production ke liye client mein:

```dockerfile
CMD ["npm", "start"]
```

hona chahiye.

**Ye nahi:**

```dockerfile
CMD ["npm", "run", "dev"]
```

Aur Next.js ko Render ke port par listen karna chahiye.

Agar standard Next.js start command use kar rahe ho, generally:

```dockerfile
CMD ["npm", "start"]
```

enough hota hai, provided your app's `start` script is configured appropriately.

---

# 6. CORS check

Ab ek common production error aa sakta hai.

Local mein:

```text
client → localhost:5000
```

tha.

Production mein:

```text
client
   ↓
https://lms-server-xxxx.onrender.com
```

hai.

Server mein CORS agar hardcoded hai:

```js
origin: "http://localhost:3000"
```

toh production client block ho jayega.

Instead production client URL allow karo, e.g.:

```text
https://lms-client-xxxx.onrender.com
```

Tumhare existing CORS setup ke according isko configure karna hoga.

---

# 7. Final architecture

Deploy hone ke baad:

```text
             Internet
                 │
                 ▼
       ┌─────────────────┐
       │ Render Client   │
       │ Next.js + Docker│
       └────────┬────────┘
                │
                │ HTTPS API
                ▼
       ┌─────────────────┐
       │ Render Server   │
       │ Node + Docker   │
       └──────┬─────┬────┘
              │     │
              ▼     ▼
           Redis   MongoDB Atlas
                    │
                    ▼
                 Database
```

---

## ⚠️ `docker-compose.yml` ka kya?

**Usko production mein deploy karne ki zarurat nahi hai.**

Ye tumhare local setup ke liye hai:

```bash
docker compose up
```

Production mein Render individual services manage karega:

```text
Render Client  → client/Dockerfile
Render Server  → server/Dockerfile
Render Redis   → managed Redis
```

---

## Sabse fast order

Main exactly is order mein karunga:

```text
1. Redis create
       ↓
2. Server Render Web Service
       ↓
3. Server env variables
       ↓
4. REDIS_URL connect
       ↓
5. Server deploy
       ↓
6. Server URL copy
       ↓
7. Client Render Web Service
       ↓
8. NEXT_PUBLIC_API_URL = server URL
       ↓
9. Client deploy
       ↓
10. CORS = client URL
       ↓
11. Test login/API
```

**Aur bhai, deployment ke time ek golden rule:** ek saath 15 cheezein change mat karna. **Server deploy → logs check → server URL → client deploy → client logs.** Jahan error aaye, wahi fix. Isse debugging bahut easy rahegi.
