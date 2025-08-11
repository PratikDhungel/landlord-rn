import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { TRentalPlan } from '@/types/rentalPlan'

const RentalPlans = () => {
  const { data, isError, isLoading } = useApiQuery<TRentalPlan[]>({
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
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Something went wrong</Text>
      </ScreenWrapper>
    )
  }

  if (!data || data.length === 0) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      <Container>
        <PageTitle>Rental Plans</PageTitle>

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
  const { name, ratePeriod, rate } = rentalPlan

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 2, maxWidth: 240 }} ellipsizeMode="tail" numberOfLines={1}>
        {name}
      </Text>

      <Text style={{ flex: 1, textAlign: 'center' }}>{ratePeriod}</Text>

      <Text style={{ flex: 1, textAlign: 'right' }}>{rate}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
