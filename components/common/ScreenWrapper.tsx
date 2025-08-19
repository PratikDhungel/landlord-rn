import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { PropsWithChildren } from 'react'

interface IScreenWrapperProps extends PropsWithChildren {
  screenWrapperStyles?: StyleProp<ViewStyle>
}

const ScreenWrapper = ({ screenWrapperStyles, children }: IScreenWrapperProps) => {
  return (
    <View id="screen-wrapper" style={[styles.screen, screenWrapperStyles]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
})

export default ScreenWrapper
