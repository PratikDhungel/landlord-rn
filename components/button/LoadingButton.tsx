import { Button, ButtonProps } from 'react-native-paper'

import { BUTTON_TYPE } from '@/types/common'

interface ILoadingButtonProps extends Omit<ButtonProps, 'children'> {
  buttonLabel: string
  isLoading: boolean
  loadingLabel: string
  buttonType?: BUTTON_TYPE
}

function getPrimaryColorFromType(buttonType: BUTTON_TYPE) {
  switch (buttonType) {
    case BUTTON_TYPE.ACTIVE:
      return '#16a34a'

    case BUTTON_TYPE.DANGER:
      return '#dc2626'

    case BUTTON_TYPE.WARNING:
      return '#ea580c'

    default:
      return '#007fff'
  }
}

const LoadingButton = (props: ILoadingButtonProps) => {
  const {
    buttonLabel,
    loadingLabel,
    isLoading,
    buttonType = BUTTON_TYPE.NEUTRAL,
    ...buttonProps
  } = props

  const primaryColor = getPrimaryColorFromType(buttonType)

  if (isLoading) {
    return (
      <Button {...buttonProps} loading disabled>
        {loadingLabel}
      </Button>
    )
  }

  return (
    <Button theme={{ colors: { primary: primaryColor } }} {...buttonProps}>
      {buttonLabel}
    </Button>
  )
}

export default LoadingButton
