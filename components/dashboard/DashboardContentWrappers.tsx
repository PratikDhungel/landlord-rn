import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import Container from '@/components/common/Container'

const DashboardStatsSectionWrapper = ({ children }: { children: ReactNode }) => {
  return <View style={styles.dashboardStatsSectionWrapper}>{children}</View>
}

const DashboardStatsContainer = ({ children }: { children: ReactNode }) => {
  return <Container containerStyles={styles.dashboardStatsContainer}>{children}</Container>
}

const styles = StyleSheet.create({
  dashboardStatsSectionWrapper: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dashboardStatsContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export { DashboardStatsContainer, DashboardStatsSectionWrapper }
