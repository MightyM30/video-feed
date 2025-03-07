'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

import { useFetchVideos } from '@/hooks/use-fetch-videos'
import { Notification } from '@/components/notification'

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

  return (
    <section className='py-10' ref={refWrapper}>
      <div className='container mx-auto flex flex-col gap-10 px-4'>
        <h2 className='text-center text-4xl font-bold'>Videos</h2>
        <div className='grid grid-cols-4 gap-10'>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((video) => (
                <div
                  key={video.id}
                  className='aspect-square rounded-2xl bg-white p-4 shadow-md'
                  data-item
                >
                  <Image
                    width={200}
                    height={200}
                    src={video.poster.url}
                    className='h-full w-full object-cover'
                    alt=''
                  />
                  {/* <video src={video.media.urls['mp4:480p']} controls></video> */}
                </div>
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
