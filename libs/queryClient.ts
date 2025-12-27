import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale data after 5 mins, matching cacheTime
      staleTime: 0,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
