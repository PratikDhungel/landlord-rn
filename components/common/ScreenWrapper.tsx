import { StyleSheet, View } from 'react-native'
import { PropsWithChildren } from 'react'

const ScreenWrapper = ({ children }: PropsWithChildren) => {
  return <View style={styles.screen}>{children}</View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
})

export default ScreenWrapper
