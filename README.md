# 🎬 BingeBuddy

> *Your AI-powered guide to what's worth watching — on OTT and in theaters, personalized to you.*

[![TypeScript](https://img.shields.io/badge/TypeScript-85%25-3178c6?logo=typescript)](https://typescriptlang.org)
[![React Native](https://img.shields.io/badge/React%20Native-Expo%2052-61dafb?logo=react)](https://expo.dev)
[![Python](https://img.shields.io/badge/Backend-Python-3776ab?logo=python)](https://python.org)
[![Redux](https://img.shields.io/badge/State-Redux%20Toolkit-764abc?logo=redux)](https://redux-toolkit.js.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey)](#)

---

## What is BingeBuddy?

BingeBuddy solves a real problem: with 10+ streaming services and a new theatrical release every week, most people spend more time *deciding* what to watch than actually watching. BingeBuddy cuts through that by learning your taste and surfacing recommendations that are genuinely relevant — whether you're looking for something on Netflix at home or something playing nearby.

It's a full-stack mobile app with a **React Native + Expo frontend** and a **Python-powered recommendation backend**, built for iOS, Android, and Web from a single codebase.

---

## Features

**Personalized Recommendations**
The Python backend analyses preferences to suggest titles across OTT platforms and theaters, with AI-generated explanations for why a title fits your taste (rendered as markdown in the app).

**Location-Aware Discovery**
Uses device location to surface what's popular or showing near you. Background fetch keeps recommendations fresh without requiring the app to be open.

**Seamless Auth & Onboarding**
Google OAuth sign-in via `expo-auth-session`, followed by a structured onboarding flow that builds the initial taste profile.

**Dynamic Theming**
Movie poster colors are extracted at runtime using `react-native-image-colors` to tint the UI per-title — a subtle detail that makes the experience feel native to each piece of content.

**Cross-Platform**
Runs on iOS, Android, and Web from one TypeScript codebase via Expo Router's file-based navigation.

---

## Architecture

```
bingebuddy/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Google OAuth, session management
│   │   ├── (onboarding)/     # Taste profile setup flow
│   │   ├── (main)/           # Core recommendation screens
│   │   └── _layout.tsx       # Global layout + Expo Router config
│   ├── components/
│   │   ├── atoms/            # Button, Input, Badge — base primitives
│   │   ├── molecules/        # Card, ListItem — composed components
│   │   ├── organisms/        # Header, BottomSheet — complex UI units
│   │   └── pages/            # Screen-level components
│   ├── state/
│   │   ├── store.ts          # Redux store
│   │   └── userSlice.ts      # User preferences + auth state
│   ├── hooks/
│   │   ├── useAuth.ts        # Auth state + session management
│   │   ├── useSwipe.ts       # Gesture/swipe interactions
│   │   └── useFetch.ts       # API data fetching
│   ├── styles/               # Design tokens: colors, gradients, globals
│   └── utils/
│       ├── apiClient.ts      # Axios client for Python backend
│       └── validateForm.ts   # Form validation helpers
├── ios/                      # Native iOS build artifacts
├── build/                    # Production build output
├── app.json                  # Expo config (permissions, plugins, schemes)
├── tailwind.config.js        # NativeWind (Tailwind for React Native)
└── package.json
```

**Two-layer architecture:**
- **Frontend** (TypeScript / React Native / Expo): UI, routing, state, and device APIs
- **Backend** (Python): recommendation engine — processes taste signals and returns ranked, explained suggestions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile framework | React Native 0.76 + Expo 52 (New Architecture enabled) |
| Routing | Expo Router 4 (file-based, typed routes) |
| Language | TypeScript |
| State management | Redux Toolkit + React Redux |
| Styling | NativeWind (Tailwind CSS for RN) + Expo Linear Gradient |
| Recommendation engine | Python |
| Auth | Google OAuth via expo-auth-session |
| Storage | MMKV (fast key-value, replaces AsyncStorage) |
| Animations | React Native Reanimated 3 + Gesture Handler |
| Location | expo-location (foreground + background) |
| Background sync | react-native-background-fetch |
| Component design | Atomic Design (atoms → molecules → organisms) |
| Testing | Jest + jest-expo |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Studio for emulator
- Python 3.10+ for the recommendation backend

### Install & Run

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start
```

From the dev server, choose your target:

- **iOS Simulator** — press `i`
- **Android Emulator** — press `a`
- **Web** — press `w`
- **Physical iOS device** — `npx expo run:ios --device`

### Environment

Create a `.env` file:

```
GOOGLE_CLIENT_ID=your_google_oauth_client_id
API_BASE_URL=http://localhost:8000   # Python backend
```

---

## Design Decisions Worth Noting

**Atomic Design for components.** The `atoms → molecules → organisms → pages` hierarchy keeps the component library composable and prevents UI sprawl as the app grows. It also makes it straightforward to test components in isolation.

**MMKV over AsyncStorage.** MMKV is a C++ key-value store that's ~30x faster than AsyncStorage for reads. For a recommendations app where cached content should feel instant, this matters.

**Background fetch for proactive freshness.** Rather than showing stale recommendations on open, the app uses `react-native-background-fetch` to silently refresh suggestions when the device is idle — so the first thing you see is always current.

**New Architecture enabled.** `newArchEnabled: true` in `app.json` opts into Expo's Fabric renderer and the new bridgeless architecture, improving animation performance and concurrent rendering.

**Location as a first-class signal.** The app requests location for both foreground and background use — not for tracking, but to surface what's actually playing near you. The iOS `infoPlist` strings and Android permissions are explicitly declared and scoped to this purpose.

---

## Roadmap

- [ ] Streaming availability lookup (which platforms have this title right now)
- [ ] Watchlist with push notification reminders
- [ ] Social layer — share picks with friends
- [ ] Collaborative filtering improvements in the Python backend
- [ ] TestFlight / Play Store beta

---

## About

Built by **Shashank Srivastava** ([@shashankatgithub](https://github.com/shashankatgithub)), **Reetika** ([@Reetika002](https://github.com/Reetika002)) and **Nirmit Srivastava** ([@nirmitsrivastava](https://github.com/nirmitsrivastava)).

Shashank is a Senior Product Manager with 13+ years of experience, most recently building AI-first engineering systems at Ethos. BingeBuddy is a personal project that sits at the intersection of product instinct and hands-on engineering — built to scratch a real itch, and to demonstrate that PM ≠ just the person who writes the PRD.

---

*Because "what should I watch tonight?" deserves a better answer than scrolling for 45 minutes.*
