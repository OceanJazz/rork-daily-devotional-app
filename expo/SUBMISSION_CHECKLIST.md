# App Store Submission Checklist for Cultivate

## ✅ App Functionality (Complete)
- [x] Daily devotional content loading
- [x] Journal entry system
- [x] Favorites functionality
- [x] Streak tracking
- [x] Settings with notifications
- [x] Offline fallback content
- [x] Error handling
- [x] Navigation structure

## 🔧 Required Before Submission

### 1. Update Bundle Identifier
In `app.json`, replace `yourname` with your actual name/company:
```json
"bundleIdentifier": "com.johnsmith.cultivate"
```

### 2. Required Assets (Missing)
Create these files in `/assets/` folder:

- **icon.png** - 1024x1024px app icon
- **adaptive-icon.png** - 1024x1024px Android adaptive icon  
- **splash.png** - Your splash screen image (1284x2778px recommended)
- **favicon.png** - 48x48px web favicon

### 3. Apple Developer Account
- [x] $99/year Apple Developer Program membership
- [x] Certificates and provisioning profiles (EAS handles this)

### 4. App Store Connect Setup
Based on your previous error, you need to:

1. **Manually create app in App Store Connect first:**
   - Go to https://appstoreconnect.apple.com
   - Click "My Apps" → "+" → "New App"
   - Name: "Cultivate"
   - Bundle ID: Must match your app.json exactly
   - SKU: "cultivate-2025"

2. **Fill required metadata:**
   - App description
   - Keywords: "devotional, bible, faith, prayer, spiritual, christian"
   - Categories: Lifestyle, Reference
   - Age rating
   - Privacy policy URL (if collecting data)

## 🚀 Submission Commands

```bash
# 1. Install EAS CLI
npm install -g @expo/eas-cli

# 2. Login
eas login

# 3. Configure build
eas build:configure

# 4. Build for iOS
eas build --platform ios

# 5. Submit to App Store Connect
eas submit --platform ios
```

## 🐛 Fix Previous Error

Your previous Apple server error was likely due to:
1. Apple server issues (temporary)
2. App not existing in App Store Connect
3. Bundle ID conflicts

**Solution:** Create the app manually in App Store Connect first, then retry submission.

## 📱 TestFlight Timeline

After successful submission:
- **Build processing:** 5-10 minutes
- **Internal testing:** Immediate
- **External testing:** 1-3 days (requires review)

## ⚠️ Potential Issues to Address

1. **Privacy Policy:** If you're collecting any user data (journal entries are stored locally, but check if analytics are used)

2. **Content Guidelines:** Ensure devotional content follows App Store guidelines

3. **Functionality:** App must work without crashes on all supported devices

## 📋 Final Pre-Submission Test

1. Test on physical iOS device
2. Verify all features work offline
3. Check that journal entries persist
4. Test notification permissions
5. Ensure no crashes or freezes

Your app is functionally ready! You just need the assets and proper App Store Connect setup.