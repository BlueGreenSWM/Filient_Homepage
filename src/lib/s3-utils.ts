import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { parseStringPromise } from 'xml2js'
import type { AppcastItem } from '@/types/appcast'

// 환경 변수 체크
const hasAwsCredentials = !!(
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY
)

// S3 클라이언트 초기화 (환경 변수가 있을 때만)
const s3Client = hasAwsCredentials ? new S3Client({
  region: process.env.AWS_REGION || 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}) : null

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'filient-updates'
const APPCAST_KEY = 'appcast.xml'

// Mock 데이터 (개발 환경용)
const MOCK_APPCAST_DATA: AppcastItem = {
  version: '1.0.0',
  shortVersionString: '1.0.0',
  pubDate: new Date().toISOString(),
  isCriticalUpdate: false,
  description: 'Latest version of Filient',
  downloadUrl: 'https://filient-updates.s3.ap-northeast-2.amazonaws.com/releases/1.0.0/Filient-1.0.0.dmg',
  fileSize: 25165824, // ~24MB
  edSignature: '',
  minimumSystemVersion: '12.0',
  releaseNotesUrl: undefined,
}

/**
 * S3에서 appcast.xml 다운로드 및 파싱
 */
export async function fetchAppcastXML(): Promise<string> {
  // AWS 자격 증명이 없으면 에러 발생
  if (!s3Client) {
    throw new Error('AWS credentials not configured')
  }

  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: APPCAST_KEY,
    })

    const response = await s3Client.send(command)

    if (!response.Body) {
      throw new Error('Empty response from S3')
    }

    // Stream을 문자열로 변환
    const xmlContent = await response.Body.transformToString()
    return xmlContent
  } catch (error) {
    console.error('Failed to fetch appcast.xml from S3:', error)
    throw new Error('Failed to fetch update information')
  }
}

/**
 * XML을 파싱하여 최신 버전 정보 추출
 */
export async function parseAppcastXML(xmlContent: string): Promise<AppcastItem> {
  try {
    const result = await parseStringPromise(xmlContent, {
      explicitArray: false,
      mergeAttrs: true,
    })

    const channel = result.rss.channel
    const item = channel.item

    // Sparkle 네임스페이스 처리
    const version = item['sparkle:version'] || item.version
    const shortVersionString = item['sparkle:shortVersionString'] || item.shortVersionString
    const minimumSystemVersion = item['sparkle:minimumSystemVersion'] || item.minimumSystemVersion || '10.15'

    // enclosure에서 다운로드 정보 추출
    const enclosure = item.enclosure
    const downloadUrl = enclosure.url
    const fileSize = parseInt(enclosure.length) || 0
    const edSignature = enclosure['sparkle:edSignature'] || enclosure.edSignature || ''

    // Description에서 릴리즈 노트 URL 추출
    let releaseNotesUrl: string | undefined
    if (item.description) {
      const descriptionContent = item.description._text || item.description
      const urlMatch = descriptionContent.match(/href="([^"]+)"/)
      if (urlMatch) {
        releaseNotesUrl = urlMatch[1]
      }
    }

    const appcastItem: AppcastItem = {
      version,
      shortVersionString,
      pubDate: item.pubDate,
      isCriticalUpdate: item['sparkle:criticalUpdate'] !== undefined || item.criticalUpdate !== undefined,
      description: item.description?._text || item.description || '',
      downloadUrl,
      fileSize,
      edSignature,
      minimumSystemVersion,
      releaseNotesUrl,
    }

    return appcastItem
  } catch (error) {
    console.error('Failed to parse appcast XML:', error)
    throw new Error('Failed to parse update information')
  }
}

/**
 * 최신 버전 정보 가져오기 (캐시 포함)
 */
let cachedAppcastData: { data: AppcastItem; timestamp: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5분

export async function getLatestVersion(): Promise<AppcastItem> {
  const now = Date.now()

  // 캐시 확인
  if (cachedAppcastData && now - cachedAppcastData.timestamp < CACHE_DURATION) {
    return cachedAppcastData.data
  }

  // AWS 자격 증명이 없으면 mock 데이터 반환 (개발 환경)
  if (!hasAwsCredentials) {
    console.warn('AWS credentials not configured, using mock data')
    return MOCK_APPCAST_DATA
  }

  try {
    // 새로 가져오기
    const xmlContent = await fetchAppcastXML()
    const appcastData = await parseAppcastXML(xmlContent)

    // 캐시 저장
    cachedAppcastData = {
      data: appcastData,
      timestamp: now,
    }

    return appcastData
  } catch (error) {
    console.error('Failed to fetch from S3, falling back to mock data:', error)
    return MOCK_APPCAST_DATA
  }
}

/**
 * S3에서 파일 스트림 가져오기
 */
export async function getS3FileStream(key: string) {
  if (!s3Client) {
    throw new Error('AWS credentials not configured')
  }

  try {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    })

    const response = await s3Client.send(command)
    return response
  } catch (error) {
    console.error('Failed to fetch file from S3:', error)
    throw new Error('Failed to fetch file')
  }
}

/**
 * 다운로드 URL에서 S3 키 추출
 */
export function extractS3KeyFromUrl(url: string): string {
  // URL 예시: https://filient-updates.s3.ap-northeast-2.amazonaws.com/releases/1.1.1/Filient-1.1.1.zip
  const match = url.match(/amazonaws\.com\/(.+)$/)
  if (!match) {
    throw new Error('Invalid S3 URL')
  }
  return match[1]
}

/**
 * DMG 파일 URL로 변환 (ZIP -> DMG)
 */
export function convertZipUrlToDmg(zipUrl: string): string {
  return zipUrl.replace(/\.zip$/, '.dmg')
}

/**
 * 파일 크기를 MB로 변환
 */
export function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(2)} MB`
}
