"use client"

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/products/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { mockProducts } from '@/lib/mockData'

// Get featured products from mock data
const featuredProducts = mockProducts
  .filter(product => product.featured)
  .slice(0, 8)
  .map((product, index) => ({
    ...product,
    id: `featured-${index + 1}`,
    createdAt: new Date()
  }))

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-white px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl shadow-lg border border-white/30 -mx-8 -my-8" />
          
          {/* Content */}
          <div className="relative z-10 px-8 py-8">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] bg-clip-text text-transparent">
                Featured
              </span>{' '}
              <span className="text-gray-900">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that define style and quality
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button size="lg" variant="outline" className="group shadow-lg hover:shadow-xl">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}