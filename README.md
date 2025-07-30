# How to run

########## NOTE ##########
I couldn't perform the Auth with (AWS) because AWS has
an approval period for the free tier profile of 3 to 5
days and that is outside the time limit that you set for
me to deliver the test, that's why I used FIREBASE
##########################

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

## Deploy to Render

This application is configured for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Setup:
1. Connect your GitHub repository to Render
2. Use the `render.yaml` file for automatic service configuration
3. Set up environment variables as described in `DEPLOYMENT.md`
4. Deploy both backend and frontend services

The application will be available at:
- Backend: `https://task-list-backend.onrender.com`
- Frontend: `https://task-list-frontend.onrender.com`
