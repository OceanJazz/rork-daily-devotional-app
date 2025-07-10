# How to Update Your App with Latest Code Changes

## The Problem
Your code changes are only on your computer. Expo and TestFlight don't automatically get your updates.

## Step-by-Step Solution

### Step 1: Update Version Number
In your `app.json` file, change:
```json
{
  "expo": {
    "version": "1.1.0",  // Change from 1.0.0
    "ios": {
      "buildNumber": "2"  // Change from 1
    }
  }
}
```

### Step 2: Create New Build with Your Changes
```bash
# This uploads your current code and builds it
eas build --platform ios
```
**Wait 10-15 minutes for this to complete.**

### Step 3: Submit to TestFlight
```bash
# This sends the new build to Apple
eas submit --platform ios
```
**Wait 5-10 minutes for this to complete.**

## What This Does
- ✅ Takes your current code from your computer
- ✅ Builds it into an app file on Expo's servers
- ✅ Submits that new app to TestFlight
- ✅ Your testers get the updated version

## How to Check if It Worked
1. Go to https://appstoreconnect.apple.com
2. Check TestFlight tab
3. You should see version 1.1.0 (or whatever you set)
4. Testers will get "Update Available" notification

## Important Notes
- **Every time you make code changes**, you need to build and submit again
- **Version/build number must be higher** than the previous one
- **Your computer code ≠ Expo code** until you build and submit

## If Commands Don't Work
Use the manual upload method:
1. Run `eas build --platform ios` (wait for completion)
2. Download .ipa from https://expo.dev dashboard
3. Upload via Transporter app to Apple

Your code changes will only appear in TestFlight after you complete this process!