import { useEffect, useState } from 'react'

const VIDEO_SRC =
  'https://media.irisona.net/delivery/video/8afd5162-e1a4-4678-afcf-b830d18c03d3/static/720p.webm'

const useSpeed = () => {
  const [results, setResults] = useState<{
    speedBps: number
    speedKbps: number
    speedMbps: number
  }>({
    speedBps: 0,
    speedKbps: 0,
    speedMbps: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function measureConnectionSpeed() {
      setLoading(true)

      const startTime = new Date().getTime()

      const cacheBuster = '?nnn=' + startTime
      const src = VIDEO_SRC + cacheBuster

      const response = await fetch(src)
      await response.blob()
      const downloadSize = Number(response.headers.get('Content-Length'))
      const endTime = new Date().getTime()

      const duration = (endTime - startTime) / 1000
      const bitsLoaded = downloadSize * 8
      const speedBps = Number((bitsLoaded / duration).toFixed(2))
      const speedKbps = Number((speedBps / 1024).toFixed(2))
      const speedMbps = Number((speedKbps / 1024).toFixed(2))

      setResults({
        speedBps: speedBps,
        speedKbps: speedKbps,
        speedMbps: speedMbps,
      })

      setLoading(false)
    }

    measureConnectionSpeed()
  }, [])

  return { results, loading }
}

export { useSpeed }
