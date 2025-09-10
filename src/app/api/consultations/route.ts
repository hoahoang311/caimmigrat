import { NextRequest, NextResponse } from 'next/server'
import { database, type ConsultationBooking } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.first_name || !body.last_name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: first_name, last_name, email, phone' },
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

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    const booking: ConsultationBooking = {
      first_name: body.first_name.trim(),
      last_name: body.last_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      service_interest: body.service_interest?.trim() || null,
      preferred_date: body.preferred_date || null,
      preferred_time: body.preferred_time || null,
      message: body.message?.trim() || null
    }

    const result = await database.createConsultationBooking(booking)

    return NextResponse.json({
      success: true,
      message: 'Consultation booking submitted successfully',
      data: result
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating consultation booking:', error)
    return NextResponse.json(
      { error: 'Failed to submit consultation booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await database.getConsultationBookings()

    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length
    })

  } catch (error) {
    console.error('Error fetching consultation bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}