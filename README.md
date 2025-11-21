## Tinder Clone Mobile App

React Native (Expo) swipe-and-match app.

Key features
- Full-screen swipe cards with tap-to-change photo
- Like/Dislike persisted to API (`/api/likes`)
- Rewind to previous card with API (`/api/rewind`)
- List of liked people
- OTA updates via Expo Updates
- Production Apk is available in the links section (using AWS as backend server)


Quick start
- Requirements: Node 18+, npm, Expo CLI (or use `npx`) and a device/emulator
- Install: `npm install`
- Env: env file is already added in the project, you can use it as it is.
- Run: `npx expo start -c` and open on Android emulator or Expo Go


Links
- Expo Go: https://expo.dev/go?sdkVersion=52&platform=android&device=true
- Prebuild app: https://drive.google.com/drive/folders/1nWFpAbHDv-cqKXAH4CRrFHTU1UiY68Sy?usp=sharing
- Production app: https://drive.google.com/drive/folders/1nWFpAbHDv-cqKXAH4CRrFHTU1UiY68Sy?usp=sharing
- Backend: https://github.com/khrsman/tinder-clone-backend-app



Run options
- Option 1: Expo Go (fast iteration)
  - Start: `npx expo start -c`
  - Open the QR in Expo Go and scan generated QR code or manually enter URL
  - Note: Splash screen may not match configured assets in Expo Go; use prebuild for exact splash behavior

- Option 2: Prebuild application (native project)
  - Start: `npx expo start -c`
  - Open the QR in Expo Go and scan generated QR code or manually enter URL
  - Splash screen will follow `app.json` configuration

Production build (APK)
- `npx eas build -p android --profile production`

Tech & libraries
- Expo: runtime, dev tools, OTA updates support
- Expo Router: file-based navigation and tab layout
- React Query: server-state fetching/caching for people and liked-people APIs
- Recoil: lightweight client state for current index and liked IDs
- React Native Reanimated + Gesture Handler: smooth swipe gestures and animations
- Expo Linear Gradient: overlay for card readability
- Vector Icons: Material icons for actions and tabs
- Safe Area Context: consistent layout across devices
- Atomic Design: Components are structured into atoms, molecules, and organisms


Screenshots
<p>
  <img src="assets/screenshots/Screenshot1.png" width="260" />
  <img src="assets/screenshots/Screenshot2.png" width="260" />
  <img src="assets/screenshots/Screenshot3.png" width="260" />
  <img src="assets/screenshots/Screenshot4.png" width="260" />
</p>
