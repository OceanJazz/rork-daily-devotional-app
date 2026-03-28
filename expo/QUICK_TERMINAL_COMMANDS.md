# Quick Terminal Commands - Copy & Paste

## Run These Commands One by One:

### 1. Complete Clean Reset
```bash
rm -rf node_modules .expo
npx expo install --fix
npx eas build:clear-cache
npm install
```

### 2. Fresh Login
```bash
npx eas logout
npx eas login
```

### 3. Build with Verbose Logging
```bash
npx eas build --platform ios --clear-cache --non-interactive --verbose
```

### 4. Try Submission (Optional - if this fails, use manual upload)
```bash
npx eas submit --platform ios --verbose
```

### 5. Check Build Status
```bash
npx eas build:list
```

## If Submission Fails Again:

### Download and Manual Upload:
1. Go to https://expo.dev (find your build)
2. Download the .ipa file
3. Install "Transporter" app from Mac App Store
4. Drag .ipa into Transporter
5. Click "Deliver"

## What Each Command Does:
- `rm -rf node_modules .expo` - Removes all cached files
- `npx expo install --fix` - Fixes package dependencies
- `npx eas build:clear-cache` - Clears EAS build cache
- `--verbose` - Shows detailed logs for debugging
- `--non-interactive` - Prevents hanging on prompts

## Expected Results:
✅ Build completes successfully
✅ .ipa file is generated
✅ Either submission works OR manual upload succeeds
✅ App appears in TestFlight

**The complete reset should resolve the persistent submission errors. If not, manual upload is your reliable backup.**