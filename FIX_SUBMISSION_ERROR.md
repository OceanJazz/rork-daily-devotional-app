# Fix: EAS Submission Process Error (PID 510 not found)

## The Error
```
Submission failed: [not_found] process with pid 510 not found
```

This indicates the EAS submission process was interrupted or crashed.

## Step-by-Step Fix

### Step 1: Check Build Status
First, verify your build actually completed:

```bash
# Check your recent builds
eas build:list
```

Look for your most recent iOS build and ensure it shows "FINISHED" status.

### Step 2: Clear EAS Cache
```bash
# Clear EAS cache
eas build:clear-cache
```

### Step 3: Re-login to EAS
```bash
# Logout and login again
eas logout
eas login
```

### Step 4: Retry Submission
```bash
# Try submitting again
eas submit --platform ios
```

### Step 5: If Still Failing - Manual Submission

If EAS submit keeps failing, use manual upload:

1. **Download your .ipa file:**
   - Go to [EAS Dashboard](https://expo.dev/accounts/[your-account]/projects/cultivate-devotional/builds)
   - Find your latest successful iOS build
   - Click "Download" to get the .ipa file

2. **Install Transporter (Mac only):**
   - Download from Mac App Store (free)
   - Or use Xcode's built-in uploader

3. **Upload manually:**
   - Open Transporter app
   - Drag and drop your .ipa file
   - Sign in with your Apple ID
   - Click "Deliver"

### Step 6: Alternative - Use Specific Build ID

If you know your build ID:

```bash
# Submit specific build (replace with your actual build ID)
eas submit --platform ios --id [your-build-id]
```

## Common Causes & Prevention

### Network Issues
- Ensure stable internet connection
- Try from different network if possible

### Apple Server Issues
- Check [Apple System Status](https://developer.apple.com/system-status/)
- Wait if App Store Connect shows issues

### EAS Process Interruption
- Don't close terminal during submission
- Ensure computer doesn't sleep during process

## Expected Timeline

- **EAS Submit Retry:** 2-5 minutes
- **Manual Transporter Upload:** 5-10 minutes
- **Build Processing in App Store Connect:** 5-10 minutes

## Verification

After successful submission:
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Check your Cultivate app
3. Go to TestFlight tab
4. New build should appear within 10-15 minutes

## If All Methods Fail

1. **Create new build:**
   ```bash
   # Increment build number in app.json first
   eas build --platform ios
   ```

2. **Then submit the new build:**
   ```bash
   eas submit --platform ios
   ```

The process error is usually temporary and one of these methods should work!