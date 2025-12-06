"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Award, Users, Globe, ShoppingBag, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '500+', label: 'Premium Products' },
  { number: '50+', label: 'Brand Partners' },
  { number: '99%', label: 'Satisfaction Rate' }
]

const values = [
  {
    icon: Heart,
    title: 'Passion for Quality',
    description: 'We carefully curate every product to ensure it meets our high standards for quality and style.',
    color: 'from-[#FB77BF] to-[#FDA26A]'
  },
  {
    icon: Award,
    title: 'Excellence in Service',
    description: 'Our commitment to exceptional customer service drives everything we do.',
    color: 'from-[#63D3C4] to-[#7D9FD5]'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in building lasting relationships with our customers and supporting our community.',
    color: 'from-[#D3E76C] to-[#FDDF59]'
  },
  {
    icon: Globe,
    title: 'Sustainable Future',
    description: 'We are committed to sustainable practices and responsible sourcing for a better tomorrow.',
    color: 'from-[#D297EB] to-[#FB77BF]'
  }
]

import { mockTeamMembers } from '@/lib/mockData'

const team = mockTeamMembers

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-8">
              <span className="text-gray-900">About</span>{' '}
              <span className="bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] bg-clip-text text-transparent">
                StyleShop
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We&apos;re more than just an e-commerce platform. We&apos;re a community of style enthusiasts 
              dedicated to bringing you the finest products with exceptional service and unmatched quality.
            </p>
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 bg-gradient-to-r from-[#FB77BF] via-[#FDA26A] to-[#D3E76C] rounded-full blur-sm opacity-30"
                />
                <div className="relative bg-white rounded-full p-8">
                  <ShoppingBag className="h-12 w-12 text-[#FB77BF]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FB77BF] to-[#FDA26A] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  StyleShop was born from a simple belief: everyone deserves access to premium, 
                  stylish products without compromising on quality or breaking the bank. What started 
                  as a small dream in 2020 has grown into a thriving community of fashion lovers.
                </p>
                <p>
                  Our journey began when our founder, Sarah, struggled to find the perfect balance 
                  between style, quality, and affordability. Frustrated by the limited options available, 
                  she decided to create a platform that would change the way people shop for fashion 
                  and lifestyle products.
                </p>
                <p>
                  Today, we work with over 50 carefully selected brand partners to bring you a curated 
                  collection of products that meet our strict standards for quality, sustainability, 
                  and style. Every item in our store is chosen with love and attention to detail.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                  alt="Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#FB77BF] to-[#FDA26A] rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Sparkles className="h-8 w-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind StyleShop
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#FB77BF] font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-[#FB77BF]/10 via-[#FDA26A]/5 to-[#D3E76C]/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To democratize access to premium fashion and lifestyle products while building 
              a sustainable, ethical, and inclusive shopping experience that brings joy to 
              customers around the world.
            </p>
            <div className="inline-flex items-center px-8 py-4 bg-white rounded-2xl shadow-lg">
              <Heart className="h-6 w-6 text-[#FB77BF] mr-3" />
              <span className="text-lg font-medium text-gray-900">
                Made with love for style enthusiasts everywhere
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}