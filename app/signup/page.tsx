'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Shield, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt=""
          className="w-5 h-5"
        />
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
    setError('Google Signup Failed')
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
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
    setSuccess('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
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

      setSuccess(data.message)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    } catch (err: any) {
      console.error('Signup error:', err)
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
            Create your account
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl"
        >
          {!success && (
            <>
              {/* Google Signup Button (Custom) */}
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
                      onError={() => setError('Google Signup Failed')}
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
 
             
            </>
          )}

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
              <p className="text-gray-400 mb-6">{success}</p>
              <Link href="/login" className="text-accent hover:text-accent-light font-semibold">
                Proceed to Login
              </Link>
            </motion.div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-dark-lighter/30 border border-dark-lighter/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </motion.div>

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

                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
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
                </motion.div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-dark-lighter/30">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-accent hover:text-accent-light font-semibold transition-colors">
                    Sign In
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
