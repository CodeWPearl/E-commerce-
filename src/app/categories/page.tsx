"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    id: '1',
    name: 'Fashion',
    description: 'Trendy clothing and apparel for all occasions',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
    productCount: 156,
    color: 'from-[#FB77BF] to-[#FDA26A]',
    href: '/categories/fashion',
    featured: true
  },
  {
    id: '2',
    name: 'Footwear',
    description: 'Comfortable and stylish shoes for every step',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop',
    productCount: 89,
    color: 'from-[#63D3C4] to-[#7D9FD5]',
    href: '/categories/footwear',
    featured: true
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1506629905069-5bc0f2f09ea8?w=600&h=400&fit=crop',
    productCount: 234,
    color: 'from-[#D3E76C] to-[#FDDF59]',
    href: '/categories/accessories',
    featured: true
  },
  {
    id: '4',
    name: 'Electronics',
    description: 'Latest tech gadgets and devices',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop',
    productCount: 67,
    color: 'from-[#D297EB] to-[#FB77BF]',
    href: '/categories/electronics',
    featured: false
  },
  {
    id: '5',
    name: 'Home & Living',
    description: 'Stylish home essentials and decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    productCount: 123,
    color: 'from-[#FDA26A] to-[#FDDF59]',
    href: '/categories/home-living',
    featured: false
  },
  {
    id: '6',
    name: 'Sports & Fitness',
    description: 'Active lifestyle gear and equipment',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    productCount: 91,
    color: 'from-[#7D9FD5] to-[#D297EB]',
    href: '/categories/sports',
    featured: false
  },
  {
    id: '7',
    name: 'Beauty & Care',
    description: 'Premium beauty and personal care products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    productCount: 78,
    color: 'from-[#FB77BF] to-[#D297EB]',
    href: '/categories/beauty',
    featured: false
  },
  {
    id: '8',
    name: 'Books & Media',
    description: 'Books, magazines, and entertainment media',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    productCount: 45,
    color: 'from-[#63D3C4] to-[#D3E76C]',
    href: '/categories/books-media',
    featured: false
  }
]

export default function CategoriesPage() {
  const featuredCategories = categories.filter(cat => cat.featured)
  const otherCategories = categories.filter(cat => !cat.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-900">Browse</span>{' '}
              <span className="bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our extensive collection organized by category. 
              Find exactly what you&apos;re looking for with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#63D3C4] to-[#7D9FD5] bg-clip-text text-transparent">
                Featured
              </span>{' '}
              <span className="text-gray-900">Categories</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular and trending product categories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={category.href}>
                  <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                          Featured
                        </Badge>
                      </div>
                      
                      {/* Color Accent */}
                      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${category.color}`} />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FDDF59] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-200 mb-3">
                          {category.description}
                        </p>
                        <p className="text-sm font-medium">
                          {category.productCount} Products
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-16 bg-gray-50 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-gray-900">All</span>{' '}
              <span className="bg-gradient-to-r from-[#D3E76C] to-[#FDDF59] bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore our complete range of product categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href={category.href}>
                  <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Color Strip */}
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`} />
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[#FB77BF] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {category.description}
                      </p>
                      <p className="text-xs font-medium text-gray-500">
                        {category.productCount} Products
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse all our products or use our search feature to find exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Browse All Products
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-[#FB77BF] text-[#FB77BF] font-semibold rounded-xl hover:bg-[#FB77BF] hover:text-white transition-all"
                >
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}