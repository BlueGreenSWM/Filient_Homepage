"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Button } from './common/Button'
import { Check, Zap, Calculator, TrendingUp } from 'lucide-react'
import { formatNumber, calculateROI } from '@/lib/utils'

const plans = [
  {
    name: 'Free Trial',
    price: 0,
    period: '14 days',
    description: 'Try Filient risk-free',
    features: [
      'Full AI capabilities',
      'Unlimited file organization',
      'All premium features',
      'No credit card required',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: 4.99,
    period: 'per month',
    description: 'For professionals who value their time',
    features: [
      'AI-powered organization',
      'Unlimited devices',
      'Priority support',
      'Advanced analytics',
      'Custom workflows',
      'Cloud backup',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Team',
    price: 9.99,
    period: 'per user/month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Admin dashboard',
      'API access',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation()
  const [hourlyRate, setHourlyRate] = useState(50)
  const [hoursWasted, setHoursWasted] = useState(230)

  const yearlyROI = calculateROI(hoursWasted, hourlyRate)
  const monthlyROI = yearlyROI / 12
  const filienCost = 4.99 * 12 // yearly cost
  const netSavings = yearlyROI - filienCost
  const roiPercentage = ((netSavings / filienCost) * 100).toFixed(0)

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden" ref={ref as any}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invest in Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Productivity
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Save 230 hours per year. That's worth ${formatNumber(yearlyROI)} at your current rate.
          </p>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">ROI Calculator</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Your Hourly Rate
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-8 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Hours Wasted Per Year
              </label>
              <input
                type="number"
                value={hoursWasted}
                onChange={(e) => setHoursWasted(Number(e.target.value))}
                className="w-full bg-gray-800 text-white rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                Monthly Savings
              </div>
              <div className="text-2xl font-bold text-white">
                ${formatNumber(Math.round(monthlyROI))}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Zap className="w-4 h-4" />
                Yearly Savings
              </div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                ${formatNumber(Math.round(netSavings))}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                ROI Percentage
              </div>
              <div className="text-2xl font-bold text-green-400">
                {roiPercentage}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full z-10">
                  MOST POPULAR
                </div>
              )}
              <div
                className={`h-full bg-gray-900/50 backdrop-blur-sm border ${
                  plan.popular ? 'border-purple-600' : 'border-gray-800'
                } rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 ${
                  plan.popular ? 'scale-105' : ''
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600/20 text-green-400 font-medium backdrop-blur-sm border border-green-500/20">
            <span className="text-2xl">💰</span>
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}