import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useCallback, useReducer } from 'react'

type TAsyncState<T> = [boolean, T | null]

type UseStateHook<T> = [TAsyncState<T>, (value: T | null) => void]

function useAsyncState<T>(initialValue: TAsyncState<T> = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: TAsyncState<T>, action: T | null = null): TAsyncState<T> => [false, action],
    initialValue,
  )
}

export async function setStorageItemAsync(key: string, value: string | null) {
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

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key))
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e)
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value)
      })
    }
  }, [key])

  const setValue = useCallback(
    (value: string | null) => {
      setState(value)
      setStorageItemAsync(key, value)
    },
    [key],
  )

  return [state, setValue]
}
