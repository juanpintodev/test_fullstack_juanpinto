# Task List App

A simple task list app with login and CRUD operations.

## What it does

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as done
- User login/logout
- Store data in cloud database

## Tech Stack

**Frontend:**

- Next.js
- Material-UI
- GraphQL
- Firebase Authentication

**Backend:**

- Express.js
- GraphQL
- MongoDB
- Firebase Admin SDK

## How to run

### 1. Install dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set up environment variables

**Backend (.env):**

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasklist
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. Set up services

**MongoDB Atlas:**

1. Go to mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Put it in MONGODB_URI

**Firebase:**

1. Go to console.firebase.google.com
2. Create new project
3. Enable Authentication (Email/Password)
4. Get configuration from Project Settings
5. Download Service Account key for backend

### 4. Run the app

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Project structure

## How it works

1. User logs in with Firebase Authentication
2. Frontend sends GraphQL requests to backend with Firebase ID token
3. Backend verifies Firebase ID token
4. Backend saves/gets data from MongoDB
5. Frontend shows the data

## Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```
