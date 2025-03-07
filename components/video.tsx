'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayerT from 'react-player'
import { FaPlay } from 'react-icons/fa'

import { cn } from '@/lib/utils'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const Video = ({
  video,
  playing,
  onPlay,
  speedQuality,
}: {
  video: Video
  playing: boolean
  onPlay: (video: Video) => void
  speedQuality: 'LOADING' | 'FAST' | 'SLOW'
}) => {
  const playerRef = useRef<ReactPlayerT>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [videoSource, setVideoSource] = useState<string>('')

  const video720 = video.media.urls['webm:720p']
  const video1080 = video.media.urls['webm:1080p']

  const handlePlayPause = () => {
    onPlay(video)
    setShowVideo(true)
  }

  useEffect(() => {
    if (!playing) {
      setShowVideo(false)
    }
  }, [playing])

  useEffect(() => {
    if (speedQuality === 'LOADING') return

    setVideoSource(speedQuality === 'FAST' ? video1080 : video720)
  }, [speedQuality])

  const handleVideoEnd = () => {
    setShowVideo(false)
  }

  return (
    <div
      key={video.id}
      className='relative aspect-square rounded-2xl border-white bg-white p-2 shadow-md'
      data-item
      ref={wrapperRef}
    >
      <div className='relative h-full w-full overflow-hidden rounded-xl'>
        <Image
          width={200}
          height={200}
          src={video.poster.url}
          className='h-full w-full object-cover'
          alt=''
        />
        {showVideo && playing && (
          <div className='absolute inset-0 flex items-center justify-center text-white'>
            <ReactPlayer
              ref={playerRef}
              url={videoSource}
              width={'100%'}
              height='100%'
              playing={playing}
              controls={true}
              onEnded={handleVideoEnd}
            />
          </div>
        )}

        {!showVideo && (
          <button
            className={cn(
              'bg-primary/40 hover:text-primary hover:bg-primary/20 absolute inset-0 flex cursor-pointer items-center justify-center text-4xl text-white transition-all hover:scale-150',
              playing && showVideo && 'opacity-0'
            )}
            onClick={handlePlayPause}
          >
            <FaPlay />
          </button>
        )}
      </div>
    </div>
  )
}

export { Video }
