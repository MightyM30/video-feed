import { videos } from '@/data/videos'
import { FETCH_VIDEO_LIMIT } from '@/lib/contacts'
import { Videos } from '@/components/videos'

export default async function Home() {
  return (
    <>
      <Videos videos={videos.slice(0, FETCH_VIDEO_LIMIT)} />
    </>
  )
}
