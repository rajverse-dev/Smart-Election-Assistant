import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent as firebaseLogEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
let analytics;

try {
  // Only initialize if we have at least the project ID or API key configured
  if (firebaseConfig.apiKey || firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized successfully.");
  } else {
    console.warn("Firebase configuration is missing. Analytics tracking is disabled locally.");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

/**
 * Safely log custom events. Will silently fail if Firebase is not configured.
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Additional metadata to log
 */
export const logEvent = (eventName, eventParams) => {
  if (analytics) {
    try {
      firebaseLogEvent(analytics, eventName, eventParams);
    } catch (e) {
      console.warn(`Failed to log event: ${eventName}`, e);
    }
  }
};
