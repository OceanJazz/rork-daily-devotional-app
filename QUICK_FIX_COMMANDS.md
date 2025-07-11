# Quick Fix Commands - Copy These to Terminal

## For Updating Existing TestFlight App

### 1. First, check your existing app's Bundle ID:
- Go to https://appstoreconnect.apple.com
- Find your "Cultivate" app
- Note the exact Bundle ID

### 2. Update app.json with correct Bundle ID:
```json
"bundleIdentifier": "com.broadwayumc.cultivate"
"buildNumber": "2"
```
(Use your actual Bundle ID and increment the build number)

### 3. Run these commands:

```bash
# Clear all caches
npx expo install --fix
npx eas build:clear-cache

# Fresh login
npx eas logout
npx eas login

# Clean build
npx eas build --platform ios --clear-cache --non-interactive
```

### 4. After build completes:
```bash
npx eas submit --platform ios
```

### 5. If submission still fails, try manual upload:
1. Download .ipa from EAS dashboard
2. Install "Transporter" app from Mac App Store  
3. Drag .ipa file into Transporter
4. Upload manually

## Key Points:
- Bundle ID must match your existing App Store Connect app exactly
- Build number must be higher than current version
- Don't change app name if updating existing app

**The bundle ID mismatch is likely causing your restart errors!**