# Manual Upload Guide - Bypass EAS Submit Issues

## When EAS Submit Keeps Failing

If `eas submit` continues to give errors, you can manually upload your app:

## Method 1: Transporter App (Recommended)

### Step 1: Get Your .ipa File
1. After successful `eas build`, go to: https://expo.dev
2. Navigate to your project builds
3. Find your latest iOS build
4. Click "Download" to get the .ipa file

### Step 2: Install Transporter
1. Open Mac App Store
2. Search for "Transporter" (by Apple)
3. Install the free app

### Step 3: Upload
1. Open Transporter app
2. Sign in with your Apple Developer account
3. Drag and drop your .ipa file into Transporter
4. Click "Deliver"
5. Wait for upload to complete

## Method 2: Xcode Organizer

### Step 1: Open Xcode
1. Launch Xcode on your Mac
2. Go to Window → Organizer
3. Click on "Distribute App"

### Step 2: Upload
1. Select "Upload to App Store Connect"
2. Choose your .ipa file
3. Follow the upload wizard
4. Wait for processing

## Method 3: Application Loader (Legacy)

If you have older Xcode versions:
1. Open Application Loader
2. Choose "Deliver Your App"
3. Select your .ipa file
4. Upload to App Store Connect

## After Manual Upload

1. Go to https://appstoreconnect.apple.com
2. Navigate to your "Cultivate" app
3. Go to TestFlight tab
4. Your build should appear within 5-10 minutes
5. Add internal testers and test

## Verification Steps

✅ Build appears in App Store Connect
✅ TestFlight shows new build
✅ Build number is "2" (incremented)
✅ Bundle ID matches: `com.broadwayunitedmethodist.cultivate`
✅ App installs and runs on test devices

## Why Manual Upload Works

- Bypasses EAS submission process entirely
- Uses Apple's official upload tools
- More reliable for problematic builds
- Same end result as `eas submit`

**Manual upload is often more reliable than automated submission when there are server issues or process conflicts.**