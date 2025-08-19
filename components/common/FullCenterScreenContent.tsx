import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

const FullCenterScreenContent = ({ children }: { children: ReactNode }) => {
  return <View style={styles.centerContentStyles}>{children}</View>
}

const styles = StyleSheet.create({
  centerContentStyles: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FullCenterScreenContent
