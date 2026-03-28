# Step-by-Step Apple App Store Submission Guide

## Step 1: Check Apple System Status

### 1.1 Visit Apple Developer System Status
1. Open your web browser
2. Go to: https://developer.apple.com/system-status/
3. Look for any red or yellow indicators next to "App Store Connect"
4. If there are issues, wait until they show "Available" (green)
5. If all systems are green, proceed to Step 2

## Step 2: Fix Your App Configuration

### 2.1 Update Bundle Identifier
1. Open your project in your code editor
2. Find the `app.json` file in your project root
3. Replace `yourname` in the bundle identifier with your actual name/company (no spaces, lowercase)
4. Example: Change `com.yourname.cultivate` to `com.johnsmith.cultivate`
5. Save the file

### 2.2 Verify App.json Configuration
Your `app.json` should look like this:
```json
{
  "expo": {
    "name": "Cultivate",
    "slug": "cultivate-devotional", 
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.YOURNAME.cultivate",
      "buildNumber": "1"
    }
  }
}
```

## Step 3: Manual App Store Connect Setup

### 3.1 Access App Store Connect
1. Open your web browser
2. Go to: https://appstoreconnect.apple.com
3. Sign in with your Apple Developer account
4. Click "My Apps" in the top navigation

### 3.2 Create New App
1. Click the blue "+" button
2. Select "New App"
3. Choose "iOS" as the platform
4. Fill in the form:
   - **Name**: "Cultivate"
   - **Primary Language**: English (US)
   - **Bundle ID**: Select the bundle ID that matches your app.json exactly
   - **SKU**: Enter "cultivate-2025" (this is just an internal identifier)
5. Click "Create"

### 3.3 Complete Required App Information
1. In your new app, you'll see several sections with red warning icons
2. Click on "App Information" and fill in:
   - **Subtitle**: "Daily Devotional & Reflection"
   - **Categories**: 
     - Primary: Lifestyle
     - Secondary: Reference
3. Click on "Pricing and Availability":
   - Select "Free"
   - Choose "Available in all territories"
4. Save all changes

### 3.4 Prepare for Submission
1. Go to "App Privacy" section
2. Click "Get Started"
3. Answer the privacy questions (for your app, you likely collect no data since everything is stored locally)
4. Save and publish the privacy policy

## Step 4: Build and Submit Your App

### 4.1 Build the App
1. Open Terminal on your Mac
2. Navigate to your project folder: `cd /path/to/your/project`
3. Run: `eas build --platform ios`
4. Wait for the build to complete (10-15 minutes)

### 4.2 Submit to App Store Connect
1. In Terminal, run: `eas submit --platform ios`
2. When prompted, select the app you just created in App Store Connect
3. Wait for the submission to complete (2-5 minutes)

### 4.3 Verify Upload
1. Go back to App Store Connect
2. Click on your "Cultivate" app
3. Go to "TestFlight" tab
4. You should see your build processing (takes 5-10 minutes)
5. Once processed, you can add internal testers

## Step 5: Add TestFlight Testers

### 5.1 Internal Testing (Immediate)
1. In TestFlight section, click "Internal Testing"
2. Click "+" to create a new group
3. Name it "Internal Testers"
4. Add testers by email (must have access to your App Store Connect account)
5. Select your build and save

### 5.2 External Testing (1-3 days review)
1. Click "External Testing"
2. Click "+" to create a new group
3. Name it "Beta Testers"
4. Add up to 10,000 testers by email
5. Add testing notes explaining what to test
6. Submit for review (Apple reviews external TestFlight apps)

## Troubleshooting Common Issues

### If Bundle ID Error:
- Make sure your bundle ID in app.json exactly matches what you selected in App Store Connect
- Bundle ID format: `com.yourname.cultivate` (no spaces, lowercase)

### If Build Fails:
```bash
# Clear cache and try again
eas build:clear-cache
eas build --platform ios
```

### If Submission Still Fails:
1. Download the .ipa file from EAS dashboard
2. Install "Transporter" app from Mac App Store
3. Drag and drop your .ipa file into Transporter
4. Upload manually

## Timeline Expectations
- **App Store Connect setup**: 10-15 minutes
- **EAS build**: 10-15 minutes  
- **EAS submit**: 2-5 minutes
- **Build processing**: 5-10 minutes
- **Internal TestFlight**: Immediate after processing
- **External TestFlight**: 1-3 days for Apple review

## Success Indicators
✅ App appears in App Store Connect
✅ Build shows up in TestFlight
✅ Internal testers receive invitation emails
✅ App installs and runs on test devices

Your app is ready for TestFlight once you complete these steps!