import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import Container from './Container'
import ScreenWrapper from './ScreenWrapper'

const ErrorScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'Something went wrong'

  return (
    <ScreenWrapper>
      <Container
        containerStyles={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <FontAwesome size={32} style={{ marginBottom: 12 }} name="exclamation-circle" color="red" />
        <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
      </Container>
    </ScreenWrapper>
  )
}

export default ErrorScreen
