# Fix: "Build command failed. Contact support."

## This Error Means
The actual build process is failing, not just submission. Let's diagnose and fix it.

## Step 1: Get Detailed Error Information

```bash
# Check your recent builds and their detailed status
npx eas build:list

# View the failed build details (replace BUILD_ID with your actual build ID)
npx eas build:view [BUILD_ID]

# Get full build logs
npx eas build:view [BUILD_ID] --json
```

## Step 2: Common Build Failure Fixes

### Fix A: Asset Path Issues
Check if your assets are in the correct location:

```bash
# Verify assets exist
ls -la assets/images/
```

Your `app.json` should point to the correct paths:
```json
{
  "expo": {
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash.png"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png"
      }
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    }
  }
}
```

### Fix B: Package Dependencies
```bash
# Fix package issues
npx expo install --fix
npm audit fix

# Reinstall node_modules
rm -rf node_modules
npm install
```

### Fix C: Expo SDK Compatibility
```bash
# Check for SDK compatibility issues
npx expo doctor

# Update to latest compatible versions
npx expo install --fix
```

## Step 3: Try Alternative Build Approach

### Option A: Local Build Test
```bash
# Test if the app builds locally first
npx expo export

# If that works, try EAS build again
npx eas build --platform ios --clear-cache
```

### Option B: Development Build First
```bash
# Try development build to isolate issues
npx eas build --platform ios --profile development
```

### Option C: Minimal Build Configuration
Create a minimal `eas.json` to test:
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "production": {
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  }
}
```

## Step 4: Check Build Environment

### Verify Your app.json Configuration:
```json
{
  "expo": {
    "name": "Cultivate",
    "slug": "cultivate-devotional",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.broadwayunitedmethodist.cultivate",
      "buildNumber": "2"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.broadwayunitedmethodist.cultivate"
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    }
  }
}
```

## Step 5: Emergency Workaround

If builds keep failing, try creating a new project:

```bash
# Create fresh project
npx create-expo-app CultivateNew --template blank-typescript

# Copy your source files
cp -r app/ components/ constants/ hooks/ store/ types/ utils/ CultivateNew/

# Copy assets
cp -r assets/ CultivateNew/

# Copy configuration
cp app.json package.json CultivateNew/

# Build from fresh project
cd CultivateNew
npx eas build --platform ios
```

## What to Do Next:

1. **Run Step 1** to get the detailed error message
2. **Share the specific error** from the build logs
3. **Try the fixes** based on what the error shows
4. **Use the emergency workaround** if nothing else works

## Common Build Failure Causes:
- Missing or corrupted asset files
- Package dependency conflicts
- Invalid app.json configuration
- Expo SDK version mismatches
- Certificate/provisioning issues

**Run the diagnostic commands first and let me know what specific error you see in the build logs.**