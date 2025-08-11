import { ActivityIndicator } from 'react-native-paper'

import Container from './Container'
import ScreenWrapper from './ScreenWrapper'

const ScreenLoading = () => {
  return (
    <ScreenWrapper>
      <Container
        containerStyles={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
      >
        <ActivityIndicator size="large" animating={true} />
      </Container>
    </ScreenWrapper>
  )
}

export default ScreenLoading
