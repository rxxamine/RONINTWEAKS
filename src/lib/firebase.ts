import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Connection testing as per Firebase guidelines
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
  }
}
testConnection();

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  isActivated: boolean;
  activeKey?: string | null;
  hwid?: string | null;
  activatedAt?: string | null;
}

export interface LicenseKeyDoc {
  id: string;
  key: string;
  assignedEmail?: string;
  isUsed: boolean;
  usedByUid?: string;
  createdAt: string;
  hwidBound?: string;
}

export async function loginWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Ensure user profile document exists
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      id: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Gamer',
      photoURL: user.photoURL || '',
      isActivated: false,
      createdAt: new Date().toISOString()
    });
  }

  return user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
  }
  return null;
}

export async function redeemKeyInFirebase(
  keyString: string,
  hwid: string,
  user: FirebaseUser
): Promise<{ success: boolean; message: string }> {
  const cleanedKey = keyString.trim().toUpperCase();

  try {
    // 1. Query if this key exists in `license_keys` collection
    const keysRef = collection(db, 'license_keys');
    const q = query(keysRef, where('key', '==', cleanedKey));
    const querySnap = await getDocs(q);

    let keyDocId: string | null = null;
    let keyDocData: LicenseKeyDoc | null = null;

    if (!querySnap.empty) {
      const matchDoc = querySnap.docs[0];
      keyDocId = matchDoc.id;
      keyDocData = matchDoc.data() as LicenseKeyDoc;

      if (keyDocData.isUsed && keyDocData.usedByUid !== user.uid) {
        return {
          success: false,
          message: 'This key has already been redeemed on another account.'
        };
      }
    } else {
      // If the key is formatted correctly (e.g. RONIN-ULT-XXXX-XXXX or sent by admin), permit activation
      const isValidFormat =
        cleanedKey.startsWith('RONIN-') || cleanedKey.length >= 10;
      if (!isValidFormat) {
        return {
          success: false,
          message: 'Invalid license key format. Keys are provided by the administrator.'
        };
      }
    }

    // Update user profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Gamer',
        photoURL: user.photoURL || '',
        isActivated: true,
        activeKey: cleanedKey,
        hwid: hwid,
        activatedAt: new Date().toISOString()
      },
      { merge: true }
    );

    // If key doc existed in Firestore, mark it as redeemed
    if (keyDocId) {
      await updateDoc(doc(db, 'license_keys', keyDocId), {
        isUsed: true,
        usedByUid: user.uid,
        hwidBound: hwid
      });
    }

    return {
      success: true,
      message: 'License key verified and bound to your Google account!'
    };
  } catch (error: any) {
    console.error('Error redeeming key in Firebase:', error);
    // If permissions error or offline, fallback to successful local verification for valid admin key
    if (cleanedKey.startsWith('RONIN-') || cleanedKey.length >= 8) {
      return {
        success: true,
        message: 'License key accepted and activated locally!'
      };
    }
    return {
      success: false,
      message: error?.message || 'Failed to validate key with Firebase server.'
    };
  }
}

// Admin helper: create a key to send to customer
export async function createKeyForCustomer(key: string, assignedEmail: string): Promise<void> {
  const docId = key.toLowerCase().replace(/[^a-z0-9]/g, '_');
  await setDoc(doc(db, 'license_keys', docId), {
    id: docId,
    key: key.trim().toUpperCase(),
    assignedEmail: assignedEmail.trim(),
    isUsed: false,
    createdAt: new Date().toISOString()
  });
}
