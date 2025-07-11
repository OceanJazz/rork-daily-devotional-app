# Fix: "Maximum restart attempts reached" Error

## This Error Means
EAS is repeatedly failing to submit your app and has given up after multiple attempts. Here's how to fix it:

## Step 1: Update Bundle Identifier for Broadway United Methodist Church
Since you mentioned "Broadway United Methodist Church", update your `app.json`:

```json
{
  "expo": {
    "name": "Cultivate",
    "slug": "cultivate-devotional",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.broadwayunitedmethodist.cultivate",
      "buildNumber": "2"
    },
    "android": {
      "package": "com.broadwayumc.cultivate"
    }
  }
}
```

**IMPORTANT:** If you're updating an existing TestFlight app, the bundle identifier MUST match exactly what's already in App Store Connect.

## Step 2: Check Your Existing App's Bundle ID
1. Go to https://appstoreconnect.apple.com
2. Find your existing "Cultivate" app
3. Check what Bundle ID it's using
4. Make sure your `app.json` matches exactly

## Step 3: Increment Build Number
Since you're updating an existing app, increment the build number:
```json
"buildNumber": "2"  // or "3", "4", etc. - must be higher than current
```

## Step 4: Complete Reset and Rebuild
```bash
# 1. Clear everything
npx expo install --fix
npx eas build:clear-cache

# 2. Login fresh
npx eas logout
npx eas login

# 3. Build with clean slate
npx eas build --platform ios --clear-cache --non-interactive

# 4. After build completes, submit
npx eas submit --platform ios
```

## Step 5: Alternative Submission Method
If EAS submit keeps failing, try manual upload:

```bash
# 1. Build the app
npx eas build --platform ios

# 2. Download the .ipa file from the EAS dashboard
# 3. Install "Transporter" app from Mac App Store
# 4. Drag and drop your .ipa file into Transporter
# 5. Upload manually
```

## Step 6: Verify App Store Connect Settings
Make sure your existing app in App Store Connect has:
- Correct Bundle ID matching your app.json
- App Store Connect API access enabled
- Valid certificates and provisioning profiles

## Common Causes of This Error:
- Bundle ID mismatch between app.json and App Store Connect
- Build number not incremented
- Certificate/provisioning issues
- Apple server temporary issues

## Success Checklist:
✅ Bundle ID matches existing App Store Connect app exactly
✅ Build number is higher than current version
✅ Build completes successfully
✅ Submission goes through without restart errors
✅ New build appears in TestFlight

Try the complete reset (Step 4) first - this fixes most submission issues!