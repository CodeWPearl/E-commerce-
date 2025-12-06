"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import ProductFilter from '@/components/products/ProductFilter'
import FilterTags from '@/components/products/FilterTags'
import { mockProducts, mockCategories } from '@/lib/mockData'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Map category slugs to category IDs
const categorySlugMap: Record<string, string> = {
  'fashion': '1',
  'footwear': '2', 
  'accessories': '3',
  'electronics': '4',
  'home-living': '5',
  'sports': '6',
  'beauty': '7',
  'books-media': '8',
  'jewelry': '9',
  'toys': '10'
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = React.use(params)
  const categoryId = categorySlugMap[slug]
  
  if (!categoryId) {
    notFound()
  }

  const category = mockCategories.find(cat => cat.id === categoryId)
  const categoryProducts = mockProducts
    .filter(product => product.categoryId === categoryId)
    .map((product, index) => ({
      ...product,
      id: `${product.categoryId}-${product.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      createdAt: new Date()
    }))
  
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts)
  const [currentFilters, setCurrentFilters] = useState<any>({
    priceRange: [0, 1000],
    rating: [],
    brands: [],
    colors: [],
    sizes: [],
    materials: [],
    tags: [],
    gender: [],
    ageGroup: [],
    season: [],
    sortBy: 'name'
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    setFilteredProducts(categoryProducts)
  }, [categoryProducts])

  if (!category) {
    notFound()
  }

  const handleFilterChange = (filtered: any[], filters: any) => {
    setFilteredProducts(filtered)
  }

  const handleRemoveFilter = (filterType: string, value?: string) => {
    // Implementation will be handled by ProductFilter component
    setCurrentFilters((prev: any) => {
      if (filterType === 'priceRange') {
        return { ...prev, priceRange: [0, 1000] }
      } else if (value) {
        const currentValues = prev[filterType] || []
        return {
          ...prev,
          [filterType]: currentValues.filter((v: string) => v !== value)
        }
      }
      return prev
    })
  }

  const clearAllFilters = () => {
    setCurrentFilters({
      priceRange: [0, 1000],
      rating: [],
      brands: [],
      colors: [],
      sizes: [],
      materials: [],
      tags: [],
      gender: [],
      ageGroup: [],
      season: [],
      sortBy: 'name'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-gray-100/70 to-gray-200/50 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl py-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="hover:bg-white/50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] bg-clip-text text-transparent">
                  {category.name}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {category.description}
              </p>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FB77BF]">{categoryProducts.length}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FDA26A]">Top</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="bg-white border-b px-4 md:px-6 lg:px-8 py-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="hidden lg:block text-sm text-gray-600">
                Showing {filteredProducts.length} of {categoryProducts.length} products
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="mt-4">
            <FilterTags
              filters={currentFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={clearAllFilters}
            />
          </div>
        </div>
      </section>

      {/* Products Section with Filters */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilter
                  products={categoryProducts}
                  onFilterChange={handleFilterChange}
                  isOpen={true}
                  onToggle={() => {}}
                />
              </div>
            </div>

            {/* Mobile Filter */}
            <div className="lg:hidden">
              <ProductFilter
                products={categoryProducts}
                onFilterChange={handleFilterChange}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Products Area */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {filteredProducts.length} Products in {category.name}
                    </h2>
                    <p className="text-gray-600">
                      Discover our curated selection of premium {category.name.toLowerCase()} products
                    </p>
                  </motion.div>

                  <div className={
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }>
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={viewMode === 'list' ? 'w-full' : ''}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Grid className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-8">
                  We don't have any products in this category yet. Check back soon!
                </p>
                <Link href="/categories">
                  <Button>
                    Browse Other Categories
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      {categoryProducts.length > 0 && (
        <section className="py-16 bg-gray-50 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-gray-900">You Might Also</span>{' '}
                <span className="bg-gradient-to-r from-[#63D3C4] to-[#7D9FD5] bg-clip-text text-transparent">
                  Like
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                Explore similar categories
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories
                .filter(cat => cat.id !== categoryId)
                .slice(0, 3)
                .map((relatedCategory, index) => (
                  <motion.div
                    key={relatedCategory.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link href={`/categories/${Object.keys(categorySlugMap).find(key => categorySlugMap[key] === relatedCategory.id)}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={relatedCategory.image}
                            alt={relatedCategory.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{relatedCategory.name}</h3>
                            <p className="text-sm text-gray-200">{relatedCategory.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}