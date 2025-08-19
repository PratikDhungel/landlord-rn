import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'

import Container from './Container'

const FullScreenCenterContainer = ({ children }: { children: ReactNode }) => {
  return <Container containerStyles={styles.centerContentStyles}>{children}</Container>
}

const styles = StyleSheet.create({
  centerContentStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FullScreenCenterContainer
