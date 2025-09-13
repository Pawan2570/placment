#!/bin/bash

echo "========================================"
echo "   GitHub Push Script for Placement Day Planner"
echo "========================================"
echo

echo "Step 1: Create a new repository on GitHub.com"
echo "- Go to https://github.com/new"
echo "- Repository name: placement-day-planner"
echo "- Description: Modern React application for tracking placement day study plans"
echo "- Make it Public"
echo "- Don't initialize with README or .gitignore"
echo "- Click 'Create repository'"
echo

echo "Step 2: Copy your repository URL from GitHub"
echo "- It will look like: https://github.com/YOUR_USERNAME/placement-day-planner.git"
echo

read -p "Enter your GitHub repository URL: " REPO_URL

echo
echo "Adding remote repository..."
git remote add origin $REPO_URL

echo
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo
echo "========================================"
echo "   SUCCESS! Your code is now on GitHub!"
echo "========================================"
echo
echo "Your repository is available at:"
echo $REPO_URL
echo
echo "To enable GitHub Pages for live demo:"
echo "1. Go to your repository Settings"
echo "2. Scroll to Pages section"
echo "3. Select 'GitHub Actions' as source"
echo
