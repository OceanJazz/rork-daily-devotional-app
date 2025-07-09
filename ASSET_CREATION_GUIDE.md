# Quick Asset Creation Guide for Cultivate

## Your Existing Splash Screen
You already have a splash screen at: https://imgur.com/a/cultivate-splash-screen-pm3nvi8

## Required Assets Checklist

### 1. Splash Screen ✅ (You have this)
- **File:** `splash.png`
- **Size:** 1284x2778px
- **Action:** Download from Imgur and save to `/assets/splash.png`

### 2. App Icon ❌ (Need to create)
- **File:** `icon.png` 
- **Size:** 1024x1024px
- **Action:** Create from your splash screen design (simplified/cropped)

### 3. Adaptive Icon ❌ (Need to create)
- **File:** `adaptive-icon.png`
- **Size:** 1024x1024px  
- **Action:** Same as app icon, but ensure important content is centered

### 4. Favicon ❌ (Need to create)
- **File:** `favicon.png`
- **Size:** 48x48px
- **Action:** Tiny version of your app icon

## Free Tools to Create Assets

### Online (Recommended)
- **Canva:** Free, easy templates
- **Figma:** Professional design tool
- **Photopea:** Free Photoshop alternative

### Desktop
- **Mac:** Preview app (built-in resizing)
- **Windows:** Paint.NET (free)
- **Cross-platform:** GIMP (free)

## Quick Creation Steps

1. **Download your splash image** from Imgur
2. **Open in any image editor**
3. **For app icon:** Crop to square, resize to 1024x1024
4. **For adaptive icon:** Same as app icon
5. **For favicon:** Resize app icon to 48x48
6. **Save all to `/assets/` folder**

## Asset Folder Structure
```
assets/
├── icon.png          (1024x1024)
├── adaptive-icon.png (1024x1024)  
├── splash.png        (1284x2778)
└── favicon.png       (48x48)
```

## After Creating Assets

1. Update bundle identifier in `app.json`
2. Test build: `eas build --platform ios --profile preview`
3. If successful: `eas build --platform ios`
4. Submit: `eas submit --platform ios`

**Estimated time to create all assets: 15-30 minutes**