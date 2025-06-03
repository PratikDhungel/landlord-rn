import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import { View } from '@/components/Themed'

const FullPageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default FullPageLoader
