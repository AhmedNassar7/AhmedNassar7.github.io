import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  onValue,
  runTransaction,
} from 'firebase/database';
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

// A missing/incomplete Firebase config used to make this module throw at
// import time. Contact.jsx imports addMessage unconditionally and nothing
// in the tree catches a module-init throw, so that took down the entire
// app (blank white page) over what should only disable one form's backup
// storage. Degrade instead: log it, skip Firebase init, and let addMessage
// reject — Contact.jsx already handles a rejected addMessage via
// Promise.allSettled (see its handleSubmit), so no caller changes needed.
const isFirebaseConfigured = missingVariables.length === 0;

if (!isFirebaseConfigured) {
  missingVariables.forEach((variable) => {
    logger.error(`Environment variable ${variable} is missing.`);
  });
  logger.error(
    `Firebase is not configured (missing: ${missingVariables.join(', ')}). ` +
      'Contact form submissions will not be saved to the database.',
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

// Example for logging non-sensitive information in development
if (import.meta.env.MODE === 'production') {
  logger.info('Production mode enabled');
} else {
  logger.debug('Debugging mode active');
}

// Initialize Firebase — only when fully configured, so an incomplete env
// never hands a half-valid config to the SDK.
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getDatabase(app) : null;

// The Realtime Database SDK opens its WebSocket/long-polling connection
// lazily, on first read/write — which otherwise means the contact form's
// submit is what pays for the full connection handshake, making it feel
// slow even when nothing is wrong. Subscribing to the special
// ".info/connected" path is Firebase's own documented way to open that
// connection immediately at page load instead, well ahead of anyone
// reaching the form. It's always readable regardless of the database's
// security rules, so this is safe on any project configuration.
if (db) {
  onValue(ref(db, '.info/connected'), () => {});
}

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
  if (!db) {
    throw new Error(
      'Firebase is not configured — missing environment variables: ' +
        `${missingVariables.join(', ')}.`,
    );
  }

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
    // Callers (Contact.jsx) await this and branch on success/failure to
    // update the submit button and show an error alert — swallowing the
    // error here instead of rethrowing made every Firebase failure look
    // like a success to the user.
    throw error;
  }
};

// ---------------------------------------------------------------------------
// Global "like this site" counter
// ---------------------------------------------------------------------------
// A single shared integer at /likes/total that every visitor can nudge
// upward — the running number is the whole point (it reads as "lots of
// people have been here and enjoyed it"), so it's streamed back live via
// onValue and ticks up on screen as other people like in real time.
//
// Writes go through runTransaction so concurrent likes from different
// visitors can't clobber each other. The client batches a visitor's rapid
// clicks and sends them as one increment (see LikeButton), and enforces a
// per-visitor cap in the UI; a matching Realtime Database rule should also
// reject any single write that jumps the total by more than that cap or
// moves it downward. Suggested rules (Firebase console → Realtime Database
// → Rules):
//
//   {
//     "rules": {
//       "likes": {
//         "total": {
//           ".read": true,
//           ".write": true,
//           ".validate": "newData.isNumber() && newData.val() >= (data.val() || 0) && newData.val() <= (data.val() || 0) + 50"
//         }
//       }
//     }
//   }

export const LIKES_PATH = 'likes/total';

// Re-exported so UI can hide the like button entirely when Firebase has no
// config, the same way the contact form degrades (see note above).
export const isFirebaseReady = isFirebaseConfigured;

/**
 * Subscribe to the live like total. Calls `callback(total)` immediately with
 * the current value and again on every remote change.
 * @param {(total: number) => void} callback
 * @returns {() => void} unsubscribe
 */
export const subscribeToLikes = (callback) => {
  if (!db) return () => {};
  return onValue(ref(db, LIKES_PATH), (snapshot) => {
    callback(snapshot.val() ?? 0);
  });
};

/**
 * Atomically add `count` likes to the global total.
 * @param {number} count - number of likes to add (floored, non-negative).
 * @returns {Promise<number|null>} the committed total after the write, so the
 *   caller can reconcile its optimistic count against the real value without
 *   waiting for the onValue echo.
 */
export const addLikes = async (count) => {
  if (!db) {
    throw new Error('Firebase is not configured — likes cannot be saved.');
  }

  const amount = Math.max(0, Math.floor(count));
  if (amount === 0) return 0;

  try {
    const result = await runTransaction(
      ref(db, LIKES_PATH),
      (current) => (current ?? 0) + amount,
    );
    logger.info(`Added ${amount} like(s) to the global counter.`);
    const total = result?.snapshot?.val();
    return typeof total === 'number' ? total : null;
  } catch (error) {
    logger.error(`Error incrementing like counter: ${error.message}.`);
    throw error;
  }
};

export default app;
