// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration is read from environment variables
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Populate these variables in your .env.local file for local development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional
};

// --- Initialization ---
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let firebaseInitializationError: string | null = null;

// Validate that Firebase config keys are present
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
  firebaseInitializationError = "Firebase API Key is missing or invalid. Please set NEXT_PUBLIC_FIREBASE_API_KEY correctly in your environment variables (e.g., .env.local). Refer to README.md for setup instructions.";
  console.error(firebaseInitializationError);
}
if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID") {
    firebaseInitializationError = "Firebase Project ID is missing or invalid. Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID correctly in your environment variables. Refer to README.md for setup instructions.";
    console.error(firebaseInitializationError);
}

// Initialize Firebase only if config seems valid and it hasn't been initialized yet
if (!firebaseInitializationError) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }

    // Initialize services only if app initialization was successful
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
    } else {
      // This case should technically not be reached if initializeApp throws on failure, but added for robustness.
       firebaseInitializationError = "Firebase app object could not be obtained.";
       console.error(firebaseInitializationError);
    }
  } catch (error: any) {
    console.error("Failed to initialize Firebase:", error);
    firebaseInitializationError = `Firebase initialization failed: ${error.message}. Please check your Firebase configuration in .env.local and ensure it matches your Firebase project settings.`;
    // Ensure services are null if initialization fails
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
   // Ensure services are null if config validation fails
    app = null;
    auth = null;
    db = null;
    storage = null;
}

// Export the initialized services (or null if initialization failed) and the error status
export { app, auth, db, storage, firebaseInitializationError };
