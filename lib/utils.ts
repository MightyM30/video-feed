import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const preloadVideo = async (src: string, signal?: AbortSignal) => {
  const res = await fetch(src, { signal })
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}
