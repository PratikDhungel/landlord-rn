import { router } from 'expo-router'
import { setStorageItemAsync } from './storage'

export async function logout() {
  await setStorageItemAsync('jwt_token', null)
  await setStorageItemAsync('refresh_token', null)
  router.push('/login')
}
