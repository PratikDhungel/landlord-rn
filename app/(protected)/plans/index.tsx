import { StyleSheet, Text, View } from 'react-native'

import useApiQuery from '@/hooks/useApiQuery'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import { ActivityIndicator } from 'react-native-paper'
import Container from '@/components/common/Container'

const RentalPlans = () => {
  const { data, isError, isLoading } = useApiQuery({
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

  //   TODO Create common component for error screens
  if (isError) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }

  return (
    <ScreenWrapper>
      <Container>
        <Text style={styles.pageTitle}>Rental Plans</Text>

        <RentalPlansTitle />

        {data.map((eachPlan: any) => {
          return <RentalPlansRow key={eachPlan.id} rentalPlan={eachPlan} />
        })}
      </Container>
    </ScreenWrapper>
  )
}

const RentalPlansTitle = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 2, maxWidth: 240 }]}>Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1, textAlign: 'center' }]}>Rate Period</Text>

      <Text style={[styles.tableTitleText, { flex: 1, textAlign: 'right' }]}>Rate</Text>
    </View>
  )
}

const RentalPlansRow = ({ rentalPlan }: { rentalPlan: any }) => {
  const { name, rate_period, rate } = rentalPlan

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 2, maxWidth: 240 }} ellipsizeMode="tail" numberOfLines={1}>
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
