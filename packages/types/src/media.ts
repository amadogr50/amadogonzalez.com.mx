export interface Media {
  id: string
  filename: string
  alt?: string
  caption?: unknown
  url: string
  width?: number
  height?: number
  mimeType?: string
  filesize?: number
  sizes?: {
    thumbnail?: MediaSize
    square?: MediaSize
    small?: MediaSize
    medium?: MediaSize
    large?: MediaSize
    xlarge?: MediaSize
    og?: MediaSize
  }
  focalX?: number
  focalY?: number
  createdAt: string
  updatedAt: string
}

export interface MediaSize {
  url: string
  width: number
  height: number
  filename: string
  mimeType: string
  filesize: number
}
