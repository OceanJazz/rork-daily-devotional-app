# Where to Copy and Paste the Commands

## What is EAS?
EAS (Expo Application Services) is the tool that builds and submits your app to Apple. You've already been using it - it's what created your app for TestFlight.

## Step 1: Open Terminal/Command Prompt

### On Mac:
1. Press `Cmd + Space` to open Spotlight
2. Type "Terminal" 
3. Press Enter
4. A black window will open - this is where you paste commands

### On Windows:
1. Press `Windows key + R`
2. Type "cmd"
3. Press Enter
4. A black window will open - this is where you paste commands

## Step 2: Navigate to Your App Folder

In the terminal, you need to go to where your Cultivate app files are located.

Type this command (replace with your actual folder path):
```bash
cd /path/to/your/cultivate-app-folder
```

**To find your folder path:**
- **Mac:** Open Finder, go to your app folder, right-click and "Get Info", copy the path
- **Windows:** Open File Explorer, go to your app folder, click the address bar, copy the path

**Example paths:**
- Mac: `cd /Users/yourname/Desktop/cultivate-app`
- Windows: `cd C:\Users\yourname\Desktop\cultivate-app`

## Step 3: Copy and Paste Commands

Once you're in your app folder, you can copy and paste these commands one at a time:

### Fix the Submission Error:
```bash
eas build:clear-cache
```
Press Enter, wait for it to finish.

```bash
eas logout
```
Press Enter.

```bash
eas login
```
Press Enter, then enter your email and password when asked.

```bash
eas submit --platform ios
```
Press Enter and wait.

## How to Copy/Paste in Terminal

### Mac Terminal:
- **Copy:** Cmd + C
- **Paste:** Cmd + V

### Windows Command Prompt:
- **Copy:** Ctrl + C  
- **Paste:** Right-click and select "Paste" (or Ctrl + V in newer versions)

## What You'll See

When you paste and run commands, you'll see text appearing in the terminal showing progress. Don't close the terminal window while commands are running.

## If You Get Lost

If you're not sure where your app folder is:
1. Look for a folder containing files like `app.json`, `package.json`
2. That's your app folder
3. Navigate to it using the `cd` command above

## Need Help Finding Your App Folder?

Tell me:
1. What operating system you're using (Mac or Windows)
2. Where you originally created or downloaded your Cultivate app files
3. I can help you find the exact path to use