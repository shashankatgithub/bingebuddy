# Binge Buddy 👋


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

3. Start the app in iOS device


   ```bash
    npx expo run:ios --device
   ```

## Project Structure 

```bash
src/
├── app/                     # App-specific logic (routes/layouts)
│   ├── (auth)/              # Authentication-specific routes
│   ├── (main)/              # Main app-specific routes
│   ├── (onboarding)/        # Onboarding-specific routes
│   ├── _layout.tsx          # Global layout (Expo Router)
│   ├── +not-found.tsx       # Custom 404 page
│   └── index.tsx            # Root route
├── assets/                  # Static assets (e.g., images, fonts)
│   ├── fonts/               # Font files
│   └── images/              # Image files
├── components/              # Reusable UI components
│   ├── atoms/               # Small, reusable components (e.g., Button, Input)
│   ├── molecules/           # Composed components (e.g., Card, ListItem)
│   ├── organisms/           # Complex UI components (e.g., Header, Footer)
│   └── pages/               # Screen-specific components
├── constants/               # Application constants
│   ├── imagePath.ts         # Paths for images
│   ├── route.ts             # Navigation route constants
│   └── strings.ts           # App-wide text constants
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts           # Authentication-related hooks
│   ├── useSwipe.ts          # Gesture/animation logic
│   └── useFetch.ts          # API fetching logic
├── navigation/              # Navigation-related logic
│   ├── AppNavigator.tsx     # Main app navigator
│   └── AuthNavigator.tsx    # Authentication navigator
├── state/                   # State management (Redux/Zustand/Recoil)
│   ├── store.ts             # Redux store configuration
│   ├── userSlice.ts         # User state slice
│   └── otherSlice.ts        # Other Redux slices
├── styles/                  # Centralized styles
│   ├── colors.tsx           # Color palette
│   ├── gradients.tsx        # Gradient definitions
│   ├── globalStyles.tsx     # Global reusable styles
│   └── index.tsx            # Barrel file for styles
├── utils/                   # Utility functions/helpers
│   ├── apiClient.ts         # API client configuration (e.g., Axios)
│   ├── formatDate.ts        # Date formatting utility
│   └── validateForm.ts      # Form validation logic
├── tests/                   # Unit/Integration tests
│   ├── components/          # Component tests
│   ├── hooks/               # Hook tests
│   ├── utils/               # Utility function tests
│   └── screens/             # Screen tests
├────────────
```