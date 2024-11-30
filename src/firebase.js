import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { Logger, LogLevel } from './utils/logger';

// Instantiate the Logger
const logger = new Logger(LogLevel.DEBUG);

// Validate required Firebase environment variables
const requiredEnvVariables = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingVariables = requiredEnvVariables.filter(
  (variable) => !import.meta.env[variable],
);

if (missingVariables.length > 0) {
  missingVariables.forEach((variable) => {
    logger.error(`Environment variable ${variable} is missing.`);
  });
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(', ')}`,
  );
} else {
  logger.info('All required Firebase environment variables are present.');
}

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
const db = getDatabase(app);

/**
 * Helper to get the current date and time in the desired format.
 * @returns {string} Formatted timestamp in "YYYY-MM-DD HH:mm A" format
 */
const getFormattedTimestamp = () => {
  const now = new Date();

  // Format date as YYYY-MM-DD
  const date = now.toISOString().split('T')[0];

  // Format time in 12-hour format (e.g., 1:30 PM)
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0-hour or 13-hour to 12-hour format

  return `${date} ${hours}:${minutes} ${period}`;
};

/**
 * Add a message to the Firebase Realtime Database.
 * @param {Object} messageData - The message data to save.
 */
export const addMessage = async (messageData) => {
  try {
    // Use timestamp as the key for the message
    const timestampKey = Date.now().toString();

    // Save the message with a single formatted timestamp
    await set(ref(db, `contactMessages/${timestampKey}`), {
      ...messageData,
      timestamp: getFormattedTimestamp(), // Save combined date and time
    });

    logger.info('Message saved successfully!');
  } catch (error) {
    logger.error(
      `Error saving message to Firebase: ${error.message}. Stack: ${error.stack}`,
    );
  }
};

export default app;
