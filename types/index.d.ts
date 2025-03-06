interface Video {
  duration: number
  ends_at: string
  id: string
  media: Media
  media_conversion: MediaConversion
  metadata: Metadata
  poster: Poster
  spherical: boolean
  starts_at: string
  static_conversion: StaticConversion
  title: string
}

interface Media {
  id: string
  mime_type: string
  url: string
  urls: Urls
}

interface Urls {
  'frames:1080p': string
  'frames:720p': string
  hls: string
  'mp3:128k': string
  'mp4:1080p': string
  'mp4:480p': string
  'mp4:720p': string
  original: string
  thumbnail: string
  'webm:1080p': string
  'webm:720p': string
}

interface MediaConversion {
  status: string
}

interface Metadata {
  camera_focal_length: any
  device_model: any
  dimension: any
  duration: number
  file_name: any
  file_size: any
  horizontal_accuracy: any
  lens_model: any
  location: any
  manufacturer: any
  os_version: any
  starts_at: string
}

interface Poster {
  mime_type: string
  url: string
}

interface StaticConversion {
  status: string
}
