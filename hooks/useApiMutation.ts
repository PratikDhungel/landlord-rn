import { useMutation } from '@tanstack/react-query'

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const { mutate, mutateAsync, isPending, isSuccess, isError, error, data } = useMutation({
    mutationFn,
  })

  return {
    mutate,
    mutateAsync,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
    data,
  }
}
