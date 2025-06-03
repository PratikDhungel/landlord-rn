import { AxiosRequestConfig } from 'axios'
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query'

import { api } from '@/utils/axios'

type UseApiQueryProps<T> = {
  queryKey: QueryKey
  url: string
  config?: AxiosRequestConfig
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
}

const useApiQuery = <T = any>({ queryKey, url, config, options }: UseApiQueryProps<T>) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<T>(url, config)
      return response.data
    },
    ...options,
  })
}

export default useApiQuery
