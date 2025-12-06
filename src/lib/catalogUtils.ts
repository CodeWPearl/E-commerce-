// Data initialization script for StyleShop E-commerce Platform
// This showcases the diverse product catalog with working images

import { mockProducts, mockCategories, mockTeamMembers } from './mockData'

export function displayProductCatalog() {
  console.log('🛍️ StyleShop Product Catalog')
  console.log('================================')
  
  console.log(`📊 Total Products: ${mockProducts.length}`)
  console.log(`🏷️ Categories: ${mockCategories.length}`)
  console.log(`👥 Team Members: ${mockTeamMembers.length}`)
  
  console.log('\n📋 Product Categories:')
  mockCategories.forEach(category => {
    const categoryProducts = mockProducts.filter(p => p.category === category.name)
    console.log(`  • ${category.name}: ${categoryProducts.length} products`)
  })
  
  console.log('\n⭐ Featured Products:')
  const featuredProducts = mockProducts.filter(p => p.featured)
  featuredProducts.forEach(product => {
    console.log(`  • ${product.name} - $${product.price} (${product.category})`)
  })
  
  console.log('\n💰 Price Range:')
  const prices = mockProducts.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
  console.log(`  • Min: $${minPrice}`)
  console.log(`  • Max: $${maxPrice}`)
  console.log(`  • Average: $${avgPrice.toFixed(2)}`)
  
  console.log('\n📦 Stock Summary:')
  const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0)
  console.log(`  • Total Items in Stock: ${totalStock}`)
  
  return {
    totalProducts: mockProducts.length,
    categories: mockCategories.length,
    featuredCount: featuredProducts.length,
    priceRange: { min: minPrice, max: maxPrice, average: avgPrice },
    totalStock
  }
}

// Export the function for use in components or pages
export default displayProductCatalog