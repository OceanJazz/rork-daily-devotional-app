# Publishing Error Fix Guide

## Error: "process with pid 511 not found"

This error indicates a build/submission process crashed. Here's how to fix it:

### Step 1: Clear All Caches
```bash
# Clear Expo cache
npx expo install --fix
npx expo start --clear

# Clear EAS cache  
npx eas build:clear-cache
```

### Step 2: Update Bundle Identifier
**CRITICAL:** In `app.json`, replace `yourname` with your actual name:
```json
"bundleIdentifier": "com.johnsmith.cultivate"
"package": "com.johnsmith.cultivate"
```

### Step 3: Try Fresh Build
```bash
# Login to EAS
npx eas login

# Configure if needed
npx eas build:configure

# Build with verbose logging
npx eas build --platform ios --clear-cache --non-interactive
```

### Step 4: Alternative Publishing Methods

#### Option A: Manual App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Create app manually:
   - Name: "Cultivate"
   - Bundle ID: Must match your app.json exactly
   - SKU: "cultivate-2025"
3. Then retry: `npx eas submit --platform ios`

#### Option B: Use Development Build
```bash
# Create development build first
npx eas build --platform ios --profile development

# Then production build
npx eas build --platform ios --profile production
```

### Step 5: Check Build Status
```bash
# View recent builds
npx eas build:list

# View specific build details
npx eas build:view [BUILD_ID]
```

## If Still Failing

### Check These Common Issues:
1. **Bundle ID conflicts** - Make sure it's unique
2. **Apple Developer account** - Verify it's active
3. **Certificates** - Let EAS handle automatically
4. **Asset paths** - Verify all assets exist in `/assets/images/`

### Get Build Logs:
```bash
npx eas build:view --json
```

### Emergency Fallback:
If EAS keeps failing, you can:
1. Export your app: `npx expo export`
2. Use Xcode to build manually
3. Upload .ipa file via Transporter app

## Success Indicators:
✅ Build completes without errors
✅ App appears in App Store Connect
✅ TestFlight shows your build
✅ No certificate/provisioning issues

Try Step 1-3 first, then let me know what happens!