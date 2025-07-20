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
- AWS Amplify for auth

**Backend:**

- Express.js
- GraphQL
- MongoDB
- JWT for auth

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
JWT_SECRET=your-secret-key
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-pool-id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
```

### 3. Set up services

**MongoDB Atlas:**

1. Go to mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Put it in MONGODB_URI

**AWS Cognito:**

1. Go to aws.amazon.com
2. Create account (free tier)
3. Find Cognito service
4. Create User Pool
5. Get Pool ID and Client ID

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

1. User logs in with AWS Cognito
2. Frontend sends GraphQL requests to backend
3. Backend checks JWT token
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
