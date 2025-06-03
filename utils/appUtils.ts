import { getStorageItem } from './storage'

export function getUserAuthStatus() {
  return !!getStorageItem('jwt_token')
}
