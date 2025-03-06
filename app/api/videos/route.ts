import { NextRequest } from 'next/server'

import { videos } from '@/data/videos'
import { FETCH_VIDEO_LIMIT } from '@/lib/contacts'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const hasPage = searchParams.get('page')
  const page = Number(searchParams.get('page') ?? 1)

  const data = hasPage
    ? videos.slice(FETCH_VIDEO_LIMIT * (page - 1), FETCH_VIDEO_LIMIT * page)
    : videos
  const nextPage = hasPage
    ? videos.length > page * FETCH_VIDEO_LIMIT
      ? page + 1
      : undefined
    : undefined

  return new Response(
    JSON.stringify({
      data,
      nextPage,
      total: data.length,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
