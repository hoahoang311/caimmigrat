import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { isAdminCookie } from '@/lib/auth'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isLoggedIn = await isAdminCookie(cookieStore)
  
  if (isLoggedIn) {
    redirect('/admin/dashboard')
  } else {
    redirect('/admin/login')
  }
}