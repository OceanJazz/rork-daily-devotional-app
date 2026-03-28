# Creating Required Assets for Cultivate

## Quick Asset Creation Guide

### 1. App Icon (icon.png)
- **Size:** 1024x1024px
- **Format:** PNG (no transparency)
- **Content:** Should represent your app clearly
- **Suggestion:** Use your splash screen design as base, simplified for small sizes

### 2. Adaptive Icon (adaptive-icon.png)
- **Size:** 1024x1024px  
- **Format:** PNG
- **Android specific:** Center important content (avoid edges)

### 3. Splash Screen (splash.png)
- **Your image:** https://imgur.com/a/cultivate-splash-screen-pm3nvi8
- **Size:** 1284x2778px (iPhone 14 Pro Max)
- **Format:** PNG
- **Usage:** Full screen loading image

### 4. Favicon (favicon.png)
- **Size:** 48x48px
- **Format:** PNG
- **Usage:** Web browser tab icon

## Using Your Existing Splash Image

Since you already have a splash screen image:

1. **Download** your image from the Imgur link
2. **Resize** to 1284x2778px if needed
3. **Save** as `splash.png` in `/assets/` folder
4. **Create icon** by cropping/simplifying the splash design to 1024x1024px

## Free Tools for Resizing

- **Online:** Canva, Figma (free)
- **Mac:** Preview app (built-in)
- **Cross-platform:** GIMP (free)

## Asset Folder Structure

```
assets/
├── icon.png          (1024x1024)
├── adaptive-icon.png (1024x1024)
├── splash.png        (1284x2778)
└── favicon.png       (48x48)
```

Once you have these assets, you'll be ready to build and submit!