import { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface IContainerProps extends PropsWithChildren {
  containerStyles?: StyleProp<ViewStyle>
}

const Container = ({ containerStyles, children }: IContainerProps) => {
  return <View style={[styles.container, containerStyles && containerStyles]}>{children}</View>
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
