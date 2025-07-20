#!/bin/bash

echo "Setting up Git repository for Task List Application..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
else
    echo "Git repository already exists."
fi

# Add all files
echo "Adding files to Git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Task List Application with authentication and CRUD operations

- Frontend: Next.js with TypeScript, Material-UI, AWS Amplify
- Backend: Express.js with TypeScript, GraphQL, MongoDB
- Authentication: AWS Cognito
- Testing: Jest unit tests + Cypress e2e tests
- Cloud Function: markTaskAsDone resolver
- Complete CRUD operations for tasks"

echo ""
echo " Git repository setup completed!"
echo ""
echo " Next steps to push to GitHub:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Choose repository name (e.g., 'task-list-app')"
echo "   - Make it public or private as needed"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. Connect and push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Alternative: Use GitHub CLI if installed:"
echo "   gh repo create task-list-app --public --source=. --remote=origin --push"
echo ""
echo " Repository structure:"
echo "├── backend/          # Express.js + GraphQL API"
echo "├── frontend/         # Next.js application"
echo "├── README.md         # Project documentation"
echo "├── package.json      # Root package.json"
echo "└── install.sh        # Installation script"
echo ""
echo " Remember to:"
echo "- Set up environment variables (.env files)"
echo "- Configure AWS Cognito and MongoDB Atlas"
echo "- Update README.md with your specific setup instructions" 