import { useEffect, useCallback, useReducer } from 'react'
import { getStorageItemAsync, setStorageItemAsync, storageKey } from '@/utils/storage'

// async state tuple with [loading, storeValue]
type TAsyncState<T> = [boolean, T | null]

// useState like tuple for async store value with state and reducer function
type UseStateHook<T> = [TAsyncState<T>, (value: T | null) => void]

// after async store fetch update state with value, set loading to false
function asyncStateReducerFunction<T>(
  state: TAsyncState<T>,
  action: T | null = null,
): TAsyncState<T> {
  return [false, action]
}

function useAsyncState<T>(initialValue: TAsyncState<T> = [true, null]): UseStateHook<T> {
  return useReducer(asyncStateReducerFunction<T>, initialValue)
}

export function useStorageState(key: storageKey): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>()

  useEffect(() => {
    getStorageItemAsync(key).then(value => {
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
