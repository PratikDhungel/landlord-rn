import { AxiosRequestConfig } from 'axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { api } from '@/utils/axios'

interface IUseApiQueryProps<TData = unknown> {
  queryKey: readonly unknown[]
  url: string
  config?: AxiosRequestConfig
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
}

const useApiQuery = <TData>({ queryKey, url, config, options }: IUseApiQueryProps<TData>) => {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url, config)
      return response.data as TData
    },
    ...options,
  })
}

export default useApiQuery
