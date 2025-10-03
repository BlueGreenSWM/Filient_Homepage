import { Hero } from '@/components/Hero'
import { Stats } from '@/components/Stats'
import { Features } from '@/components/Features'
import { Comparison } from '@/components/Comparison'
import { HowItWorks } from '@/components/HowItWorks'
import { Download } from '@/components/Download'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Comparison />
      <Download />
      <Footer />
    </main>
  );
}
