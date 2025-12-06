"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {product.images && product.images.length > 0 && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                } ${imageLoading ? 'blur-sm' : 'blur-0'}`}
                onLoad={() => setImageLoading(false)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            
            {/* Overlay Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center space-x-2"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 text-white hover:text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 text-white hover:text-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 text-white hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-1">
              {product.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <Badge variant="destructive" className="text-xs">
                  Low Stock
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="outline" className="text-xs bg-white">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <CardContent className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>

            {/* Brand */}
            {(product as any).brand && (
              <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                {(product as any).brand}
              </p>
            )}

            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FB77BF] transition-colors">
              {product.name}
            </h3>

            {/* Rating and Reviews */}
            {(product as any).rating && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor((product as any).rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {(product as any).rating.toFixed(1)}
                </span>
                {(product as any).reviewCount && (
                  <span className="text-sm text-gray-500">
                    ({(product as any).reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Filter Attributes */}
            <div className="space-y-2 mb-3">
              {/* Colors */}
              {(product as any).colors && (product as any).colors.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex space-x-1">
                    {(product as any).colors.slice(0, 3).map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase().includes('black') ? '#000000' :
                                          color.toLowerCase().includes('white') ? '#ffffff' :
                                          color.toLowerCase().includes('red') ? '#ef4444' :
                                          color.toLowerCase().includes('blue') ? '#3b82f6' :
                                          color.toLowerCase().includes('green') ? '#10b981' :
                                          color.toLowerCase().includes('pink') ? '#ec4899' :
                                          color.toLowerCase().includes('purple') ? '#8b5cf6' :
                                          color.toLowerCase().includes('yellow') ? '#f59e0b' :
                                          color.toLowerCase().includes('gray') || color.toLowerCase().includes('grey') ? '#6b7280' :
                                          color.toLowerCase().includes('brown') ? '#92400e' :
                                          '#d1d5db'
                        }}
                        title={color}
                      />
                    ))}
                    {(product as any).colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{(product as any).colors.length - 3}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Material */}
              {(product as any).material && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Material:</span>
                  <span className="text-xs text-gray-700">{(product as any).material}</span>
                </div>
              )}

              {/* Key Features */}
              {(product as any).tags && (product as any).tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {(product as any).tags.slice(0, 2).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {(product as any).tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{(product as any).tags.length - 2} more</span>
                  )}
                </div>
              )}
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-[#FB77BF]">
                  {formatPrice(product.price)}
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </motion.div>
            </div>

            {/* Stock Info */}
            {product.stock > 0 && product.stock < 10 && (
              <p className="text-xs text-orange-600 mt-2">
                Only {product.stock} left in stock
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}