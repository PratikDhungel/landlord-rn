import { useEffect, useCallback, useReducer } from 'react'
import { getStorageItemAsync, setStorageItemAsync, storageKey } from '@/utils/storage'

type TAsyncState<T> = [boolean, T | null]

type UseStateHook<T> = [TAsyncState<T>, (value: T | null) => void]

function useAsyncState<T>(initialValue: TAsyncState<T> = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: TAsyncState<T>, action: T | null = null): TAsyncState<T> => [false, action],
    initialValue,
  )
}

export function useStorageState(key: storageKey): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  useEffect(() => {
    getStorageItemAsync('jwt_token').then(value => {
      setState(value)
    })
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
