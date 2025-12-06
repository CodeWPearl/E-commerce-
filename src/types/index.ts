export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  createdAt: Date
  featured?: boolean
}

export interface User {
  uid: string
  name: string
  email: string
  role: 'user' | 'admin'
  addresses: Address[]
  orders: string[]
  createdAt: Date
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  search?: string
}