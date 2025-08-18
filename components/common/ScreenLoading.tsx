import { ActivityIndicator } from 'react-native-paper'

import FullCenterScreenContent from './FullCenterScreenContent'

const ScreenLoading = () => {
  return (
    <FullCenterScreenContent>
      <ActivityIndicator size="large" animating={true} />
    </FullCenterScreenContent>
  )
}

export default ScreenLoading
