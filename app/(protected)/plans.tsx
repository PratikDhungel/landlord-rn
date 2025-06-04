import { StyleSheet, Text, View } from 'react-native'

import ScreenWrapper from '@/components/common/ScreenWrapper'
import useApiQuery from '@/hooks/useApiQuery'
import { ActivityIndicator } from 'react-native-paper'

const RentalPlans = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })

  if (isLoading) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Rental Plans</Text>

        <RentalPlansTitle />

        {data.map((eachPlan: any) => {
          return <RentalPlansRow key={eachPlan.id} rentalPlan={eachPlan} />
        })}
      </View>
    </ScreenWrapper>
  )
}

const RentalPlansTitle = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 2 }]}>Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1, textAlign: 'center' }]}>Rate Period</Text>

      <Text style={[styles.tableTitleText, { flex: 1, textAlign: 'right' }]}>Rate</Text>
    </View>
  )
}

const RentalPlansRow = ({ rentalPlan }: { rentalPlan: any }) => {
  const { name, rate_period, rate } = rentalPlan

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 2, maxWidth: 200 }} ellipsizeMode="tail">
        {name}
      </Text>

      <Text style={{ flex: 1, textAlign: 'center' }}>{rate_period}</Text>

      <Text style={{ flex: 1, textAlign: 'right' }}>{rate}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  tableTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableTitleText: {
    color: '#808080',
  },

  tableRowContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
})

export default RentalPlans
