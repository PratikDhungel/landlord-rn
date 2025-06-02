import { useQueryClient } from '@tanstack/react-query'

export type TQueryKey = (string | number)[]
export type TQueryData = unknown

const useReactQueryClient = () => {
  const queryClient = useQueryClient()

  function handleInvalidateSingleQuery(queryKey: TQueryKey) {
    if (queryKey && queryKey.length) {
      queryClient.invalidateQueries({ queryKey, exact: true })
    }
  }

  function handleInvalidateMultipleQueries(queryKeys: TQueryKey[]) {
    if (queryKeys.length === 0) {
      return
    }

    queryKeys.forEach(queryKey => {
      queryClient.invalidateQueries({ queryKey, exact: true })
    })
  }

  function getQueryClientDefaultOptions() {
    return queryClient.getDefaultOptions()
  }

  function getQueryDataFromKey(queryKey: TQueryKey) {
    return queryClient.getQueryData(queryKey)
  }

  function setQueryDataForKey(queryKey: TQueryKey, queryData: TQueryData) {
    const queryCacheData = getQueryDataFromKey(queryKey)

    if (!queryCacheData) {
      console.error(`Query Cache data for ${queryKey} does not exist`)
      return
    }

    queryClient.setQueryData(queryKey, queryData)
  }

  return {
    queryClient,
    handleInvalidateSingleQuery,
    handleInvalidateMultipleQueries,
    getQueryClientDefaultOptions,
    getQueryDataFromKey,
    setQueryDataForKey,
  }
}

export default useReactQueryClient
