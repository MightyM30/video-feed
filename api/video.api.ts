export const fetchVideos = async (page: number) => {
  const res = await fetch('/api/videos/?page=' + page)
  if (res.status === 404) {
    return Promise.reject(new Error('Not found page'))
  }
  if (res.status !== 200) {
    return Promise.reject(new Error('Something went wrong'))
  }
  return res.json() as Promise<{ data: Video[]; nextPage: number }>
}
