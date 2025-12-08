# Deployment Guide for Render

## Overview
This application consists of two services that need to be deployed on Render:
1. **Backend API** (Node.js/Express with GraphQL)
2. **Frontend** (Next.js)

## Prerequisites
- MongoDB database (MongoDB Atlas recommended)
- Cognito project with Authentication enabled
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

### 2. Set up Cognito AWS
Sign in to the AWS Management Console and navigate to the Cognito service.

Click "Manage User Pools."

Click "Create a user pool."

Enter a name for your User Pool (for example, MyAppUserPool).

In the "Step-by-step setup" section, click "Review defaults" or select "Step-by-step" if you want to customize each setting.

If you chose "Step-by-step," you will need to configure the following:

Attributes: Define which user attributes are required (e.g., email) and which are optional. You can also configure whether the username is the primary sign-in method or if email or phone number will be used.

Policies: Set password security requirements (length, capitalization, etc.).

MFA (Multi-Factor Authentication): Configure whether to enable MFA (e.g., with SMS or TOTP) and whether it will be optional or required.

Message customizations: Edit the templates for verification and welcome emails and SMS messages.

Tags: Optional, for organizing AWS resources.

Device access: Configure device recall (optional).

App clients: This is a key step. Create a new "App client" that your application (frontend/backend) will use to interact with Cognito. Be sure to uncheck the "Generate client secret" box if your client is a web or mobile (browser-based) application.

Triggers: Assign AWS Lambda functions to customize authentication flows (optional).

Review: Review all configurations.

Click "Create pool."

Once created, save the User Pool ID and the App Client ID (found in the "General settings" and "App integration" or "App clients" tabs), as you will need them to configure your application.

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
5. **Cognito authentication**: Ensure Cognito service account credentials are properly configuration

## Local Development
To run locally:
```bash
npm run install:all
npm run dev
```

This will start both frontend (port 3000) and backend (port 4000) in development mode. 