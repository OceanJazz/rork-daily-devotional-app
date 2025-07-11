# Updated Publishing Commands - Ready to Run

## Your Bundle ID is Now Correct ✅
- Bundle ID: `com.broadwayunitedmethodist.cultivate`
- Build Number: `2` (incremented for update)

## Run These Commands in Terminal:

### 1. Clear All Caches
```bash
npx expo install --fix
npx eas build:clear-cache
```

### 2. Fresh Login
```bash
npx eas logout
npx eas login
```

### 3. Build Your Updated App
```bash
npx eas build --platform ios --clear-cache --non-interactive
```

### 4. Submit to TestFlight (after build completes)
```bash
npx eas submit --platform ios
```

## What Changed:
- ✅ Bundle ID now matches your existing App Store Connect app
- ✅ Build number incremented to "2" for the update
- ✅ Android package also updated to match

## If You Still Get Errors:

### Option A: Manual Upload
1. Download the .ipa file from EAS dashboard after build completes
2. Install "Transporter" app from Mac App Store
3. Drag and drop your .ipa file into Transporter
4. Upload manually to App Store Connect

### Option B: Check App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Verify your "Cultivate" app exists
3. Confirm the Bundle ID matches exactly: `com.broadwayunitedmethodist.cultivate`

## Success Indicators:
✅ Build completes without errors
✅ Submission succeeds without "restart attempts" error
✅ New build appears in TestFlight
✅ Build number shows as "2" in App Store Connect

**The bundle identifier mismatch was causing your submission failures. This should fix it!**