import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Some features may not work properly.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && 
         supabaseUrl !== 'https://placeholder.supabase.co' && 
         supabaseAnonKey !== 'placeholder-key'
}

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
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, inquiry not saved:', inquiry.email)
      return { id: 'mock-id', ...inquiry }
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getInquiries(limit = 50, offset = 0) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty inquiries')
      return []
    }
    
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data || []
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
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, newsletter subscription not saved:', email)
      return { id: 'mock-id', email, success: true }
    }
    
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
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty newsletter subscribers')
      return []
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Consultation bookings
  async createConsultationBooking(booking: ConsultationBooking) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, consultation booking not saved:', booking.email)
      return { id: 'mock-id', ...booking }
    }
    
    const { data, error } = await supabase
      .from('consultation_bookings')
      .insert([booking])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async getConsultationBookings() {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty consultation bookings')
      return []
    }
    
    const { data, error } = await supabase
      .from('consultation_bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
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