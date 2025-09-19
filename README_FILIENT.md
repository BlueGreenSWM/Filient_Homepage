# Filient Landing Page

A modern, high-converting landing page for Filient - an AI-powered file organization app that saves users 230 hours per year.

## Features

✨ **Modern Design**
- Dark mode with gradient effects
- Glassmorphism and micro-animations
- Responsive design for all devices
- Smooth scroll animations

🎯 **Key Sections**
- **Hero**: Eye-catching intro with animated background
- **Stats**: Animated counters showing real productivity impact
- **Features**: AI-powered solutions showcase
- **Comparison**: Clear advantage over competitors
- **How It Works**: Simple 3-step process
- **Pricing**: Interactive ROI calculator
- **Download CTA**: Platform detection and smart download flow

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx         # Main landing page
│   ├── layout.tsx       # Root layout with metadata
│   ├── globals.css      # Global styles
│   └── api/
│       └── download/    # Download API endpoint
├── components/
│   ├── Hero.tsx         # Hero section with CTA
│   ├── Stats.tsx        # Statistics with animated counters
│   ├── Features.tsx     # AI features showcase
│   ├── Comparison.tsx   # Comparison table
│   ├── HowItWorks.tsx   # Step-by-step guide
│   ├── Pricing.tsx      # Pricing with ROI calculator
│   ├── Download.tsx     # Download CTA section
│   ├── Footer.tsx       # Footer with links
│   └── common/
│       ├── Button.tsx   # Reusable button component
│       └── AnimatedCounter.tsx  # Number animation
├── hooks/
│   ├── usePlatformDetection.ts  # Detect user's OS
│   └── useScrollAnimation.ts    # Scroll-triggered animations
└── lib/
    └── utils.ts         # Utility functions
```

## Key Features Implementation

### Platform Detection
The landing page automatically detects the user's operating system and shows appropriate download options:
- macOS users see "Download for Mac" button
- Other platforms see a waitlist signup

### ROI Calculator
Interactive calculator that shows users their potential savings:
- Input hourly rate and hours wasted
- Calculates monthly and yearly savings
- Shows ROI percentage

### Animated Statistics
Eye-catching animated counters that count up when scrolled into view:
- 230 hours/year saved
- $3,842/year in productivity value
- 54% of professionals struggling with file organization

## Performance Optimizations

- Lazy loading for images and components
- Optimized font loading
- Smooth animations with Framer Motion
- Responsive design with mobile-first approach

## SEO & Metadata

- Comprehensive metadata for search engines
- OpenGraph tags for social sharing
- Twitter Card support
- Structured data for rich snippets

## Deployment

Ready for deployment on Vercel:

```bash
npm run build
```

The site is optimized for Vercel deployment with:
- Automatic optimizations
- Edge functions for download API
- Analytics ready

## Download Functionality

To enable downloads:
1. Place your `Filient.dmg` file in `public/downloads/`
2. The API route at `/api/download` will serve the file
3. Platform detection ensures only macOS users can download

## Analytics Integration

The download API is ready for analytics integration:
- Download tracking endpoint
- Platform detection logging
- User engagement metrics

## Contributing

This landing page is designed to be easily customizable:
- Colors can be adjusted in component files
- Content is clearly separated in each component
- Animations can be tuned via Framer Motion props

## License

This project is proprietary software for Filient.

---

Built with modern web technologies to deliver a "wow" experience that converts visitors into users.