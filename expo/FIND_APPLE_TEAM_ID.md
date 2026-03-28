# How to Find Your Apple Team ID

## Method 1: Apple Developer Portal
1. Go to https://developer.apple.com/account/
2. Sign in with your Apple Developer account
3. Look at the top right corner - your Team ID will be displayed
4. It's a 10-character alphanumeric string (like "ABC123DEF4")

## Method 2: App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Sign in with your Apple Developer account
3. Click on "Users and Access"
4. Your Team ID will be shown in the account information

## Method 3: Xcode (if you have it)
1. Open Xcode
2. Go to Xcode → Preferences → Accounts
3. Select your Apple ID
4. Your Team ID will be listed next to your team name

## Method 4: Terminal Command (if you have Xcode Command Line Tools)
```bash
# List all available teams
xcrun altool --list-providers -u your-apple-id@email.com -p your-app-specific-password
```

## What It Looks Like
Your Apple Team ID will be a 10-character string like:
- `ABC123DEF4`
- `XYZ789GHI2`
- `DEF456JKL8`

## Once You Find It
Update your `eas.json` file with your actual Team ID:

```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "jbrown@broadwayunited.org",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "YOUR_ACTUAL_TEAM_ID_HERE"
      }
    }
  }
}
```

## Note About ascAppId
You also need your App Store Connect App ID (ascAppId). This is different from your Team ID:
1. Go to https://appstoreconnect.apple.com
2. Find your "Cultivate" app
3. Click on it
4. Look at the URL - the App ID is the number at the end
5. Example: `https://appstoreconnect.apple.com/apps/1234567890/appstore` → App ID is `1234567890`

**Both Team ID and App Store Connect App ID are required for EAS submission to work properly.**