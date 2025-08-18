import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import FullCenterScreenContent from './FullCenterScreenContent'

const ErrorScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'Something went wrong'

  return (
    <FullCenterScreenContent>
      <FontAwesome size={32} style={{ marginBottom: 12 }} name="exclamation-circle" color="red" />
      <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
    </FullCenterScreenContent>
  )
}

export default ErrorScreen
