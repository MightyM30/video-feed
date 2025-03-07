'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useFetchVideos } from '@/hooks/use-fetch-videos'
import { Notification } from '@/components/notification'
import { Video } from '@/components/video'
import { useSpeed } from '@/hooks/use-speed'

const Videos = ({ videos: initVideos }: { videos: Video[] }) => {
  const loadingRef = useRef(false)
  const refWrapper = useRef<HTMLElement>(null)
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFetchVideos(initVideos, loadingRef)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const { loading, results } = useSpeed()
  const speedMbps = results.speedMbps
  const speedQuality = loading ? 'LOADING' : speedMbps > 100 ? 'FAST' : 'SLOW'

  useEffect(() => {
    let prevScrollY = 0
    const wrapperDom = refWrapper.current!
    const item =
      wrapperDom.querySelector('[data-item]') ?? document.createElement('div')

    const height = item.getBoundingClientRect().height || 200

    const scroll = () => {
      if (loadingRef.current) {
        return
      }

      const scrollY = window.scrollY
      const scrollToTop = prevScrollY > scrollY

      if (scrollToTop) {
        return
      }

      const currentY = scrollY + window.innerHeight + height
      const bottomY = document.body.offsetHeight

      if (currentY > bottomY) {
        loadingRef.current = true
        fetchNextPage()
      }
    }
    scroll()
    document.addEventListener('scroll', scroll)

    return () => {
      document.removeEventListener('scroll', scroll)
    }
  }, [])

  const handlePlay = (video: Video) => {
    setPlayingId(playingId === video.id ? null : video.id)
  }

  return (
    <section className='py-10' ref={refWrapper}>
      <div className='container mx-auto flex flex-col gap-10 px-4'>
        <div className='text-center'>
          <h2 className='text-center text-4xl font-bold'>Videos</h2>
          <h3 className='text-center text-3xl'>SpeedTest - {speedMbps} Mbps</h3>
        </div>
        <div className='grid grid-cols-4 gap-10'>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((video) => (
                <Video
                  key={video.id}
                  video={video}
                  playing={playingId === video.id}
                  onPlay={handlePlay}
                  speedQuality={speedQuality}
                />
              ))}
            </React.Fragment>
          ))}
          <div className='col-span-4'>
            <Notification
              type='error'
              message={status === 'error' ? error.message : ''}
            />
            <Notification
              type='info'
              message={
                status === 'success'
                  ? isFetchingNextPage && hasNextPage
                    ? 'Loading more videos..'
                    : 'No more videos found'
                  : ''
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { Videos }
