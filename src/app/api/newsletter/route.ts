import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const result = await database.subscribeToNewsletter(body.email.trim().toLowerCase())

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: result
    }, { status: 201 })

  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await database.getNewsletterSubscribers()

    return NextResponse.json({
      success: true,
      data: subscribers,
      count: subscribers.length
    })

  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}