'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page immediately
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Redirecting to Home...
        </h1>
        <p className="text-gray-600">
          Page not found. Taking you back to the home page.
        </p>
      </div>
    </div>
  )
}