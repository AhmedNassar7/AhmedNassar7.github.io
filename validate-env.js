import dotenv from 'dotenv';
import process from 'process';

// Load environment variables from .env file
dotenv.config();

const requiredEnvVariables = [
  'VITE_GOOGLE_SITE_VERIFICATION',
  'VITE_GOOGLE_ANALYTICS_ID',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_ANALYTICS_ID',
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_USER_ID',
  'VITE_EMAILJS_TO_EMAIL',
];

// Check if required environment variables are available in process.env
const missingVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable],
);

if (missingVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVariables.join(', ')}`,
  );
} else {
  console.log('All required environment variables are set.');
}
