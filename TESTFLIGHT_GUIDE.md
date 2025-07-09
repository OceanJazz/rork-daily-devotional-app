# Getting Cultivate to Apple TestFlight

## Prerequisites

1. **Apple Developer Account** ($99/year)
   - Sign up at [developer.apple.com](https://developer.apple.com)
   - Complete enrollment process (can take 24-48 hours)

2. **EAS CLI** (Expo Application Services)
   ```bash
   npm install -g @expo/eas-cli
   ```

## Step 1: Configure Your App

1. **Update app.json/app.config.js** with proper bundle identifier:
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

## Step 2: Set Up EAS Build

1. **Login to EAS:**
   ```bash
   eas login
   ```

2. **Initialize EAS in your project:**
   ```bash
   eas build:configure
   ```

3. **Create iOS build:**
   ```bash
   eas build --platform ios
   ```

   This will:
   - Create a build in the cloud
   - Generate an .ipa file
   - Take about 10-15 minutes

## Step 3: App Store Connect Setup

1. **Go to App Store Connect** ([appstoreconnect.apple.com](https://appstoreconnect.apple.com))

2. **Create a new app:**
   - Click "My Apps" → "+" → "New App"
   - Choose iOS
   - Enter app name: "Cultivate"
   - Bundle ID: Must match your app.json
   - SKU: Unique identifier (e.g., "cultivate-2025")

3. **Fill in app information:**
   - App description: "Daily devotional app for spiritual growth and reflection"
   - Keywords: devotional, bible, faith, prayer, spiritual
   - Categories: Lifestyle, Reference
   - Age rating

## Step 4: Upload Build to TestFlight

### Option A: EAS Submit (Recommended)
```bash
eas submit --platform ios
```

### Option B: Manual Upload
1. Download .ipa from EAS dashboard
2. Use Transporter app or Xcode to upload

## Step 5: Configure TestFlight

1. **In App Store Connect:**
   - Go to your app → TestFlight tab
   - Wait for build to process (5-10 minutes)
   - Add build notes/what to test

2. **Add Internal Testers:**
   - Users with access to your App Store Connect account
   - Can test immediately after upload

3. **Add External Testers:**
   - Up to 10,000 external testers
   - Requires App Review (1-3 days)
   - Create groups and add testers by email

## Step 6: Required Assets

Make sure you have these in your `assets` folder:

- **App Icon:** 1024x1024px PNG (no transparency)
- **Splash Screen:** Your existing splash image
- **Screenshots:** For App Store listing (optional for TestFlight)

## Step 7: Send to Testers

1. **Internal testers** get automatic email invitations
2. **External testers** need approval first, then get invitations
3. Testers install TestFlight app and use invitation link

## Common Issues & Solutions

### Build Errors
- Make sure all dependencies are compatible with iOS
- Check that bundle identifier is unique
- Ensure proper code signing (EAS handles this)

### Upload Issues
- Verify Apple Developer account is active
- Check bundle identifier matches App Store Connect
- Ensure build number increments for each upload

### TestFlight Review Rejection
- App must be functional (no placeholder content)
- Follow App Store Review Guidelines
- Include clear testing instructions

## Commands Summary

```bash
# Initial setup
npm install -g @expo/eas-cli
eas login
eas build:configure

# Build for iOS
eas build --platform ios

# Submit to App Store Connect
eas submit --platform ios

# Check build status
eas build:list
```

## Timeline Expectations

- **EAS Build:** 10-15 minutes
- **App Store Connect Processing:** 5-10 minutes
- **Internal TestFlight:** Immediate after processing
- **External TestFlight:** 1-3 days for review
- **Total time to first testers:** 30 minutes to 3 days

## Next Steps After TestFlight

1. Gather feedback from testers
2. Fix any issues
3. Upload new builds as needed
4. When ready, submit for App Store review
5. App Store review takes 1-7 days

Your Cultivate app is well-structured and should pass TestFlight review easily!