# How to Download Your App File from Expo

## Step 1: Go to Expo Dashboard

1. **Open your web browser**
2. **Go to:** https://expo.dev
3. **Sign in** with your Expo account (same email/password you used for EAS)

## Step 2: Find Your Project

1. **Look for "Cultivate" or "cultivate-devotional"** in your projects list
2. **Click on the project name**

## Step 3: Navigate to Builds

1. **Look for a "Builds" tab** on the left sidebar
2. **Click "Builds"**
3. You should see a list of your app builds

## Step 4: Find Your iOS Build

Look for a build that shows:
- **Platform:** iOS
- **Status:** FINISHED (green checkmark)
- **Date:** Most recent date

## Step 5: Download the File

1. **Click on the build** (the row with your iOS build)
2. **Look for a "Download" button** or "Download artifact" link
3. **Click Download**
4. **Save the .ipa file** to your Desktop

## If You Can't Find the Download Button

### Alternative Method:
1. **Click on the build row** to open build details
2. **Look for "Artifacts" section**
3. **Click the download icon** next to the .ipa file
4. **Save to Desktop**

## If You Still Can't Find It

### What to Look For:
- The file will be named something like: `Cultivate-[numbers].ipa`
- File size will be around 20-50 MB
- It should download like any other file

### If No Builds Show Up:
This means your build might not have completed successfully. In this case:

1. **Go back to terminal/command prompt**
2. **Run:** `eas build --platform ios`
3. **Wait 10-15 minutes** for build to complete
4. **Then come back to download**

## After Download

Once you have the .ipa file:
1. **Install Transporter** from Mac App Store
2. **Open Transporter**
3. **Drag the .ipa file** into Transporter
4. **Sign in with Apple ID**
5. **Click "Deliver"**

## Need More Help?

If you're still having trouble:
1. **Take a screenshot** of what you see on the Expo dashboard
2. **Tell me exactly what you see** when you go to expo.dev
3. I can provide more specific guidance

The download should be straightforward once you find the right build in your dashboard.