import { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

const PageTitle = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.pageTitle}>{children}</Text>
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
})

export default PageTitle
