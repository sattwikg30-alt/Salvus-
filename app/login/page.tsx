'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Shield, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    googleLogout()
  }, [])

  function GoogleButton({ onSuccess, onError }: { onSuccess: (tokenResponse: any) => void; onError: () => void }) {
    const loginWithGoogle = useGoogleLogin({ onSuccess, onError })
    return (
      <button
        type="button"
        onClick={() => loginWithGoogle()}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 text-white transition-all duration-200 border border-white/20 hover:border-accent/50 hover:bg-neutral-800 shadow-sm shadow-black/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.9 0-12.5-5.6-12.5-12.5S17.1 11 24 11c3.2 0 6.1 1.2 8.3 3.2l5.7-5.7C34.6 5 29.6 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 19.4-7.6 21-17.5.2-1.3.3-2.6.3-4z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.2 19.1 13 24 13c3.2 0 6.1 1.2 8.3 3.2l5.7-5.7C34.6 5 29.6 3 24 3 16.3 3 9.6 7.1 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 45c5.4 0 10.4-2.1 14.1-5.6l-6.6-5.4c-2.2 1.5-4.9 2.4-7.6 2.4-5.3 0-9.8-3.4-11.4-8.1l-6.7 5.2C9.6 40.9 16.3 45 24 45z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.8-6.3 7.4l6.6 5.4C39.4 37.9 42.8 31.6 43.6 24c.2-1.3.3-2.6.3-4z"/>
        </svg>
        <span>Continue with Google</span>
      </button>
    )
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Google Auth Failed')

      if (data.needsPasswordSetup) {
        router.push('/set-password')
      } else {
        router.push('/donor-dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google Login Failed')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please provide both email and password')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      // Check content type
      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text()
        console.error('Non-JSON response:', text)
        throw new Error('Server returned an error (check logs)')
      }

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      // Redirect to donor dashboard after login
      router.push('/donor-dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-darker via-dark-darker to-dark px-6 py-12">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              SALVUS
            </h1>
          </Link>
          <p className="text-gray-400 text-sm">
            Welcome back
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl"
        >
          {/* Google Login Button (Custom) */}
          <div className="mb-6">
            <div className="flex justify-center">
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                <GoogleButton
                  onSuccess={async (tokenResponse: any) => {
                    setLoading(true)
                    setError('')
                    try {
                      const res = await fetch('/api/auth/google', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ access_token: tokenResponse.access_token }),
                      })
                      const data = await res.json()
                      if (!res.ok) throw new Error(data.message || 'Google Auth Failed')
                      if (data.needsPasswordSetup) {
                        router.push('/set-password')
                      } else {
                        router.push('/donor-dashboard')
                      }
                    } catch (err: any) {
                      setError(err.message)
                    } finally {
                      setLoading(false)
                    }
                  }}
                  onError={() => setError('Google Login Failed')}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
          <div className="my-6">
            <div className="flex items-center">
              <div className="flex-grow border-t border-dark-lighter/30"></div>
              <span className="px-3 text-xs text-gray-400">OR</span>
              <div className="flex-grow border-t border-dark-lighter/30"></div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-dark-lighter/30">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
              <Shield className="w-4 h-4 text-accent" />
              <span>Secure Encrypted</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-accent hover:text-accent-light font-semibold transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
