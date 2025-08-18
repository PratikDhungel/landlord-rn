import { Text } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import Container from './Container'
import ScreenWrapper from './ScreenWrapper'

const NoDataAvailableScreen = ({ customMessage }: { customMessage?: string }) => {
  const errorMessage = customMessage || 'No data available'

  return (
    <ScreenWrapper>
      <Container
        containerStyles={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <FontAwesome size={36} style={{ marginBottom: 12 }} name="cloud-download" />
        <Text style={{ fontSize: 18 }}>{errorMessage}</Text>
      </Container>
    </ScreenWrapper>
  )
}

export default NoDataAvailableScreen
