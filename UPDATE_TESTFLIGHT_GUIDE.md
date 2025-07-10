# How to Submit App Updates to TestFlight

## Step 1: Update Version Numbers

Before building, you need to increment either the version or build number in `app.json`:

### Option A: New Version (Recommended for significant updates)
```json
{
  "expo": {
    "version": "1.1.0",  // Changed from 1.0.0
    "ios": {
      "buildNumber": "1"  // Can reset to 1 for new version
    }
  }
}
```

### Option B: New Build (For minor fixes)
```json
{
  "expo": {
    "version": "1.0.0",  // Keep same
    "ios": {
      "buildNumber": "2"  // Increment from 1 to 2
    }
  }
}
```

## Step 2: Build New Version

```bash
# Build the updated app
eas build --platform ios
```

This will:
- Create a new build with your changes
- Take 10-15 minutes to complete
- Generate a new .ipa file

## Step 3: Submit to App Store Connect

```bash
# Submit the new build
eas submit --platform ios
```

This will:
- Upload the new build to App Store Connect
- Automatically associate it with your existing app
- Take 2-5 minutes to complete

## Step 4: Verify in TestFlight

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click on your "Cultivate" app
3. Go to "TestFlight" tab
4. You should see your new build processing (5-10 minutes)
5. Once processed, it will be available to your existing testers

## Step 5: Notify Testers (Optional)

- Existing testers will automatically get the update
- You can add release notes in App Store Connect
- Testers will see an "Update" button in TestFlight

## Important Notes

### Version vs Build Number
- **Version** (1.0.0 → 1.1.0): For feature updates, visible to users
- **Build Number** (1 → 2): For bug fixes, internal tracking only

### Automatic Updates
- TestFlight users get updates automatically
- They'll see a notification to update
- Previous version is replaced

### Build Processing Time
- **EAS Build**: 10-15 minutes
- **App Store Processing**: 5-10 minutes
- **Total Time**: ~20-25 minutes

## Common Issues

### "Build already exists" error:
- You forgot to increment version or build number
- Update `app.json` and rebuild

### "App not found" error:
- Your bundle identifier changed
- Make sure it matches your existing app exactly

## Example Workflow

```bash
# 1. Make your code changes
# 2. Update app.json version/build number
# 3. Build
eas build --platform ios

# 4. Submit
eas submit --platform ios

# 5. Check TestFlight in 20-25 minutes
```

## What Testers See

- Notification: "Cultivate has an update available"
- In TestFlight app: "Update" button appears
- After update: New version with your changes

Your existing testers will automatically have access to the new version once it's processed!