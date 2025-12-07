# Deployment Guide for Render

## Overview
This application consists of two services that need to be deployed on Render:
1. **Backend API** (Node.js/Express with GraphQL)
2. **Frontend** (Next.js)

## Prerequisites
- MongoDB database (MongoDB Atlas recommended)
- Firebase project with Authentication enabled
- Render account

## Environment Variables Setup

### Backend Environment Variables
Set these in your Render backend service:

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasklist
AWS_REGION=your-region
COGNITO_USER_POOL_ID=your-pool-id
COGNITO_USER_POOL_CLIENT_ID=your-pool-client
```

### Frontend Environment Variables
Set these in your Render frontend service:

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_COGNITO_AUTHORITY=your-project
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-service-client-aws
NEXT_PUBLIC_COGNITO_DOMAIN=your-domain-aws
```

## Deployment Steps

### 1. Set up MongoDB
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add the connection string to your backend environment variables

### 2. Set up Firebase
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create a service account and download the JSON file
4. Add the service account details to your backend environment variables
5. Add the Firebase config to your frontend environment variables

### 3. Deploy on Render
1. Connect your GitHub repository to Render
2. Create two web services:
   - **Backend**: Use the `render.yaml` configuration
   - **Frontend**: Use the `render.yaml` configuration
3. Set all environment variables in each service
4. Deploy both services

### 4. Update Frontend URL
After deployment, update the `NEXT_PUBLIC_GRAPHQL_URL` in your frontend service to point to your actual backend URL.

## Important Notes

- The backend service will be available at: `https://task-list-backend-hlj0.onrender.com`
- The frontend service will be available at: `https://task-list-frontend-vr8s.onrender.com`
- Make sure to update the CORS origins in the backend if your frontend URL changes
- The `render.yaml` file is configured for automatic deployment

## Troubleshooting

1. **Build fails**: Check that all dependencies are properly listed in `package.json`
2. **Environment variables**: Ensure all required variables are set in Render
3. **CORS errors**: Verify the frontend URL is included in the backend CORS configuration
4. **Database connection**: Check that the MongoDB URI is correct and accessible
5. **Firebase authentication**: Ensure Firebase service account credentials are properly formatted

## Local Development
To run locally:
```bash
npm run install:all
npm run dev
```

This will start both frontend (port 3000) and backend (port 4000) in development mode. 