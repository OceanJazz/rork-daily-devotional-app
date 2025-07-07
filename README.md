# Daily Devotional App

## Adding Your Custom Splash Screen

To add your custom splash screen image:

1. **Download your image** from: https://imgur.com/a/cultivate-splash-screen-pm3nvi8

2. **Create the assets folder** in your project root if it doesn't exist:
   ```
   mkdir assets
   ```

3. **Save the image** as `splash.png` in the `assets` folder:
   ```
   your-project/
   ├── assets/
   │   └── splash.png  <- Your splash screen image goes here
   ├── app/
   ├── components/
   └── ...
   ```

4. **Image requirements:**
   - Format: PNG
   - Recommended size: 1284x2778 pixels (iPhone 14 Pro Max resolution)
   - The image will cover the entire screen
   - Make sure important content is centered as it may be cropped on different screen sizes

5. **Test the splash screen:**
   ```bash
   npx expo start
   ```

## Additional Assets Needed

You'll also need these standard Expo assets in the `assets` folder:

- `icon.png` - App icon (1024x1024px)
- `adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `favicon.png` - Web favicon (48x48px)

You can generate these from your splash screen image or create separate designs.

## Publishing Your App

Once you have all assets in place, you can build and publish your app using EAS Build or Expo's classic build service.