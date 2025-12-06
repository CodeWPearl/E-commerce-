"use client"

import { useEffect } from 'react'

export function NavigationDebugger() {
  useEffect(() => {
    console.log('NavigationDebugger mounted')
    console.log('Current pathname:', window.location.pathname)
    console.log('Current href:', window.location.href)
  }, [])

  return null // This component doesn't render anything
}

export default NavigationDebugger