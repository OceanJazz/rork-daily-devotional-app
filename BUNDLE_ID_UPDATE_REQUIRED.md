# CRITICAL: Update Bundle Identifier Before Submission

## Required Action

You MUST update the bundle identifier in `app.json` before submitting to the App Store.

### Step 1: Open app.json
Find this line in the newly created `app.json`:
```json
"bundleIdentifier": "com.yourname.cultivate"
```

### Step 2: Replace "yourname"
Change it to your actual name or company name (lowercase, no spaces):

**Examples:**
- If your name is John Smith: `"com.johnsmith.cultivate"`
- If your company is Acme Corp: `"com.acmecorp.cultivate"`
- If you want to use your domain: `"com.yourdomain.cultivate"`

### Step 3: Update Android Package Too
Also update this line:
```json
"package": "com.yourname.cultivate"
```

Make it match your iOS bundle identifier exactly.

### Step 4: The Bundle ID Must Be:
- Unique (not used by any other app)
- Reverse domain format (com.yourname.appname)
- Lowercase letters only
- No spaces or special characters except dots and hyphens

## After Updating

1. Save the file
2. Run: `eas build --platform ios`
3. Then: `eas submit --platform ios`

The "companyName" error should be resolved once you have a proper bundle identifier.