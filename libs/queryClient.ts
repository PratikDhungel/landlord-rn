import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale data after 5 mins, matching cacheTime
      staleTime: 1000 * 60 * 5,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
