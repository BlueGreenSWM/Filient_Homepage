/**
 * Application-wide constants
 */

// Video Assets
export const VIDEO_ASSETS = {
  DEMO: {
    url: 'https://filient-media.s3.ap-northeast-2.amazonaws.com/demo/filient-demo.mp4',
    thumbnail: 'https://filient-media.s3.ap-northeast-2.amazonaws.com/demo/filient-demo-thumbnail.jpg',
    duration: 46.6, // seconds
    resolution: '1280x720',
  },
} as const;

// Media bucket configuration
export const MEDIA_BUCKET = {
  name: 'filient-media',
  region: 'ap-northeast-2',
  baseUrl: 'https://filient-media.s3.ap-northeast-2.amazonaws.com',
} as const;
