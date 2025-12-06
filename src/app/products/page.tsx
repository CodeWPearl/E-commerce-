"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import ProductFilter from '@/components/products/ProductFilter'
import FilterTags from '@/components/products/FilterTags'
import { mockProducts as importedMockProducts } from '@/lib/mockData'

// Convert mock products to include ID and createdAt
const mockProducts = importedMockProducts.map((product, index) => ({
  ...product,
  id: `${product.categoryId}-${product.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
  createdAt: new Date()
}))

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Accessories', 'Footwear', 'Jewelry', 'Toys']
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' }
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<any>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // Fast loading for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, searchTerm, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  const handleFilterChange = (filtered: any[], filters: any) => {
    // Apply search term filter on top of advanced filters
    let result = filtered
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    
    setFilteredProducts(result)
  }

  const handleRemoveFilter = (filterType: string, value?: string) => {
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
    setSearchTerm('')
    setSelectedCategory('All')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10 py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium products designed to enhance your lifestyle.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-3 border-gray-200 focus:border-[#FB77BF] focus:ring-[#FB77BF]"
                  />
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FB77BF] focus:ring-[#FB77BF] bg-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filters */}
              <div className={`mt-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryChange(category)}
                      className={selectedCategory === category ? 
                        "bg-[#FB77BF] hover:bg-[#FB77BF]/90 text-white" : 
                        "hover:bg-[#FB77BF]/10 hover:border-[#FB77BF] hover:text-[#FB77BF]"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Controls */}
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
                Advanced Filters
              </Button>
              <div className="hidden lg:block text-sm text-gray-600">
                Showing {filteredProducts.length} of {mockProducts.length} products
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-24">
                  <ProductFilter
                    products={mockProducts}
                    onFilterChange={handleFilterChange}
                    isOpen={true}
                    onToggle={() => {}}
                  />
                </div>
              </div>

              {/* Mobile Filter */}
              <div className="lg:hidden">
                <ProductFilter
                  products={mockProducts}
                  onFilterChange={handleFilterChange}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>

              {/* Products Area */}
              <div className="flex-1">
                {/* Results Count */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} products
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    {searchTerm && ` for "${searchTerm}"`}
                  </p>
                </motion.div>

                {/* Results Count */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {filteredProducts.length} Products Found
                  </h2>
                  <p className="text-gray-600">
                    Browse our complete collection with advanced filtering options
                  </p>
                </motion.div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
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
                        transition={{ delay: index * 0.05 }}
                        className={viewMode === 'list' ? 'w-full' : ''}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your search or filter criteria to find what you&apos;re looking for.
                      </p>
                      <Button
                        onClick={clearAllFilters}
                        className="bg-[#FB77BF] hover:bg-[#FB77BF]/90"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}