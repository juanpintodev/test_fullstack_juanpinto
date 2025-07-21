# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas (cloud database) for the Task List Application.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Choose the free tier (M0) for development

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (Google Cloud, Azure, or AWS)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Environment Variables

Edit your `backend/.env` file:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/tasklist?retryWrites=true&w=majority
```

Replace:

- `YOUR_USERNAME` with your database username
- `YOUR_PASSWORD` with your database password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- `tasklist` is the database name (you can change this)

## Step 7: Test Connection

Run the backend to test the connection:

```bash
cd backend
npm run dev
```

You should see: "MongoDB connected successfully"

## Security Notes

- Never commit your `.env` file to Git
- Use environment variables in production
- Consider using MongoDB Atlas VPC peering for production
- Regularly rotate database passwords

## Troubleshooting

### Connection Issues

- Check if your IP is whitelisted in Network Access
- Verify username and password are correct
- Ensure the cluster is running

### Authentication Issues

- Make sure the database user has the correct permissions
- Check if the connection string format is correct

### Performance Issues

- Consider upgrading from free tier for production
- Use indexes for better query performance
- Monitor your cluster usage in Atlas dashboard
