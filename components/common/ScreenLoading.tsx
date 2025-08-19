import { ActivityIndicator } from 'react-native-paper'

import FullScreenCenterContainer from './FullScreenCenterContainer'

const ScreenLoading = () => {
  return (
    <FullScreenCenterContainer>
      <ActivityIndicator size="large" animating={true} />
    </FullScreenCenterContainer>
  )
}

export default ScreenLoading
