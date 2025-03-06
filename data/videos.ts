import { ENV } from '@/lib/env'

const { API_URL, TOKEN } = ENV

export const videos = await fetch(
  `${API_URL}/spaces/ba0df1a1-5ae7-4740-9729-d5180c87bde6/videos`,
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  },
)
  .then((data) => {
    if (!data.ok) {
      return Promise.reject()
    }
    return data.json() as Promise<{ videos: Video[] }>
  })
  .then((data) => data.videos)
  .catch((e) => {
    return []
  })
