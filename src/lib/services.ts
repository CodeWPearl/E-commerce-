import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'
import { Product, User, Order, Category } from '@/types'

// Product Services
export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, where('featured', '==', true), limit(8))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Product[]
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  },

  // Get product by ID
  async getProduct(id: string): Promise<Product | null> {
    try {
      const productRef = doc(db, 'products', id)
      const snapshot = await getDoc(productRef)
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
          createdAt: snapshot.data().createdAt?.toDate() || new Date()
        } as Product
      }
      return null
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, where('category', '==', category))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  },

  // Add new product (admin only)
  async addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
    try {
      const productsRef = collection(db, 'products')
      const docRef = await addDoc(productsRef, {
        ...product,
        createdAt: Timestamp.fromDate(new Date())
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  },

  // Update product (admin only)
  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    try {
      const productRef = doc(db, 'products', id)
      await updateDoc(productRef, {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      })
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  // Delete product (admin only)
  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = doc(db, 'products', id)
      await deleteDoc(productRef)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }
}

// User Services
export const userService = {
  // Get user by ID
  async getUser(uid: string): Promise<User | null> {
    try {
      const userRef = doc(db, 'users', uid)
      const snapshot = await getDoc(userRef)
      if (snapshot.exists()) {
        return {
          ...snapshot.data(),
          createdAt: snapshot.data().createdAt?.toDate() || new Date()
        } as User
      }
      return null
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  },

  // Update user profile
  async updateUser(uid: string, updates: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date())
      })
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }
}

// Order Services
export const orderService = {
  // Create new order
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const ordersRef = collection(db, 'orders')
      const docRef = await addDoc(ordersRef, {
        ...order,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  // Get user orders
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const ordersRef = collection(db, 'orders')
      const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Order[]
    } catch (error) {
      console.error('Error fetching user orders:', error)
      return []
    }
  },

  // Get order by ID
  async getOrder(id: string): Promise<Order | null> {
    try {
      const orderRef = doc(db, 'orders', id)
      const snapshot = await getDoc(orderRef)
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
          createdAt: snapshot.data().createdAt?.toDate() || new Date(),
          updatedAt: snapshot.data().updatedAt?.toDate() || new Date()
        } as Order
      }
      return null
    } catch (error) {
      console.error('Error fetching order:', error)
      return null
    }
  },

  // Update order status (admin only)
  async updateOrderStatus(id: string, status: Order['status']): Promise<void> {
    try {
      const orderRef = doc(db, 'orders', id)
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.fromDate(new Date())
      })
    } catch (error) {
      console.error('Error updating order status:', error)
      throw error
    }
  }
}

// Storage Services
export const storageService = {
  // Upload image
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  // Delete image
  async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path)
      await deleteObject(storageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}

// Search Services
export const searchService = {
  // Search products
  async searchProducts(searchTerm: string, category?: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products')
      let q = query(productsRef)
      
      if (category && category !== 'All') {
        q = query(productsRef, where('category', '==', category))
      }
      
      const snapshot = await getDocs(q)
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Product[]

      // Client-side filtering for search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return products.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        )
      }

      return products
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  }
}