
---

## ✅ **BACKEND – `README.md`**

```markdown
# Shift Scheduler Backend (API)

This is the Express-based backend for the Shift Scheduler app. It handles:

- Timezone preference
- Shift conversion on timezone updates
- Communication with Firebase Realtime Database (via `firebase-admin`)

## 🌟 Features

- 🌍 Timezone API
  - GET `/api/timezone`: Fetch preferred timezone
  - PUT `/api/timezone`: Update preferred timezone and convert all shifts
- 🕒 Shift conversion logic
  - Converts all shift timestamps to the preferred timezone using Luxon
- 📡 Firebase Realtime Database connection
  - Stores workers, shifts, and timezone settings
- ⚙️ Environment-aware configuration (dev vs prod)
- 🧪 Supports Firebase Emulator Suite in local development

## 🛠 Tech Stack

- Express.js
- Firebase Admin SDK
- Luxon (timezone/date handling)
- Firebase Emulator Suite (local dev)

## 🔧 Setup

### 1. Clone the repo

```bash
git clone https://github.com/janfbacon/shift-scheduler-backend.git
cd shift-scheduler-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up firebase admin

Use a .env file to configure:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccount.json
PORT=8080
```

### 4. Run in Development
```bash
npm run dev
```

```bash
firebase emulators:start
```