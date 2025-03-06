import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchVideos } from '@/api/video.api'

export const useFetchVideos = (
  videos: Video[],
  loadingRef: React.RefObject<boolean>,
) =>
  useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: async ({ pageParam }) => {
      loadingRef.current = true
      const videos = await fetchVideos(pageParam)
      loadingRef.current = false
      return videos
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage
    },
    initialData: {
      pages: [
        {
          data: videos,
          nextPage: 2,
        },
      ],
      pageParams: [1],
    },
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  })
