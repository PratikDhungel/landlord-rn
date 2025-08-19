import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import FullScreenCenterContainer from './FullScreenCenterContainer'

const NoDataAvailableScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'No data available'

  return (
    <FullScreenCenterContainer>
      <FontAwesome size={36} style={{ marginBottom: 12 }} name="cloud-download" />
      <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
    </FullScreenCenterContainer>
  )
}

export default NoDataAvailableScreen
