# Fix: EAS Submission "Maximum restart attempts reached" Error

## The Problem
```
Submission failed: Maximum restart attempts reached, please try again
```

This error occurs when EAS submission process gets stuck in a restart loop and can't recover. The process is asking for input but you can't provide it.

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

# Clear local EAS state (this removes cached credentials)
rm -rf ~/.expo
rm -rf ~/.eas

# Clear npm cache
npm cache clean --force
```

### Step 3: Restart Terminal Completely
- Close your terminal/command prompt completely
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

### Step 5: Check Build Status
```bash
# List recent builds to see current status
eas build:list

# If you see a build stuck in "IN_PROGRESS", wait for it to complete or fail
```

### Step 6: Try Submission with Verbose Logging
```bash
# Try submitting with detailed output
eas submit --platform ios --verbose
```

### Step 7: Alternative - Manual Upload (Recommended)

If EAS submit continues to fail, use manual upload:

#### Method A: Transporter App (Mac)
1. **Download your .ipa file:**
   - Go to [EAS Dashboard](https://expo.dev)
   - Find your latest successful iOS build
   - Click "Download" to get the .ipa file

2. **Install Transporter:**
   - Download from Mac App Store (free)

3. **Upload manually:**
   - Open Transporter app
   - Drag and drop your .ipa file into Transporter
   - Sign in with your Apple ID when prompted
   - Click "Deliver"
   - Wait for upload to complete (5-10 minutes)

#### Method B: Xcode Organizer (Mac)
1. Open Xcode
2. Go to Window → Organizer
3. Click "Distribute App"
4. Select your downloaded .ipa file
5. Follow the upload wizard

### Step 8: If Manual Upload Also Fails

Create a fresh build:

```bash
# First, increment build number in app.json
# Change "buildNumber": "X" to "buildNumber": "X+1"

# Create fresh build with cache clearing
eas build --platform ios --clear-cache

# Then try submitting the new build
eas submit --platform ios
```

## Why This Happens

### Common Causes:
- Network interruption during submission
- Apple server issues
- EAS process getting stuck in authentication loop
- Cached credentials becoming invalid

### Prevention:
- Use stable internet connection
- Don't interrupt the submission process
- Check Apple System Status before submitting

## Expected Timeline

- **Manual Transporter Upload:** 5-10 minutes
- **Fresh Build + Submit:** 15-25 minutes
- **Processing in TestFlight:** 5-10 minutes

## Verification

After successful upload:
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Navigate to your Cultivate app
3. Check TestFlight tab
4. New build should appear within 10-15 minutes

## If Nothing Works

The manual Transporter upload is the most reliable method and should work even when EAS submit fails completely. This bypasses all EAS submission issues and uploads directly to Apple.

**Recommended approach: Use Transporter app for reliable uploads.**