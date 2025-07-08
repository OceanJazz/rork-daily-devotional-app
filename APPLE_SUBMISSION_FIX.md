# Fixing Apple App Store Connect Submission Error

## The Error You're Seeing
```
Internal Server Error: 'h', 'Received an internal server error from Apple's App Store Connect / Developer Portal servers, please try again later.
```

This is typically caused by:
1. Apple's servers being temporarily down
2. App name/bundle ID conflicts
3. Unresolved warnings in App Store Connect

## Step-by-Step Fix

### 1. Check Apple System Status
- Visit: https://developer.apple.com/system-status/
- Look for any ongoing issues with App Store Connect
- If there are issues, wait until they're resolved

### 2. Fix Your App Configuration

Update your `app.json` with a cleaner bundle identifier:

```json
{
  "expo": {
    "name": "Cultivate",
    "slug": "cultivate-devotional",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourname.cultivate",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourname.cultivate",
      "versionCode": 1
    }
  }
}
```

**Important:** Replace `yourname` with your actual name or company name (no spaces, lowercase).

### 3. Manual App Store Connect Setup

Instead of letting EAS create the app automatically, create it manually:

1. **Go to App Store Connect**: https://appstoreconnect.apple.com
2. **Click "My Apps" → "+" → "New App"**
3. **Fill in details:**
   - Platform: iOS
   - Name: "Cultivate" (or your preferred name)
   - Primary Language: English
   - Bundle ID: Must match your app.json exactly
   - SKU: "cultivate-devotional-2025" (unique identifier)

4. **Save the app**

### 4. Check for Warnings

In App Store Connect:
- Go to your app
- Check all sections for red warning icons
- Resolve any issues (usually missing metadata)

### 5. Retry Submission

Now try submitting again:

```bash
# Build first (if you haven't recently)
eas build --platform ios

# Then submit
eas submit --platform ios --app-id YOUR_APP_ID_FROM_APPSTORE_CONNECT
```

### 6. Alternative: Manual Upload

If EAS submit keeps failing:

1. **Download your .ipa file** from the EAS dashboard
2. **Use Transporter app** (free from Mac App Store)
3. **Drag and drop** your .ipa file into Transporter
4. **Upload manually**

### 7. Common Bundle ID Issues

Make sure your bundle ID:
- Contains only letters, numbers, hyphens, and periods
- Follows reverse domain format: `com.yourname.appname`
- Is unique (not used by another app)
- Matches exactly between app.json and App Store Connect

### 8. If Still Failing

Try these commands in order:

```bash
# Clear EAS cache
eas build:clear-cache

# Login again
eas logout
eas login

# Try with explicit app ID
eas submit --platform ios --app-id com.yourname.cultivate
```

## Expected Timeline

- **Manual App Store Connect setup**: 5 minutes
- **EAS submit retry**: 2-5 minutes
- **Manual Transporter upload**: 5-10 minutes

## Next Steps After Success

1. **TestFlight**: Your app will appear in TestFlight within 10-15 minutes
2. **Add testers**: Invite people via email in TestFlight section
3. **Test thoroughly**: Make sure everything works on real devices
4. **Submit for review**: When ready, submit to App Store

The key is usually creating the app manually in App Store Connect first, then using EAS submit with the correct bundle ID.