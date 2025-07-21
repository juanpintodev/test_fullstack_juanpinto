#!/bin/bash

echo " Quick Start - Task List Application"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if environment files exist
if [ ! -f "backend/.env" ]; then
    echo "  Backend .env file not found!"
    echo "   Please copy backend/env.example to backend/.env and configure it."
    echo "   See backend/src/config/ for setup guides."
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "  Frontend .env.local file not found!"
    echo "   Please copy frontend/env.example to frontend/.env.local and configure it."
fi

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo " Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo " Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo " Dependencies check completed!"
echo ""
echo " Configuration Status:"
echo "   Backend .env: $([ -f "backend/.env" ] && echo " Found" || echo " Missing")"
echo "   Frontend .env.local: $([ -f "frontend/.env.local" ] && echo " Found" || echo " Missing")"
echo "   Backend node_modules: $([ -d "backend/node_modules" ] && echo " Installed" || echo " Missing")"
echo "   Frontend node_modules: $([ -d "frontend/node_modules" ] && echo " Installed" || echo " Missing")"
echo ""

if [ ! -f "backend/.env" ] || [ ! -f "frontend/.env.local" ]; then
    echo "  Please configure your environment variables before starting the application."
    echo ""
    echo " Setup guides:"
echo "   MongoDB Atlas: backend/src/config/mongodb-setup.md"
echo "   Firebase: README.md (Firebase section)"
    echo ""
    echo " Quick setup:"
    echo "   cp backend/env.example backend/.env"
    echo "   cp frontend/env.example frontend/.env.local"
    echo "   # Then edit the files with your credentials"
    exit 1
fi

echo " Starting the application..."
echo "   Backend will run on: http://localhost:4000"
echo "   Frontend will run on: http://localhost:3000"
echo "   GraphQL Playground: http://localhost:4000/graphql"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev 