import axios from 'axios'
import { getStorageItemAsync } from './storage'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

const excludedPaths = ['/auth/login', '/auth/register']

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async config => {
  const shouldSkipAuth = excludedPaths.some(path => config.url?.endsWith(path))

  if (!shouldSkipAuth) {
    const token = await getStorageItemAsync('jwt_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})
