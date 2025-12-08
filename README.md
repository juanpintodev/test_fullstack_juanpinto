# How to run


# 1. Install dependencies

```bash
npm install
cd backend && npm install
cd frontend && npm install
```

# 2. Set up environment variables "If you have a Firebase and a MongoDB account"

**Backend (.env):**

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasklist
AWS_REGION=your-region
COGNITO_USER_POOL_ID=your-pool-id
COGNITO_USER_POOL_CLIENT_ID=your-pool-client
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_COGNITO_AUTHORITY=your-project
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-service-client-aws
NEXT_PUBLIC_COGNITO_DOMAIN=your-domain-aws

```

######## ELSE ###########

**Backend (.env):**
I will send you a separate file by email with the content for
the configuration you need to do for the .env in the
backend folder

**Frontend (.env.local):**
I will send you a separate file by email with the content for
the configuration you need to do for the .env in the
frontend folder

### 3. Run the app

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
3. Backend verifies Cognito ID token
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
git remote add origin https://github.com/juanpintodev/test_fullstack_juanpinto.git
git push -u origin main
```

## Deploy to Render

This application is configured for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Setup:
1. Connect your GitHub repository to Render
2. Use the `render.yaml` file for automatic service configuration
3. Set up environment variables as described in `DEPLOYMENT.md`
4. Deploy both backend and frontend services

The application will be available at:
- Backend: `https://task-list-frontend-vr8s.onrender.com`
- Frontend: `https://task-list-backend-hlj0.onrender.com`
