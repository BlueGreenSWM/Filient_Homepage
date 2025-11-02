// Re-export new Features section components
export { FeaturesSection } from './Features/FeaturesSection'
export { FeatureCard } from './Features/FeatureCard'
export { VideoPlayer } from './Features/VideoPlayer'
export { VideoPlaceholder } from './Features/VideoPlaceholder'

// Re-export data and types
export { FEATURES_CONFIG, VIDEO_SOURCES } from './Features/features.data'
export type { FeatureConfig, VideoKey } from './Features/features.data'

// Default export for backward compatibility
export { FeaturesSection as default } from './Features/FeaturesSection'
