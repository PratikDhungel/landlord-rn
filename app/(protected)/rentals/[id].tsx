import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function UserDetail() {
  const { id: rentalId } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Rental ID: {rentalId}</Text>
    </View>
  )
}
