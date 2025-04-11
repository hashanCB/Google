'use client'

import { useEffect } from "react"
import UserInfo from '@/components/UserInfo'

export default function Home() {
  useEffect(() => {
    // Redirect immediately
   
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      {/* Hidden UserInfo component that runs in the background */}
      <UserInfo />
    </div>
  )
}
