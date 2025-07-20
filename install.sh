#!/bin/bash

echo "Installing Task List App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "Node.js version: $(node -v)"

# Install dependencies
echo "Installing dependencies..."

npm install

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installation complete!"
echo ""
echo "Next steps:"
echo "1. Copy backend/env.example to backend/.env"
echo "2. Copy frontend/env.example to frontend/.env.local"
echo "3. Set up MongoDB Atlas and AWS Cognito"
echo "4. Update the .env files with your credentials"
echo "5. Run: cd backend && npm run dev"
echo "6. Run: cd frontend && npm run dev"
echo ""
echo "See README-JUNIOR.md for detailed instructions" 