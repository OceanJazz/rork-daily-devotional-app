# Quick Diagnosis - Run These Commands

## Get Build Error Details:

```bash
# 1. See your recent builds
npx eas build:list
```

```bash
# 2. View the failed build details (use the BUILD_ID from step 1)
npx eas build:view [BUILD_ID]
```

```bash
# 3. Check if assets exist
ls -la assets/images/
```

```bash
# 4. Test local export
npx expo export
```

## After Running These:

1. **Copy the error message** from `npx eas build:view [BUILD_ID]`
2. **Tell me what files** you see in `assets/images/`
3. **Let me know if** `npx expo export` works or fails

## Quick Fixes to Try:

```bash
# Fix package issues
npx expo install --fix

# Clear everything and rebuild
rm -rf node_modules .expo
npm install
npx eas build --platform ios --clear-cache
```

**The detailed error from `npx eas build:view` will tell us exactly what's wrong.**