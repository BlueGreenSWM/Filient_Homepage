import { MessageSquare, RotateCcw, Calendar, Tag, LucideIcon } from 'lucide-react'
import { VIDEO_ASSETS } from '@/lib/constants'

export type VideoKey = 'AI_CHATBOT' | 'ROLLBACK' | 'PERIODIC_EXECUTION'

export interface FeatureConfig {
  id: number
  icon: LucideIcon
  videoKey: VideoKey | null
  hasVideo: boolean
}

export const FEATURES_CONFIG: FeatureConfig[] = [
  {
    id: 1,
    icon: MessageSquare,
    videoKey: 'AI_CHATBOT',
    hasVideo: true,
  },
  {
    id: 2,
    icon: RotateCcw,
    videoKey: 'ROLLBACK',
    hasVideo: true,
  },
  {
    id: 3,
    icon: Calendar,
    videoKey: 'PERIODIC_EXECUTION',
    hasVideo: true,
  },
  {
    id: 4,
    icon: Tag,
    videoKey: null,
    hasVideo: false,
  },
]

// ✅ Use existing S3 URLs from constants (already uploaded)
export const VIDEO_SOURCES: Record<VideoKey, string> = {
  AI_CHATBOT: VIDEO_ASSETS.FEATURES.AI_CHATBOT.url,
  ROLLBACK: VIDEO_ASSETS.FEATURES.ROLLBACK.url,
  PERIODIC_EXECUTION: VIDEO_ASSETS.FEATURES.PERIODIC_EXECUTION.url,
}
