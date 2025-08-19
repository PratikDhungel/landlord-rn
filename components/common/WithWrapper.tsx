import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import ScreenWrapper from './ScreenWrapper'

const WithWrapper = <ComponentProps extends object>(
  Component: React.ComponentType<ComponentProps>,
  screenWrapperStyles?: StyleProp<ViewStyle>,
) => {
  const WrapperComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
      <ScreenWrapper screenWrapperStyles={screenWrapperStyles}>
        <Component {...props} />
      </ScreenWrapper>
    )
  }

  return WrapperComponent
}

export default WithWrapper
