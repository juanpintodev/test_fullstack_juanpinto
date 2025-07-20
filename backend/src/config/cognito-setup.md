# AWS Cognito Setup Guide

This guide will help you set up AWS Cognito for authentication in the Task List Application.

## Step 1: Create AWS Account

1. Go to [AWS Console](https://aws.amazon.com/)
2. Create a new account or sign in
3. Navigate to AWS Cognito service

## Step 2: Create User Pool

1. In AWS Cognito console, click "Create user pool"
2. Choose "Cognito user pool sign-in options"
3. Select "Email" as the sign-in option
4. Click "Next"

## Step 3: Configure Security Requirements

1. Choose password policy:
   - Minimum length: 8 characters
   - Require uppercase letters: Yes
   - Require lowercase letters: Yes
   - Require numbers: Yes
   - Require special characters: Yes
2. Click "Next"

## Step 4: Configure Sign-up Experience

1. Self-service account recovery: Enabled
2. User account recovery: Email
3. Click "Next"

## Step 5: Configure Message Delivery

1. Choose "Send email with Cognito"
2. Click "Next"

## Step 6: Integrate Your App

1. User pool name: "task-list-user-pool" (or your preferred name)
2. Initial app client: "task-list-client"
3. Click "Next"

## Step 7: Review and Create

1. Review your settings
2. Click "Create user pool"

## Step 8: Get Configuration Details

After creation, note down:

- User Pool ID (format: us-east-1_xxxxxxxxx)
- App Client ID (format: xxxxxxxxxxxxxxxxxxxxxxxxxx)

## Step 9: Configure App Client

1. Go to "App integration" tab
2. Click on your app client
3. Under "App client settings":
   - Enable "Cognito user pool"
   - Callback URLs: `http://localhost:3000`
   - Sign out URLs: `http://localhost:3000`
   - Allowed OAuth flows: Authorization code grant, Implicit grant
   - Allowed OAuth scopes: email, openid, profile
4. Save changes

## Step 10: Update Environment Variables

### Backend (.env)

```env
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
COGNITO_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 11: Test Authentication

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Go to `http://localhost:3000`
4. Try to sign up and sign in

## Security Best Practices

- Use strong JWT secrets
- Enable MFA for production
- Set up proper IAM roles
- Use environment variables
- Regularly rotate secrets

## Troubleshooting

### Sign-up Issues

- Check if email verification is required
- Verify password policy requirements
- Check app client configuration

### Sign-in Issues

- Verify user exists in the pool
- Check if user is confirmed
- Verify app client settings

### Token Issues

- Check JWT secret configuration
- Verify token expiration settings
- Ensure proper CORS configuration
