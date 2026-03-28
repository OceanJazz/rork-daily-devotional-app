# Quick Publishing Commands

## 1. First, Update Your Bundle ID
Edit `app.json` and replace `yourname` with your actual name:
```json
"bundleIdentifier": "com.johnsmith.cultivate"
```

## 2. Run These Commands in Order:

```bash
# Clear everything
npx expo install --fix
npx eas build:clear-cache

# Login (if not already)
npx eas login

# Build with fresh start
npx eas build --platform ios --clear-cache

# Submit to App Store
npx eas submit --platform ios
```

## 3. If Build Fails, Try:

```bash
# Check what went wrong
npx eas build:list

# Try development build first
npx eas build --platform ios --profile development
```

## 4. Manual Backup Plan:

1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - Name: "Cultivate"
   - Bundle ID: (same as your app.json)
   - SKU: "cultivate-2025"
4. Then retry: `npx eas submit --platform ios`

**The key is updating your bundle identifier first!**