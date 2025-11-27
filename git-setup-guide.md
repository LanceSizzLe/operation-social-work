# Git Setup Guide for Operation: Social Work

## What is Git?
Git is a version control system that tracks changes to your code over time. Think of it as a "save game" system for your project - you can go back to any previous version, see what changed, and never lose your work.

GitHub is a website that hosts Git repositories online, making it easy to:
- Back up your code in the cloud
- Access your code from any computer
- Collaborate with others
- Track your project's history

---

## Prerequisites

Before we start, you'll need:
1. A GitHub account (free) - Sign up at https://github.com
2. Git installed on your computer

### Check if Git is Already Installed

**On Windows:**
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. In the black window that opens, type: `git --version`
4. If you see a version number (like `git version 2.40.0`), you're good to go!
5. If you see an error, proceed to installation below

**On Mac:**
1. Press `Command + Space` to open Spotlight
2. Type `terminal` and press Enter
3. In the terminal window, type: `git --version`
4. If you see a version number, you're ready!
5. If not, macOS will prompt you to install it automatically

**On Linux:**
- Open Terminal and type: `git --version`
- If not installed, install via: `sudo apt-get install git` (Ubuntu/Debian) or `sudo yum install git` (Fedora)

---

## Part 1: Installing Git (If Needed)

### Windows Installation
1. Go to https://git-scm.com/download/win
2. Download the installer (it starts automatically)
3. Run the downloaded file
4. Click "Next" through most screens (default settings are fine)
5. **Important**: When asked about "Adjusting your PATH environment", select "Git from the command line and also from 3rd-party software"
6. Complete the installation
7. Restart your computer

### Mac Installation
- Git usually comes with Xcode Command Line Tools
- If prompted, just follow the installation dialog
- Or download from: https://git-scm.com/download/mac

### Linux Installation
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# Fedora
sudo yum install git

# Arch
sudo pacman -S git
```

---

## Part 2: Setting Up Git for the First Time

After installing Git, you need to tell it who you are. This information will be attached to your commits (saved changes).

**Open Command Prompt (Windows) or Terminal (Mac/Linux) and type:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Casey Casefile"
git config --global user.email "casey@university.ac.za"
```

**Verify your settings:**
```bash
git config --list
```

You should see your name and email listed.

---

## Part 3: Creating a GitHub Account

1. Go to https://github.com
2. Click "Sign up" in the top right
3. Enter your email address
4. Create a password (make it strong!)
5. Choose a username (e.g., "casey-casefile" or "yourname-dev")
6. Complete the verification
7. Verify your email address (check your inbox)

**✅ You now have a GitHub account!**

---

## Part 4: Creating Your Project Repository on GitHub

1. **Log into GitHub** at https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `operation-social-work` (no spaces!)
   - **Description**: "Educational gamified support tool for BSWP471: Social Work Practicum B"
   - **Visibility**: Choose "Private" (only you can see it) or "Public" (anyone can see it)
   - **✅ Check** "Add a README file"
   - **Add .gitignore**: Select "None" (we'll create our own)
   - **Choose a license**: Select "MIT License" (or leave as "None")
5. Click **"Create repository"**

**✅ Your online repository is created!**

---

## Part 5: Connecting Your Local Files to GitHub

Now we'll connect the game files on your computer to GitHub.

### Step 1: Create a Project Folder

1. Create a new folder on your computer for the project
   - **Windows**: Right-click on Desktop → New → Folder → Name it "operation-social-work"
   - **Mac**: Right-click on Desktop → New Folder → Name it "operation-social-work"
   - **Or** create it anywhere you prefer (Documents, Projects folder, etc.)

2. Copy your game file (`operation-social-work-world1.html`) into this folder

### Step 2: Open Terminal/Command Prompt in Your Project Folder

**Windows:**
1. Open File Explorer
2. Navigate to your `operation-social-work` folder
3. Click in the address bar (where the path shows)
4. Type `cmd` and press Enter
5. A Command Prompt window opens in that folder

**Mac:**
1. Open Finder
2. Navigate to your `operation-social-work` folder
3. Right-click the folder
4. Hold down the `Option` key
5. Click "Copy 'operation-social-work' as Pathname"
6. Open Terminal (Applications → Utilities → Terminal)
7. Type `cd ` (with a space after cd)
8. Paste the path (Command+V)
9. Press Enter

**Linux:**
1. Open your file manager
2. Navigate to the folder
3. Right-click → "Open in Terminal"

### Step 3: Initialize Git in Your Folder

In the terminal/command prompt, type these commands **one at a time**:

```bash
git init
```

**What this does:** Turns your folder into a Git repository. You should see: `Initialized empty Git repository`

### Step 4: Add Your Files

```bash
git add .
```

**What this does:** Stages all files in the folder to be tracked. The `.` means "everything in this folder"

### Step 5: Make Your First Commit

```bash
git commit -m "Initial commit: World 1 - Orientation Ops complete"
```

**What this does:** Saves a snapshot of your project with a message describing what you did.

### Step 6: Connect to GitHub

Now we need to link your local repository to the GitHub repository you created.

1. Go back to your GitHub repository page in your web browser
2. You should see a section called "…or push an existing repository from the command line"
3. Copy the commands shown there, which look like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/operation-social-work.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username**

4. Paste and run these commands in your terminal

**You might be prompted for your GitHub username and password.**

**Important for 2024+:** GitHub now requires a Personal Access Token instead of your password:

#### Creating a Personal Access Token (If Needed)

1. Go to GitHub.com and log in
2. Click your profile picture (top right) → Settings
3. Scroll down in the left sidebar → Click "Developer settings"
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token" → "Generate new token (classic)"
6. Give it a name: "Operation Social Work Development"
7. Select expiration: "90 days" (or custom)
8. Check the box for **"repo"** (this gives full control of private repositories)
9. Scroll down and click "Generate token"
10. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
11. Use this token as your password when Git asks for credentials

**✅ Your code is now on GitHub!**

---

## Part 6: Viewing Your Repository Online

1. Go to https://github.com/YOUR-USERNAME/operation-social-work
2. You should see your files listed!
3. Click on `operation-social-work-world1.html` to view the code

---

## Part 7: Making Changes and Updating GitHub (Your Daily Workflow)

Every time you make changes to your code, follow these steps to save them to GitHub:

### The Git Workflow (Remember these 4 commands!)

```bash
# 1. Check what files have changed
git status

# 2. Add the changed files
git add .

# 3. Commit with a descriptive message
git commit -m "Added mission 2 feedback improvements"

# 4. Push to GitHub
git push
```

### Example Workflow

Let's say you just added World 2. Here's what you do:

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Added World 2: Interview Intel with 3 missions"

# Push to GitHub
git push
```

**That's it!** Your changes are now saved online.

---

## Part 8: Best Practices & Tips

### Commit Messages
Write clear, descriptive commit messages:

**Good Examples:**
- `"Added drag-and-drop functionality to Mission 1"`
- `"Fixed timer bug in Falling Docs mission"`
- `"Improved mobile responsiveness for HUD"`
- `"Added World 2: Interview Intel"`

**Bad Examples:**
- `"updated stuff"`
- `"fix"`
- `"changes"`

### When to Commit
Commit whenever you complete a meaningful chunk of work:
- ✅ Finished a new mission
- ✅ Fixed a bug
- ✅ Added a new feature
- ✅ Improved styling
- ✅ Before trying something experimental

### Create a .gitignore File

Some files shouldn't be tracked (like system files). Create a file called `.gitignore` in your project folder:

**Create the file:**
- **Windows**: Right-click in folder → New → Text Document → Name it `.gitignore` (delete the .txt extension)
- **Mac/Linux**: In terminal, type `touch .gitignore`

**Add this content to .gitignore:**
```
# Operating System Files
.DS_Store
Thumbs.db
desktop.ini

# Editor Files
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary Files
*.tmp
*.log
node_modules/

# Personal Notes
notes.txt
TODO.txt
```

Then commit it:
```bash
git add .gitignore
git commit -m "Added .gitignore file"
git push
```

---

## Part 9: Useful Git Commands

### Viewing History
```bash
# See all commits
git log

# See a prettier version
git log --oneline --graph --decorate

# See what changed in the last commit
git show
```

### Undoing Changes

```bash
# Discard changes to a file (before committing)
git checkout -- filename.html

# Undo the last commit (but keep changes)
git reset --soft HEAD~1

# See differences in files
git diff
```

### Branching (Advanced - Optional)

Branches let you work on new features without affecting your main code:

```bash
# Create a new branch
git branch world-2-development

# Switch to that branch
git checkout world-2-development

# Or do both at once
git checkout -b world-2-development

# When done, switch back to main
git checkout main

# Merge your branch into main
git merge world-2-development
```

---

## Part 10: Troubleshooting Common Issues

### "Permission denied" error
- Your Personal Access Token might have expired
- Create a new token (see Part 5, Step 6)

### "fatal: remote origin already exists"
- You've already connected to GitHub
- To change it: `git remote set-url origin https://github.com/YOUR-USERNAME/operation-social-work.git`

### "Your branch is ahead of 'origin/main'"
- You have local commits that aren't on GitHub yet
- Run: `git push`

### "Your branch is behind 'origin/main'"
- Someone else made changes, or you made changes on another computer
- Run: `git pull` to get the latest changes

### "Merge conflict"
- Git found conflicting changes
- Open the file, look for `<<<<<<<` markers
- Edit to keep the version you want
- Then: `git add .` → `git commit -m "Resolved merge conflict"` → `git push`

### Forgot to commit before making more changes
```bash
# Stash (temporarily save) your current changes
git stash

# Make your commit
git add .
git commit -m "Previous changes"

# Bring back your stashed changes
git stash pop
```

---

## Part 11: Recommended Project Structure

As you build more worlds, organize your files like this:

```
operation-social-work/
├── README.md
├── .gitignore
├── worlds/
│   ├── world-1-orientation-ops.html
│   ├── world-2-interview-intel.html
│   ├── world-3-network-nexus.html
│   └── ...
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
├── docs/
│   ├── game-design-document.docx
│   └── development-notes.md
└── archive/
    └── old-versions/
```

---

## Part 12: Quick Reference Cheat Sheet

**Essential Commands:**
```bash
git status              # See what's changed
git add .               # Stage all changes
git commit -m "msg"     # Save changes
git push                # Upload to GitHub
git pull                # Download from GitHub
git log                 # View history
```

**First-Time Setup:**
```bash
git init                                    # Initialize repository
git remote add origin [URL]                 # Connect to GitHub
git branch -M main                          # Rename branch to main
git push -u origin main                     # First push
```

**Daily Workflow:**
```bash
git add .
git commit -m "Descriptive message here"
git push
```

---

## Next Steps

1. ✅ Install Git
2. ✅ Configure Git with your name/email
3. ✅ Create GitHub account
4. ✅ Create repository on GitHub
5. ✅ Initialize Git locally
6. ✅ Push your code to GitHub
7. 🎯 Use the daily workflow every time you make changes
8. 🎯 Commit frequently (several times per day when actively coding)

---

## Resources

- **Official Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Interactive Git Tutorial**: https://learngitbranching.js.org/
- **GitHub Desktop** (GUI alternative): https://desktop.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## Need Help?

If you get stuck:
1. Copy the error message
2. Search Google: "git [your error message]"
3. Check Stack Overflow (usually has solutions)
4. GitHub has excellent documentation and community forums

**Remember:** Everyone struggles with Git at first. It gets easier with practice!

---

## Congratulations! 🎉

You now know how to:
- ✅ Use Git to track changes
- ✅ Save your code to GitHub
- ✅ Never lose your work again
- ✅ Track your project's history
- ✅ Work on multiple features safely

**Your code is now professionally version-controlled!**
