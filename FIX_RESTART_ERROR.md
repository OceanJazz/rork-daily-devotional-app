# Fix: EAS Submission "Maximum restart attempts reached" Error

## The Problem
```
Submission failed: Maximum restart attempts reached, please try again
```

This error occurs when EAS submission process gets stuck in a restart loop and can't recover.

## Step-by-Step Solution

### Step 1: Force Kill Any Stuck Processes
```bash
# Kill any running EAS processes
pkill -f "eas"
pkill -f "expo"

# Wait a few seconds, then check if any are still running
ps aux | grep eas
```

### Step 2: Clear All EAS Cache and State
```bash
# Clear EAS cache completely
eas build:clear-cache

# Clear local EAS state
rm -rf ~/.expo
rm -rf ~/.eas

# Clear npm/yarn cache (if using npm)
npm cache clean --force

# Or if using yarn
yarn cache clean
```

### Step 3: Restart Terminal/Command Prompt
- Close your terminal completely
- Open a new terminal window
- Navigate back to your project directory

### Step 4: Re-authenticate with EAS
```bash
# Logout completely
eas logout

# Login again (this will prompt for credentials)
eas login

# Verify you're logged in
eas whoami
```

### Step 5: Check Your Build Status
```bash
# List recent builds to see if any are stuck
eas build:list

# If you see a build in "IN_PROGRESS" state that's been stuck, you may need to wait or contact Expo support
```

### Step 6: Try Submission Again
```bash
# Try submitting with verbose logging
eas submit --platform ios --verbose
```

### Step 7: Alternative - Manual Upload Method

If EAS submit continues to fail, use manual upload:

#### Option A: Download and Use Transporter
1. **Get your .ipa file:**
   - Go to [EAS Dashboard](https://expo.dev)
   - Find your latest successful iOS build
   - Download the .ipa file

2. **Install Transporter (Mac App Store - Free)**

3. **Upload manually:**
   - Open Transporter
   - Drag your .ipa file into Transporter
   - Sign in with Apple ID
   - Click "Deliver"

#### Option B: Use Xcode (Mac only)
1. Open Xcode
2. Go to Window → Organizer
3. Click "Distribute App"
4. Select your .ipa file
5. Follow the upload wizard

### Step 8: If Still Failing - Create New Build

Sometimes the build itself has issues:

```bash
# Increment build number in app.json first
# Change "buildNumber": "1" to "buildNumber": "2"

# Create fresh build
eas build --platform ios --clear-cache

# Then try submitting the new build
eas submit --platform ios
```

## Preventing This Error

### 1. Stable Internet Connection
- Use wired connection if possible
- Avoid WiFi that might disconnect

### 2. Don't Interrupt Process
- Don't close terminal during submission
- Don't put computer to sleep
- Let the process complete fully

### 3. Check Apple System Status
- Visit: https://developer.apple.com/system-status/
- Ensure App Store Connect is operational

## Expected Timeline

- **Manual Transporter Upload:** 5-10 minutes
- **Fresh EAS Build + Submit:** 15-20 minutes
- **Build Processing in TestFlight:** 5-10 minutes

## If Nothing Works

Contact Expo Support with:
1. Your project slug
2. Build ID that's failing
3. Full error message
4. Steps you've already tried

The manual Transporter upload is the most reliable fallback method and should work even when EAS submit fails.