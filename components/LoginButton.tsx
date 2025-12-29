'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LoginButton() {
  const pathname = usePathname()
  
  // Hide login button on login page
  if (pathname === '/login') {
    return null
  }

  return (
    <Link
      href="/login"
      className="fixed top-6 right-8 z-50 glass neon border-2 border-accent-neon shadow-neon bg-accent hover:bg-accent-dark text-white font-bold rounded-xl px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-accent/40"
    >
      Login
    </Link>
  )
}

