# Fix: "process with pid 511 not found" Error

## This Error Means
The EAS submission process crashed unexpectedly. Here's how to fix it:

## Step 1: Clear All Caches
Run these commands in your terminal:

```bash
# Clear Expo cache
npx expo install --fix

# Clear EAS build cache
npx eas build:clear-cache
```

## Step 2: Update Bundle Identifier (CRITICAL)
Open `app.json` and replace `yourname` with your actual name:

**Before:**
```json
"bundleIdentifier": "com.yourname.cultivate"
```

**After (example):**
```json
"bundleIdentifier": "com.johnsmith.cultivate"
```

## Step 3: Fresh Build and Submit
```bash
# Login to EAS (if not already)
npx eas login

# Build with fresh cache
npx eas build --platform ios --clear-cache

# Wait for build to complete, then submit
npx eas submit --platform ios
```

## If Still Getting Errors

### Option A: Check Build Status
```bash
# See your recent builds
npx eas build:list

# View specific build details
npx eas build:view [BUILD_ID]
```

### Option B: Manual App Store Connect Setup
1. Go to https://appstoreconnect.apple.com
2. Sign in with your Apple Developer account
3. Click "My Apps" → "+" → "New App"
4. Fill in:
   - **Name:** "Cultivate"
   - **Bundle ID:** Must match your app.json exactly
   - **SKU:** "cultivate-2025"
5. Click "Create"
6. Then retry: `npx eas submit --platform ios`

### Option C: Try Development Build First
```bash
# Build development version first
npx eas build --platform ios --profile development

# Then try production
npx eas build --platform ios --profile production
```

## Success Indicators
✅ Build completes without "process not found" error
✅ You get a build URL from EAS
✅ App appears in App Store Connect
✅ TestFlight shows your build

## Next Steps After Success
1. Test your app in TestFlight
2. Add internal testers
3. Submit for App Store review

**The key is clearing caches and ensuring your bundle identifier is unique!**