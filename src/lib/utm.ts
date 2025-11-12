"use client"

type MaybeString = string | null

interface UTMRecord {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  gclid?: string
  fbclid?: string
  referrer?: string
  capturedAt: string
}

interface UTMStorage {
  firstTouch?: UTMRecord
  lastTouch?: UTMRecord
}

const UTM_STORAGE_KEY = 'filient_utm_tracking'

const parseStoredValue = (): UTMStorage => {
  if (typeof window === 'undefined') return {}

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as UTMStorage
  } catch (error) {
    console.error('Failed to parse stored UTM data', error)
    return {}
  }
}

const saveStorage = (value: UTMStorage) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to persist UTM data', error)
  }
}

const hasAnyValue = (record: UTMRecord) => {
  return Boolean(
    record.source ||
      record.medium ||
      record.campaign ||
      record.term ||
      record.content ||
      record.gclid ||
      record.fbclid
  )
}

const coerce = (value: MaybeString) => (value && value.trim().length > 0 ? value.trim() : undefined)

export const storeUTMParamsFromUrl = (search: string, referrer: string) => {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(search)

  const record: UTMRecord = {
    source: coerce(params.get('utm_source')),
    medium: coerce(params.get('utm_medium')),
    campaign: coerce(params.get('utm_campaign')),
    term: coerce(params.get('utm_term')),
    content: coerce(params.get('utm_content')),
    gclid: coerce(params.get('gclid')),
    fbclid: coerce(params.get('fbclid')),
    // Ensure type matches MaybeString (string | null)
    referrer: coerce((referrer || document.referrer) || null),
    capturedAt: new Date().toISOString(),
  }

  if (!hasAnyValue(record)) {
    // Update referrer only when we do not have stored referrer yet
    if (record.referrer) {
      const existing = parseStoredValue()
      if (existing.firstTouch && !existing.firstTouch.referrer) {
        existing.firstTouch.referrer = record.referrer
        saveStorage(existing)
      }
      if (existing.lastTouch && !existing.lastTouch.referrer) {
        existing.lastTouch.referrer = record.referrer
        saveStorage(existing)
      }
    }
    return
  }

  const existing = parseStoredValue()

  if (!existing.firstTouch) {
    existing.firstTouch = { ...record }
  }

  existing.lastTouch = { ...record }

  saveStorage(existing)
}

export const getUTMEventParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}

  const storage = parseStoredValue()
  const params: Record<string, string> = {}

  if (storage.firstTouch) {
    const first = storage.firstTouch
    if (first.source) params.first_touch_utm_source = first.source
    if (first.medium) params.first_touch_utm_medium = first.medium
    if (first.campaign) params.first_touch_utm_campaign = first.campaign
    if (first.term) params.first_touch_utm_term = first.term
    if (first.content) params.first_touch_utm_content = first.content
    if (first.gclid) params.first_touch_gclid = first.gclid
    if (first.fbclid) params.first_touch_fbclid = first.fbclid
    if (first.referrer) params.first_touch_referrer = first.referrer
  }

  if (storage.lastTouch) {
    const last = storage.lastTouch
    if (last.source) params.utm_source = last.source
    if (last.medium) params.utm_medium = last.medium
    if (last.campaign) params.utm_campaign = last.campaign
    if (last.term) params.utm_term = last.term
    if (last.content) params.utm_content = last.content
    if (last.gclid) params.gclid = last.gclid
    if (last.fbclid) params.fbclid = last.fbclid
    if (last.referrer) params.last_touch_referrer = last.referrer
  }

  return params
}

export const clearStoredUTM = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(UTM_STORAGE_KEY)
}
