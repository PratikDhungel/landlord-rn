import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import FullScreenCenterContainer from './FullScreenCenterContainer'

const ErrorScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'Something went wrong'

  return (
    <FullScreenCenterContainer>
      <FontAwesome size={32} style={{ marginBottom: 12 }} name="exclamation-circle" color="red" />
      <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
    </FullScreenCenterContainer>
  )
}

export default ErrorScreen
