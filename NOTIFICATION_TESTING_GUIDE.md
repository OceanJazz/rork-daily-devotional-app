# Testing Notifications in Cultivate

## How to Test Notifications

### 1. Enable Notifications
1. Open the app and go to Settings tab
2. Toggle "Daily Reminder" to ON
3. Grant permission when prompted
4. Set your preferred notification time

### 2. Test Immediately (For Development)
To test notifications without waiting:

1. **Set notification time to 1-2 minutes from now**
2. **Close the app completely** (swipe up and swipe away)
3. **Wait for the notification**

### 3. Notification Features
The notification should:
- ✅ Show "Time for Your Daily Devotional" as title
- ✅ Play default notification sound
- ✅ Vibrate the device
- ✅ Show Cultivate app icon (not Expo)
- ✅ Appear as high priority
- ✅ Repeat daily at the set time

### 4. Troubleshooting

#### If you see Expo icon instead of Cultivate icon:
- This happens in development builds
- **Production builds** (TestFlight/App Store) will show correct icon
- The app.json now includes proper notification icon configuration

#### If no sound plays:
- Check device is not in silent mode
- Check notification settings in device Settings > Notifications > Cultivate
- Ensure "Sounds" is enabled for the app

#### If notification doesn't appear:
- Ensure app has notification permissions
- Check device Settings > Notifications > Cultivate
- Make sure "Allow Notifications" is ON
- Try setting notification for a few minutes from now and test

### 5. Production vs Development
- **Development (Expo Go)**: May show Expo icon
- **TestFlight**: Should show Cultivate icon
- **App Store**: Will show Cultivate icon

The notification icon issue you're seeing is normal for development builds and will be resolved in the production version.