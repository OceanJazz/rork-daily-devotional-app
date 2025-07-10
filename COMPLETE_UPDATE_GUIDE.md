# Complete Guide: Update Your Cultivate App in TestFlight

## The Problem
Your code improvements are only on your computer. Expo and TestFlight don't have your latest changes yet.

## Step 1: Update Version Number (Required)

Open your `app.json` file and update these numbers:

```json
{
  "expo": {
    "name": "Cultivate",
    "version": "1.1.0",  // Change from 1.0.0 to 1.1.0
    "ios": {
      "bundleIdentifier": "com.yourname.cultivate",
      "buildNumber": "2"  // Change from 1 to 2
    }
  }
}
```

**Important:** Replace `yourname` with your actual name (like `com.johnsmith.cultivate`)

## Step 2: Open Terminal/Command Prompt

### On Mac:
1. Press `Cmd + Space`
2. Type "Terminal"
3. Press Enter

### On Windows:
1. Press `Windows + R`
2. Type "cmd"
3. Press Enter

## Step 3: Navigate to Your App Folder

In the terminal, type:
```bash
cd /path/to/your/cultivate-app-folder
```

**To find your path:**
- Find the folder with your `app.json` file
- On Mac: Right-click folder → Get Info → copy path
- On Windows: Click address bar in File Explorer → copy path

## Step 4: Build Your Updated App

Copy and paste this command:
```bash
eas build --platform ios
```

**This will:**
- Upload your current code to Expo
- Build a new app file with your changes
- Take 10-15 minutes to complete

**Wait for it to say "Build completed successfully"**

## Step 5: Submit to TestFlight

Copy and paste this command:
```bash
eas submit --platform ios
```

**This will:**
- Send your new app to Apple
- Take 2-5 minutes to complete

## Step 6: Verify Success

1. Go to https://appstoreconnect.apple.com
2. Click on "Cultivate" app
3. Go to "TestFlight" tab
4. You should see version 1.1.0 processing (takes 10-15 minutes)
5. Your testers will get an "Update Available" notification

## If You Get Errors

### Error: "Maximum restart attempts" or "Process not found"

**Solution 1: Clear and Retry**
```bash
eas build:clear-cache
eas logout
eas login
eas submit --platform ios
```

**Solution 2: Manual Upload**
1. Go to https://expo.dev
2. Sign in
3. Find your "Cultivate" project
4. Click "Builds"
5. Download the latest .ipa file
6. Install "Transporter" app from Mac App Store
7. Drag .ipa file into Transporter
8. Sign in with Apple ID
9. Click "Deliver"

## Timeline Expectations
- **Build:** 10-15 minutes
- **Submit:** 2-5 minutes  
- **TestFlight Processing:** 10-15 minutes
- **Total:** About 30 minutes

## Success Indicators
✅ Terminal shows "Build completed successfully"
✅ Terminal shows "Submission successful"
✅ Email from Apple about new build
✅ Version 1.1.0 appears in TestFlight

## Important Notes
- **Don't close terminal** while commands are running
- **Each code change** requires a new build and submit
- **Version number must increase** each time (1.0.0 → 1.1.0 → 1.2.0)

## Need Help?
If you get stuck at any step, tell me:
1. What step you're on
2. Exact error message you see
3. I'll provide specific help for that step

Your updated app with all the improvements will be in TestFlight once this process completes!