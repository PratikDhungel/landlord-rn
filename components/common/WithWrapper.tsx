import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import ScreenWrapper from './ScreenWrapper'

const WithWrapper = <ComponentProps extends object>(
  Component: React.ComponentType<ComponentProps>,
  customStyles?: StyleProp<ViewStyle>,
) => {
  const WrapperComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
      <ScreenWrapper screenWrapperStyles={customStyles}>
        <Component {...props} />
      </ScreenWrapper>
    )
  }

  return WrapperComponent
}

export default WithWrapper
