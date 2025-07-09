# Fix: App Store Connect Submission Error

## The Problem
You're getting this error because EAS is trying to automatically create your app in App Store Connect, but it's missing required information (specifically the company name).

## Solution: Manually Create App in App Store Connect

### Step 1: Go to App Store Connect
1. Open your web browser
2. Go to: https://appstoreconnect.apple.com
3. Sign in with your Apple Developer account

### Step 2: Create New App Manually
1. Click **"My Apps"** in the top navigation
2. Click the blue **"+"** button
3. Select **"New App"**

### Step 3: Fill in App Information
Fill out the form with these details:

**Platform:** iOS

**Name:** Cultivate

**Primary Language:** English (US)

**Bundle ID:** Select the bundle ID that matches your app.json exactly
- Should be something like: `com.yourname.cultivate`
- If you don't see your bundle ID in the dropdown, you may need to create it in your Apple Developer account first

**SKU:** cultivate-2025
- This is just an internal identifier, can be anything unique

**User Access:** Full Access (default)

### Step 4: Complete Required Fields
After creating the app, you'll need to fill in additional required information:

1. **App Information Section:**
   - Subtitle: "Daily Devotional & Reflection"
   - Categories: 
     - Primary: Lifestyle
     - Secondary: Reference

2. **Pricing and Availability:**
   - Price: Free
   - Availability: All territories

3. **App Privacy:**
   - Click "Get Started"
   - Answer privacy questions (your app likely collects no data since everything is stored locally)
   - Save and publish privacy policy

### Step 5: Verify Bundle ID in app.json
Make sure your `app.json` has the correct bundle identifier:

```json
{
  "expo": {
    "name": "Cultivate",
    "slug": "cultivate-devotional",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourname.cultivate",
      "buildNumber": "1"
    }
  }
}
```

**IMPORTANT:** Replace `yourname` with your actual name/company (no spaces, lowercase)

### Step 6: Retry EAS Submit
Now that the app exists in App Store Connect, try submitting again:

```bash
eas submit --platform ios
```

This time it should work because:
- The app already exists in App Store Connect
- All required fields are filled in
- EAS just needs to upload the build to the existing app

## Alternative: Check Apple Developer Account

If you're still having issues, check your Apple Developer account:

1. Go to: https://developer.apple.com/account
2. Click "Certificates, Identifiers & Profiles"
3. Click "Identifiers"
4. Make sure your bundle ID exists there
5. If not, create it:
   - Click "+" to add new identifier
   - Select "App IDs"
   - Enter your bundle ID: `com.yourname.cultivate`
   - Save

## Expected Result

After manually creating the app in App Store Connect:
- EAS submit should work without errors
- Your build will appear in TestFlight within 5-10 minutes
- You can then add testers and eventually submit for App Store review

The key is that Apple requires the app to exist in App Store Connect with all required fields filled in before you can upload builds to it.