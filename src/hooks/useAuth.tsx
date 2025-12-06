"use client"

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '@/lib/firebase'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser)
      
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUser({
            uid: firebaseUser.uid,
            name: userData.name || firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            role: userData.role || 'user',
            addresses: userData.addresses || [],
            orders: userData.orders || [],
            createdAt: userData.createdAt?.toDate() || new Date()
          })
        } else {
          // Create new user document
          const newUser: User = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            role: 'user',
            addresses: [],
            orders: [],
            createdAt: new Date()
          }
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
          setUser(newUser)
        }
      } else {
        setUser(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(firebaseUser, { displayName: name })
      
      // Create user document in Firestore
      const newUser: User = {
        uid: firebaseUser.uid,
        name,
        email,
        role: 'user',
        addresses: [],
        orders: [],
        createdAt: new Date()
      }
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const { user: firebaseUser } = await signInWithPopup(auth, googleProvider)
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      if (!userDoc.exists()) {
        // Create new user document
        const newUser: User = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          role: 'user',
          addresses: [],
          orders: [],
          createdAt: new Date()
        }
        await setDoc(doc(db, 'users', firebaseUser.uid), newUser)
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}