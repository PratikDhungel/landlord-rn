import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export type storageKey = 'jwt_token' | 'refresh_token' | 'user'

export async function getStorageItemAsync(key: storageKey) {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key)
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e)
    }
  }

  return SecureStore.getItemAsync(key)
}

export async function setStorageItemAsync(key: storageKey, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, value)
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e)
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  }
}
