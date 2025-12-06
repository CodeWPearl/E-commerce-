"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Minus, Plus, ShoppingCart, Heart, Share2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

// Mock product data - in a real app, this would come from your Firebase database
const mockProduct = {
  id: '1',
  name: 'Premium Cotton T-Shirt',
  description: 'This premium cotton t-shirt is crafted from 100% organic cotton for ultimate comfort and durability. Perfect for everyday wear, it features a modern fit and soft texture that gets better with every wash.',
  price: 29.99,
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop'
  ],
  category: 'Clothing',
  stock: 15,
  createdAt: new Date(),
  featured: true
}

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = React.use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  // In a real app, you would fetch the product data here using the id
  const product = mockProduct

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#FB77BF] shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                {product.category}
              </Badge>
              {product.featured && (
                <Badge variant="default" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-[#FDDF59] fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(127 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[#FB77BF]">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${
                product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-600">
                {product.stock > 10
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : 'Out of Stock'
                }
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-900">Quantity</label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  {formatPrice(product.price * quantity)} total
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 text-base font-medium shadow-lg hover:shadow-xl"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-6">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Features */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Product Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FB77BF]" />
                    <span>100% Premium Cotton</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FB77BF]" />
                    <span>Modern Fit</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FB77BF]" />
                    <span>Machine Washable</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FB77BF]" />
                    <span>Available in Multiple Colors</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="bg-gradient-to-br from-[#FB77BF]/5 to-[#FDA26A]/5 border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Shipping & Returns</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Free shipping on orders over $50</p>
                  <p>• 30-day return policy</p>
                  <p>• Express delivery available</p>
                  <p>• Secure payment processing</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}