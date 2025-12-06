"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50/70 to-gray-100/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 via-transparent to-gray-100/25" />
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-100/40 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gray-150/35 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gray-100/35 rounded-full blur-xl"></div>
      </div>
      
      <div className="w-full px-1 md:px-3 lg:px-4 py-20">
        {/* Single Unified Glassmorphism Container */}
        <div className="relative bg-gray-100/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/25 border border-gray-200/40 p-6 md:p-10 lg:p-16 mx-1 md:mx-4 lg:mx-8 hover:bg-gray-200/35 hover:shadow-gray-300/30 transition-all duration-500">
          {/* Inner Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-200/20 via-transparent to-gray-300/15 pointer-events-none"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border"
            >
              <Star className="h-4 w-4 text-[#FDDF59] fill-current" />
              <span className="text-sm font-medium">Premium Quality Products</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-[#FB77BF] via-[#FDA26A] to-[#D3E76C] bg-clip-text text-transparent">
                Style
              </span>{' '}
              <span className="text-gray-900">
                Meets
              </span><br />
              <span className="bg-gradient-to-r from-[#63D3C4] via-[#7D9FD5] to-[#D297EB] bg-clip-text text-transparent">
                Innovation
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-lg leading-relaxed"
            >
              Discover our curated collection of premium fashion and lifestyle products. 
              Where every piece tells a story of quality, comfort, and contemporary design.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FB77BF]">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FDA26A]">500+</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D3E76C]">50+</div>
                <div className="text-sm text-gray-600">Brand Partners</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
            >
              <Link href="/products" className="flex-1 sm:flex-none sm:min-w-[160px]">
                <Button 
                  size="lg" 
                  className="group shadow-xl hover:shadow-2xl w-full text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 h-auto min-h-[48px] bg-white/40 backdrop-blur-md border border-gray-200/40 hover:bg-white/50 text-gray-800 hover:text-gray-800 transition-all duration-300"
                  onClick={() => console.log('Shop Now clicked')}
                >
                  <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="flex-1">Shop Now</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </Link>
              <Link href="/categories" className="flex-1 sm:flex-none sm:min-w-[160px]">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl w-full text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 h-auto min-h-[48px] bg-white/25 backdrop-blur-md border border-gray-200/40 hover:bg-white/35 text-gray-800 hover:text-gray-800 transition-all duration-300"
                  onClick={() => console.log('Browse Categories clicked')}
                >
                  <span>Browse Categories</span>
                </Button>
              </Link>
            </motion.div>
            </motion.div>

            {/* Hero Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              {/* Main Hero Image */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md lg:max-w-lg h-full"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FB77BF]/10 to-[#FDA26A]/10 backdrop-blur-sm border border-white/20">
                  <Image
                    src="/e-com pic.png"
                    alt="StyleShop E-commerce"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay gradient for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#D297EB] to-[#FB77BF] shadow-lg flex items-center justify-center"
              >
                <ShoppingBag className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -5, 0],
                  rotate: [0, -360, 0]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#FDA26A] to-[#FDDF59] shadow-lg flex items-center justify-center"
              >
                <Star className="h-6 w-6 text-white fill-current" />
              </motion.div>

              {/* Additional floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 180, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-1/4 -right-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#63D3C4] to-[#7D9FD5] shadow-lg"
              />
              
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -180, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-1/4 -left-6 w-6 h-6 rounded-full bg-gradient-to-br from-[#D3E76C] to-[#FDDF59] shadow-lg"
              />
            </div>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}