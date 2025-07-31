import { StyleSheet, Text, View } from 'react-native'

import useApiQuery from '@/hooks/useApiQuery'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import { ActivityIndicator } from 'react-native-paper'
import Container from '@/components/common/Container'

type TRental = {
  id: number
  userId: number
  tenantFirstName: string
  tenantLastName: string
  planName: string
}

const Rentals = () => {
  const { data, isError, isLoading } = useApiQuery<TRental[]>({
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
        <Text style={styles.pageTitle}>Rentals</Text>

        <RentalsTitle />

        {data.map((eachPlan: any) => {
          return <RentalsRow key={eachPlan.id} rentalPlan={eachPlan} />
        })}
      </Container>
    </ScreenWrapper>
  )
}

const RentalsTitle = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Tenant Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Plan Name</Text>
    </View>
  )
}

const RentalsRow = ({ rentalPlan }: { rentalPlan: any }) => {
  const { tenantFirstName, tenantLastName, planName } = rentalPlan
  const tenantFullName = `${tenantFirstName} ${tenantLastName}`

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1}>
        {tenantFullName}
      </Text>

      <Text style={{ flex: 1 }}>{planName}</Text>
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

export default Rentals
