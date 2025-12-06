import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCqt_F5Q9R4Gf8zOp465ygslDQbOSv-1zA",
  authDomain: "e-commerce-27aaf.firebaseapp.com",
  projectId: "e-commerce-27aaf",
  storageBucket: "e-commerce-27aaf.firebasestorage.app",
  messagingSenderId: "1083900132263",
  appId: "1:1083900132263:web:a460bfa2abcd838b575482",
  measurementId: "G-R4DQDB67GK"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export default app