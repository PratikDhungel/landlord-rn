import { ActivityIndicator } from 'react-native-paper'

import ScreenWrapper from './ScreenWrapper'

const ScreenLoading = () => {
  return (
    <ScreenWrapper customStyle={{ justifyContent: 'center' }}>
      <ActivityIndicator size="large" animating={true} />
    </ScreenWrapper>
  )
}

export default ScreenLoading
