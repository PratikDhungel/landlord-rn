import * as SecureStore from 'expo-secure-store'

export type storageKey = 'jwt_token' | 'refresh_token'

export function getStorageItem(key: storageKey) {
  try {
    const valueForKey = SecureStore.getItem(key)
    return valueForKey
  } catch {
    console.error('Store Value not available for given key')
  }

  return ''
}

export async function setStorageItem(key: storageKey, value: string) {
  return SecureStore.setItemAsync(key, value)
}

export function removeStorageItem(key: storageKey) {
  return SecureStore.deleteItemAsync(key)
}
