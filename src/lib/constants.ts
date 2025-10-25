/**
 * Application-wide constants
 */

// Video Assets
export const VIDEO_ASSETS = {
  DEMO: {
    url: 'https://filient-media.s3.ap-northeast-2.amazonaws.com/demo/filient-demo-v3.mp4',
    thumbnail: 'https://filient-media.s3.ap-northeast-2.amazonaws.com/demo/filient-demo-v3-thumbnail.jpg',
    duration: 41.8, // seconds
    resolution: '1112x720',
  },
} as const;

// Media bucket configuration
export const MEDIA_BUCKET = {
  name: 'filient-media',
  region: 'ap-northeast-2',
  baseUrl: 'https://filient-media.s3.ap-northeast-2.amazonaws.com',
} as const;
