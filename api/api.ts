import axios from 'axios'
import { toast } from 'react-toastify'

import { ENV } from '@/lib/env'

const { API_URL } = ENV

export const QUERY_KEYS = {
  videos: 'videos',
} as const

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
})

api.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response && error.response.data) {
    error.message = error.response.data.message
    toast.error(error.message)
  }
  throw error
})
