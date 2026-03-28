// Asset verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for required assets...\n');

const requiredAssets = [
  'assets/icon.png',
  'assets/adaptive-icon.png', 
  'assets/splash.png',
  'assets/favicon.png'
];

const assetsFolder = 'assets';
const imagesFolder = 'assets/images';

// Check if assets folder exists
if (fs.existsSync(assetsFolder)) {
  console.log('✅ /assets folder exists');
  const assetsFiles = fs.readdirSync(assetsFolder);
  console.log('📁 Files in /assets:', assetsFiles);
} else {
  console.log('❌ /assets folder missing');
}

// Check if assets/images folder exists
if (fs.existsSync(imagesFolder)) {
  console.log('✅ /assets/images folder exists');
  const imagesFiles = fs.readdirSync(imagesFolder);
  console.log('📁 Files in /assets/images:', imagesFiles);
} else {
  console.log('❌ /assets/images folder missing');
}

// Check each required asset
requiredAssets.forEach(assetPath => {
  if (fs.existsSync(assetPath)) {
    const stats = fs.statSync(assetPath);
    console.log(`✅ ${assetPath} - ${Math.round(stats.size / 1024)}KB`);
  } else {
    console.log(`❌ ${assetPath} - MISSING`);
  }
});

// Check for app.json
if (fs.existsSync('app.json')) {
  console.log('\n✅ app.json exists');
  const appConfig = JSON.parse(fs.readFileSync('app.json', 'utf8'));
  console.log('📱 App name:', appConfig.expo?.name);
  console.log('📦 Bundle ID:', appConfig.expo?.ios?.bundleIdentifier);
} else if (fs.existsSync('app.config.js')) {
  console.log('\n✅ app.config.js exists');
} else {
  console.log('\n❌ app.json or app.config.js missing');
}

console.log('\n🚀 Run this script with: node check-assets.js');