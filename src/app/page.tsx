"use client"

import { Hero } from '@/components/Hero'
import { QuickStartSection } from '@/components/QuickStartSection'
import { Stats } from '@/components/Stats'
import { FeaturesSection } from '@/components/Features'
import { Comparison } from '@/components/Comparison'
import { HowItWorks } from '@/components/HowItWorks'
import { Download } from '@/components/Download'
import { Footer } from '@/components/Footer'
import { useScrollDepthTracking } from '@/hooks/useScrollDepthTracking'

export default function Home() {
  // Track scroll depth milestones
  useScrollDepthTracking()

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <HowItWorks />
      <FeaturesSection />
      <Comparison />
      <QuickStartSection />
      <Download />
      <Footer />
    </main>
  );
}
