import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
      <header className='absolute top-0 right-0 left-0 z-50 flex min-h-[var(--header-height)] items-center border-b border-[#E9E9E9]/40 bg-white'>
        <div className='container flex items-center justify-between py-1'>
          <Link
            href='/'
            className='text-primary flex items-center gap-2 text-[34px] font-extrabold lg:text-[38px]'
          >
            <svg className='h-12 w-12' version='1' viewBox='0 0 48 48'>
              <path
                fill='currentColor'
                d='M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z'
              />
              <polygon fill='#2d2de9' points='44,35 34,29 34,19 44,13' />
            </svg>
            <span>
              <span>Video</span>
              <span className='font-normal italic'>Feed</span>
            </span>
          </Link>
        </div>
      </header>
      <div className='h-[var(--header-height)]'></div>
    </>
  )
}

export { Header }
