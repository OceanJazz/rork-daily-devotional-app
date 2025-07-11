# Copy These Commands to Your Terminal

## Run These Commands One by One:

### 1. Clear Caches
```bash
npx expo install --fix
```

### 2. Clear EAS Cache
```bash
npx eas build:clear-cache
```

### 3. Login to EAS
```bash
npx eas login
```

### 4. Build Your App
```bash
npx eas build --platform ios --clear-cache
```

### 5. Submit to App Store (after build completes)
```bash
npx eas submit --platform ios
```

## How to Use These Commands:

1. **Open Terminal/Command Prompt**
   - Mac: Press `Cmd + Space`, type "Terminal"
   - Windows: Press `Win + R`, type "cmd"

2. **Navigate to Your Project**
   ```bash
   cd path/to/your/cultivate-app
   ```

3. **Copy and paste each command above, one at a time**

4. **Wait for each command to finish before running the next one**

## What Each Command Does:
- `npx expo install --fix` - Fixes package issues
- `npx eas build:clear-cache` - Clears build cache
- `npx eas login` - Logs you into Expo Application Services
- `npx eas build` - Builds your app for iOS
- `npx eas submit` - Submits your app to App Store Connect

## If You Get Errors:
- Make sure you're in the correct project directory
- Check that you have an active Apple Developer account
- Verify your bundle identifier is updated in `app.json`

**Run these commands in order and let me know what happens!**