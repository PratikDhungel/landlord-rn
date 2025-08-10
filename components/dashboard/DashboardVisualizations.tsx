import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { VisualizationType } from '@/types/dashboard'

function getVisualizationColorFromType(type: VisualizationType) {
  switch (type) {
    case VisualizationType.POSITIVE:
      // TODO Update color codes
      return 'green'

    case VisualizationType.NEGATIVE:
      return 'red'

    default:
      return '#007fff'
  }
}

const DashboardVisualizationTitle = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.visualizationTitle}>{children}</Text>
}

const CircularStatsVisualization = ({
  children,
  type,
}: {
  children: ReactNode
  type: VisualizationType
}) => {
  const visualizationColor = getVisualizationColorFromType(type)

  return (
    <View style={[styles.circularVisualization, { borderColor: visualizationColor }]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  visualizationTitle: { fontSize: 18, marginBottom: 12, fontWeight: 600 },
  circularVisualization: {
    borderWidth: 8,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
})

export { DashboardVisualizationTitle, CircularStatsVisualization }
