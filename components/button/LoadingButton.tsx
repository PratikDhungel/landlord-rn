import { Button, ButtonProps } from 'react-native-paper'

interface ILoadingButtonProps extends Omit<ButtonProps, 'children'> {
  buttonLabel: string
  isLoading: boolean
  isSuccess: boolean
  loadingLabel: string
  successLabel: string
}

const LoadingButton = (props: ILoadingButtonProps) => {
  const { buttonLabel, loadingLabel, successLabel, isLoading, isSuccess, ...buttonProps } = props

  if (isLoading) {
    return (
      <Button {...buttonProps} loading disabled>
        {loadingLabel}
      </Button>
    )
  }

  if (isSuccess) {
    return <Button {...buttonProps}>{successLabel}</Button>
  }

  return <Button {...buttonProps}>{buttonLabel}</Button>
}

export default LoadingButton
