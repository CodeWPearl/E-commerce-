"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export function TestButtons() {
  const router = useRouter()

  const handleShopNow = () => {
    console.log('Shop Now button clicked')
    router.push('/products')
  }

  const handleBrowseCategories = () => {
    console.log('Browse Categories button clicked')
    router.push('/categories')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        size="lg" 
        className="group shadow-xl hover:shadow-2xl w-full sm:w-auto"
        onClick={handleShopNow}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Shop Now
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        className="shadow-lg hover:shadow-xl w-full sm:w-auto"
        onClick={handleBrowseCategories}
      >
        Browse Categories
      </Button>
    </div>
  )
}

export default TestButtons