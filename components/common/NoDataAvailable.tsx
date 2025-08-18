import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import FullCenterScreenContent from './FullCenterScreenContent'

const NoDataAvailableScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'No data available'

  return (
    <FullCenterScreenContent>
      <FontAwesome size={36} style={{ marginBottom: 12 }} name="cloud-download" />
      <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
    </FullCenterScreenContent>
  )
}

export default NoDataAvailableScreen
