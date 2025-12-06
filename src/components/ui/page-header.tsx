"use client"

import { motion } from 'framer-motion'
import { memo } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  gradient?: string
  backgroundClass?: string
}

export const PageHeader = memo(function PageHeader({ 
  title, 
  subtitle, 
  gradient = "from-[#FB77BF] to-[#FDA26A]",
  backgroundClass = "bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10"
}: PageHeaderProps) {
  return (
    <section className={`${backgroundClass} px-4 md:px-6 lg:px-8 py-16 md:py-20`}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
})

export default PageHeader