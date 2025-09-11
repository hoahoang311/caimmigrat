'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminNotFound() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/admin/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Admin Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The admin page you're looking for doesn't exist. You'll be redirected to the admin login in a few seconds.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/admin/login"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Go to Admin Login
          </Link>
          
          <div>
            <Link 
              href="/en/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Or go to main site
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            Redirecting automatically in 3 seconds...
          </div>
        </div>
      </div>
    </div>
  )
}