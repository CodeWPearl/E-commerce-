"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { mockCategories } from '@/lib/mockData'

const categories = mockCategories.map((category, index) => ({
  ...category,
  color: [
    'from-[#FB77BF] to-[#FDA26A]',
    'from-[#63D3C4] to-[#7D9FD5]',
    'from-[#D3E76C] to-[#FDDF59]',
    'from-[#FDA26A] to-[#FB77BF]',
    'from-[#7D9FD5] to-[#D297EB]',
    'from-[#FDDF59] to-[#D3E76C]',
    'from-[#D297EB] to-[#63D3C4]'
  ][index % 7],
  href: `/categories/${category.id}`
}))

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-900">Shop by</span>{' '}
            <span className="bg-gradient-to-r from-[#63D3C4] to-[#7D9FD5] bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you&apos;re looking for in our carefully curated categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={category.href}>
                <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Color Accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`} />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-black/20 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FDDF59] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-200">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center text-[#FB77BF] font-semibold hover:text-[#FDA26A] transition-colors"
          >
            <span>View All Categories</span>
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}