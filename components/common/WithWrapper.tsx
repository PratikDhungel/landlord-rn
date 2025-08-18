import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import Container from './Container'
import ScreenWrapper from './ScreenWrapper'

const WithWrapper = <ComponentProps extends object>(
  Component: React.ComponentType<ComponentProps>,
  customStyles?: StyleProp<ViewStyle>,
) => {
  const WrapperComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    return (
      <ScreenWrapper customStyle={customStyles}>
        <Container>
          <Component {...props} />
        </Container>
      </ScreenWrapper>
    )
  }

  return WrapperComponent
}

export default WithWrapper
