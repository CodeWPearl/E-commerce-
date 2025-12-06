"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function OrderSuccessPage() {
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Thank you for your purchase. Your order has been successfully placed and is being processed.
              </p>
              
              {/* Order Number */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FB77BF]/10 to-[#FDA26A]/10 rounded-xl border border-[#FB77BF]/20">
                <span className="text-sm text-gray-600 mr-2">Order Number:</span>
                <span className="font-bold text-[#FB77BF]">{orderNumber}</span>
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              <div className="p-6 bg-gradient-to-br from-[#63D3C4]/10 to-[#7D9FD5]/10 rounded-xl border border-[#63D3C4]/20">
                <Package className="w-8 h-8 text-[#63D3C4] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
                <p className="text-sm text-gray-600">
                  Your order is being prepared and will be shipped within 1-2 business days.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-[#D3E76C]/10 to-[#FDDF59]/10 rounded-xl border border-[#D3E76C]/20">
                <Mail className="w-8 h-8 text-[#D3E76C] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  A confirmation email with tracking details has been sent to your email.
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="shadow-lg hover:shadow-xl">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="shadow-md hover:shadow-lg">
                    View Order Status
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Need help? <Link href="/contact" className="text-[#FB77BF] hover:underline">Contact our support team</Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#FB77BF] to-[#FDA26A] opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-6 h-6 rounded-full bg-gradient-to-br from-[#63D3C4] to-[#7D9FD5] opacity-20"
        />
      </motion.div>
    </div>
  )
}