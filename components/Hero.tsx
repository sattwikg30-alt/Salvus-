'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark-darker via-dark-darker to-dark">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white mb-12">
                SALVUS
              </h1>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold leading-tight text-white"
            >
              Emergency Relief.
              <br />
              <span className="text-accent">Zero Cash Misuse.</span>
            </motion.h2>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Salvus ensures disaster aid is spent only on verified essentials and paid directly to trusted stores.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/login" className="px-8 py-4 glass neon border-2 border-accent-neon shadow-neon bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-accent/40 inline-block text-center">
                Get Started
              </Link>
              <button className="px-8 py-4 glass neon border-2 border-accent-neon shadow-neon bg-accent hover:bg-accent-dark text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-accent/40">
                Start a Relief Campaign
              </button>
            </motion.div>

            {/* Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 text-sm text-gray-400 pt-4"
            >
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Built for dignity, accountability, and speed.</span>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-lighter/50">
              {/* Animated Metric Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-dark-lighter/30 p-6 rounded-xl border border-accent/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Funds Distributed</span>
                  </div>
                  <div className="text-3xl font-bold text-white">₹8.5K</div>
                  <div className="text-xs text-gray-500 mt-1">100% Auditable</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-dark-lighter/30 p-6 rounded-xl border border-accent/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Beneficiaries</span>
                  </div>
                  <div className="text-3xl font-bold text-white">24.5K</div>
                  <div className="text-xs text-gray-500 mt-1">Active Support</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-dark-lighter/30 p-6 rounded-xl border border-accent/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Verified Stores</span>
                  </div>
                  <div className="text-3xl font-bold text-white">1,247</div>
                  <div className="text-xs text-gray-500 mt-1">Direct Payments</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="bg-dark-lighter/30 p-6 rounded-xl border border-accent/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Transparency</span>
                  </div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-xs text-gray-500 mt-1">Real-time Audit</div>
                </motion.div>
              </div>

              {/* Flow Diagram Lines */}
              <div className="mt-8 pt-8 border-t border-dark-lighter/30">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>Donor</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent/50 via-accent to-accent/50 mx-4"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>Store</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent/50 via-accent to-accent/50 mx-4"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>Beneficiary</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}

