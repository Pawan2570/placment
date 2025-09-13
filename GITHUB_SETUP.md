# 🚀 GitHub Setup Guide for Placement Day Planner

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `placement-day-planner`
   - Description: `Modern React application for tracking placement day study plans with timers and progress tracking`
   - Make it **Public** (so others can see your work)
   - **Don't** initialize with README (we already have one)
   - **Don't** add .gitignore (we already have one)
5. **Click "Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/placement-day-planner.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Alternative - Using GitHub CLI (if you have it installed)

```bash
# Create repository directly from command line
gh repo create placement-day-planner --public --description "Modern React application for tracking placement day study plans with timers and progress tracking"

# Push the code
git push -u origin main
```

## Step 4: Enable GitHub Pages (Optional)

To host your app on GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Create a workflow file for React deployment

## Step 5: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## 🎯 Your Repository Will Include:

- ✅ **Complete React Application** with modern UI
- ✅ **Study Plans** for Day 1 & Day 2 placement preparation
- ✅ **Timer System** with notifications and sound alerts
- ✅ **Progress Tracking** with visual progress bars
- ✅ **CSV Export** functionality
- ✅ **Responsive Design** for all devices
- ✅ **Professional README** with setup instructions
- ✅ **Clean Code Structure** with components and hooks

## 📱 Features Showcase:

Your GitHub repository will demonstrate:
- React development skills
- Modern UI/UX design
- State management with hooks
- Local storage integration
- Timer functionality
- CSV data export
- Responsive design
- Professional project structure

## 🔗 After Pushing:

1. **Repository URL**: `https://github.com/YOUR_USERNAME/placement-day-planner`
2. **Live Demo**: If you enable GitHub Pages, it will be available at `https://YOUR_USERNAME.github.io/placement-day-planner`
3. **Portfolio**: This will be a great addition to your portfolio!

## 💡 Pro Tips:

- Add screenshots to your README
- Use descriptive commit messages
- Keep your repository updated
- Add issues and pull requests for future improvements
- Star your own repository to show it's important to you

---

**Ready to push? Follow the steps above and your React Placement Day Planner will be live on GitHub! 🚀**
