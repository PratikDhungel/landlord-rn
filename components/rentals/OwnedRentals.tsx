import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRental } from '@/types/rentals'

const OwnedRentals = () => {
  const {
    data = [],
    isError,
    isLoading,
  } = useApiQuery<TRental[]>({
    queryKey: ['rentals'],
    url: '/rentals/owned-rentals',
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

  if (data.length === 0) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  return (
    <Container>
      <Text style={styles.pageTitle}>Rentals</Text>

      <RentalsTitle />

      {data.map((eachPlan: any) => {
        return <RentalsRow key={eachPlan.id} rentalPlan={eachPlan} />
      })}
    </Container>
  )
}

const RentalsTitle = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Tenant Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Plan Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Start Date</Text>
    </View>
  )
}

const RentalsRow = ({ rentalPlan }: { rentalPlan: TRental }) => {
  const { tenantFirstName, tenantLastName, planName, startDate } = rentalPlan

  const tenantFullName = `${tenantFirstName} ${tenantLastName}`
  const startDateAsString = getDateFromISOString(startDate)

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1}>
        {tenantFullName}
      </Text>

      <Text style={{ flex: 1 }}>{planName}</Text>

      <Text style={{ flex: 1 }}>{startDateAsString}</Text>
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

export default OwnedRentals
