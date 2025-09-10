import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Inquiry {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  service_type?: string
  subject?: string
  message: string
  country_of_origin?: string
  preferred_contact_method?: 'email' | 'phone'
  status?: 'new' | 'in_progress' | 'resolved' | 'closed'
  created_at?: string
  updated_at?: string
}

export interface NewsletterSubscriber {
  id?: string
  email: string
  preferred_topics?: string
  subscribed_at?: string
  is_active?: boolean
}

export interface ConsultationBooking {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  service_interest?: string
  preferred_date?: string
  preferred_time?: string
  message?: string
  booking_status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at?: string
  updated_at?: string
}

// Service types for dropdowns
export const serviceTypes = [
  'Temporary Resident Visa',
  'Study Programs',
  'Skilled Worker Programs', 
  'Investor Programs',
  'Family Sponsorship',
  'Specialized Legal Services',
  'General Inquiry'
] as const

// Database functions
export const database = {
  // Inquiries
  async createInquiry(inquiry: Inquiry) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getInquiries(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']) {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Newsletter
  async subscribeToNewsletter(email: string) {
    const allTopics = 'Immigration Law Updates,Visa Application Tips,Policy Changes,Success Stories,Consultation Opportunities'
    
    const subscription = { 
      email, 
      preferred_topics: allTopics
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([subscription])
      .select()
    
    if (error) {
      // If duplicate email, just return success
      if (error.code === '23505') {
        return { success: true, message: 'Already subscribed' }
      }
      throw error
    }
    return data[0]
  },

  async getNewsletterSubscribers() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Consultation bookings
  async createConsultationBooking(booking: ConsultationBooking) {
    const { data, error } = await supabase
      .from('consultation_bookings')
      .insert([booking])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getConsultationBookings() {
    const { data, error } = await supabase
      .from('consultation_bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateBookingStatus(id: string, status: ConsultationBooking['booking_status']) {
    const { data, error } = await supabase
      .from('consultation_bookings')
      .update({ booking_status: status })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}