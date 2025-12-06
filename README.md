# StyleShop - Modern E-commerce Platform

A premium e-commerce platform built with Next.js 14, TypeScript, TailwindCSS, shadcn/ui, and Firebase. Features a beautiful, responsive design with smooth animations and a complete shopping experience.

## 🌟 Features

### User-Facing Features
- **Modern Design**: Premium, minimal design with custom color palette
- **Responsive Layout**: Fully responsive across all devices
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Google OAuth and email/password sign-in
- **User Dashboard**: Manage profile, orders, and addresses
- **Secure Checkout**: Step-by-step checkout process
- **Order Tracking**: View order history and status

### Technical Features
- **Next.js 14**: App Router with server-side rendering
- **TypeScript**: Full type safety throughout the application
- **Firebase Integration**: Authentication, Firestore, and Storage
- **TailwindCSS**: Utility-first styling with custom design system
- **shadcn/ui**: High-quality, accessible UI components
- **Responsive Images**: Optimized with Next.js Image component
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error boundaries and handling

## 🎨 Design System

### Color Palette
- **Pink**: `#FB77BF`
- **Orange**: `#FDA26A`
- **Yellow**: `#FDDF59`
- **Lime**: `#D3E76C`
- **Aqua**: `#63D3C4`
- **Blue**: `#7D9FD5`
- **Purple**: `#D297EB`

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Modern sans-serif** design for excellent readability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fronted
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Google and Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config to `src/lib/firebase.ts`

4. **Configure Firebase Security Rules**
   - Copy rules from `firebase-security-rules.txt`
   - Apply to your Firestore and Storage in Firebase Console

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart
│   ├── categories/        # Categories listing
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── order-success/     # Order confirmation
│   ├── products/          # Product pages
│   ├── signup/            # Registration page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── products/         # Product components
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
│   ├── useAuth.tsx       # Authentication hook
│   └── useCart.tsx       # Shopping cart hook
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── services.ts       # Firebase services
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    └── index.ts          # All type definitions
```

## 🔥 Firebase Setup

### Firestore Collections

#### `products`
```typescript
{
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
```

#### `users`
```typescript
{
  uid: string
  name: string
  email: string
  role: 'user' | 'admin'
  addresses: Address[]
  orders: string[]
  createdAt: Date
}
```

#### `orders`
```typescript
{
  id: string
  userId: string
  items: OrderItem[]
  totalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: Date
  updatedAt: Date
}
```

### Storage Structure
```
/products/          # Product images
/users/{uid}/       # User avatars and files
/categories/        # Category images
```

## 🛡️ Security

### Firestore Security Rules
- Users can only read/write their own data
- Products are public read, admin write only
- Orders are private to users and admins
- Admin role required for product/category management

### Authentication
- Firebase Authentication with Google OAuth
- Email/password authentication
- Protected routes and API endpoints
- Role-based access control

## 🎯 Key Components

### Authentication (`useAuth` hook)
- User sign-in/sign-up
- Google OAuth integration
- User session management
- Role-based permissions

### Shopping Cart (`useCart` hook)
- Add/remove items
- Quantity management
- Local storage persistence
- Real-time price calculation

### Product Management
- Product listing with filters
- Search functionality
- Category-based browsing
- Product detail views

## 🎨 UI Components

Built with shadcn/ui for consistency and accessibility:
- `Button` - Interactive buttons with variants
- `Card` - Content containers with elevation
- `Input` - Form input fields
- `Label` - Form labels
- `Badge` - Status indicators
- `Skeleton` - Loading placeholders

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** with CSS Grid and Flexbox
- **Touch-friendly** interface elements

## 🚀 Performance Optimizations

- **Next.js Image optimization** for fast loading
- **Code splitting** with dynamic imports
- **Lazy loading** for images and components
- **Efficient re-rendering** with React hooks
- **Optimized bundle size** with tree shaking

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Consistent naming** conventions

## 🌟 Future Enhancements

- [ ] Admin dashboard for product management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Advanced analytics
- [ ] Social media integration
- [ ] Inventory management

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@styleshop.com or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, TailwindCSS, and Firebase.
