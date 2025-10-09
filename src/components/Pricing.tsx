"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useSectionViewTracking } from '@/hooks/useSectionViewTracking'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from './common/Button'
import { Check, Calculator, TrendingUp, Zap } from 'lucide-react'
import { formatNumber, calculateROI } from '@/lib/utils'
import {
  trackCalculatorUsed,
  trackPricingPlanViewed,
  trackPricingPlanClicked,
} from '@/lib/analytics'

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation()
  const sectionRef = useSectionViewTracking('pricing')
  const { t } = useLanguage()
  const [hourlyRate, setHourlyRate] = useState(50)
  const [hoursWasted, setHoursWasted] = useState(230)

  const yearlyROI = calculateROI(hoursWasted, hourlyRate)
  const monthlyROI = yearlyROI / 12
  const filienCost = 4.99 * 12
  const netSavings = yearlyROI - filienCost
  const roiPercentage = ((netSavings / filienCost) * 100).toFixed(0)

  // Track calculator usage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hourlyRate > 0 && hoursWasted > 0) {
        trackCalculatorUsed(hourlyRate, hoursWasted, yearlyROI)
      }
    }, 2000) // 2 second debounce

    return () => clearTimeout(timer)
  }, [hourlyRate, hoursWasted, yearlyROI])

  return (
    <section
      className="py-24 bg-white border-t border-gray-200"
      ref={sectionRef as any}
      data-section="pricing"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.pricing.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t.pricing.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.pricing.subtitle.replace('{{amount}}', formatNumber(yearlyROI))}
          </p>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 card p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">{t.pricing.calculator.title}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.pricing.calculator.hourlyRate}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-white text-gray-900 rounded-lg px-8 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.pricing.calculator.hoursWasted}
              </label>
              <input
                type="number"
                value={hoursWasted}
                onChange={(e) => setHoursWasted(Number(e.target.value))}
                className="w-full bg-white text-gray-900 rounded-lg px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                {t.pricing.calculator.monthlySavings}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${formatNumber(Math.round(monthlyROI))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Zap className="w-4 h-4" />
                {t.pricing.calculator.yearlySavings}
              </div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                ${formatNumber(Math.round(netSavings))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                {t.pricing.calculator.roiPercentage}
              </div>
              <div className="text-2xl font-bold text-green-600">
                {roiPercentage}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full z-10 shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <div
                className={`h-full card p-6 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-blue-500 border-2 scale-105' : ''
                }`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => trackPricingPlanClicked(plan.name, plan.price, plan.cta)}
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-50 text-green-700 font-medium border border-green-200">
            <span className="text-2xl">💰</span>
            <span>{t.pricing.guarantee}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
