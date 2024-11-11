import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA7rTw7G4vIhg5nonXi9QO9MviErNyXv2k',
  authDomain: 'portfolio-2554.firebaseapp.com',
  databaseURL: 'https://portfolio-2554-default-rtdb.firebaseio.com/',
  projectId: 'portfolio-2554',
  storageBucket: 'portfolio-2554.appspot.com',
  messagingSenderId: '324422445588',
  appId: '1:324422445588:web:1c0dbe7ee91c99470f5501',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database setup
const db = getDatabase(app);

// Function to add data to Realtime Database
export const addMessage = async (messageData) => {
  try {
    const newMessageRef = ref(db, 'contactMessages/' + new Date().getTime());
    await set(newMessageRef, messageData);
    console.log('Message saved successfully!');
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

export default app;
