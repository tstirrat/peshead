import { firestore, initializeApp } from 'firebase-admin';
import { config } from 'firebase-functions';

initializeApp(config().firebase);
export const db = firestore();
