import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { PropsWithChildren } from 'react'

interface IScreenWrapperProps extends PropsWithChildren {
  customStyle?: StyleProp<ViewStyle>
}

const ScreenWrapper = ({ customStyle, children }: IScreenWrapperProps) => {
  return <View style={[styles.screen, customStyle]}>{children}</View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
})

export default ScreenWrapper
