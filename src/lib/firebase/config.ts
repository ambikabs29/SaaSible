// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

// Validate that Firebase config keys are present
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
  console.error("Firebase API Key is missing. Please set NEXT_PUBLIC_FIREBASE_API_KEY in your environment.");
}
if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID") {
    console.error("Firebase Project ID is missing. Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID in your environment.");
}


// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
  try {
     app = initializeApp(firebaseConfig);
  } catch (error) {
     console.error("Failed to initialize Firebase:", error);
      // Optionally handle the error further, e.g., show a message to the user
      // For now, we'll let the auth/db/storage initializations fail below if app is undefined
  }

} else {
  app = getApp();
}


// Conditionally initialize Firebase services only if app initialization was successful
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const storage = app ? getStorage(app) : null;


// Export the initialized services (or null if initialization failed)
export { app, auth, db, storage };
