import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

const Container = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
})

export default Container
