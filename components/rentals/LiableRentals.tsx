import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRental } from '@/types/rentals'

const LiableRentals = () => {
  const {
    data = [],
    isError,
    isLoading,
  } = useApiQuery<TRental[]>({
    queryKey: ['liable-rentals'],
    url: '/rentals/liable-rentals',
  })

  const router = useRouter()

  if (isLoading) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </ScreenWrapper>
    )
  }

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

  function onRentalRowPress(rentalId: string) {
    router.push({
      pathname: '/rentals/[id]',
      params: {
        id: rentalId,
        type: 'liable-rental',
      },
    })
  }

  return (
    <Container>
      <Text style={styles.pageTitle}>Rentals</Text>

      <RentalsTitle />

      {data.map((eachRental: any) => {
        return (
          <RentalsRow
            key={eachRental.id}
            liableRental={eachRental}
            onRentalRowPress={onRentalRowPress}
          />
        )
      })}
    </Container>
  )
}

const RentalsTitle = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Owner Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Plan Name</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Start Date</Text>
    </View>
  )
}

interface IRentalsRowProps {
  liableRental: TRental
  onRentalRowPress: (rentalId: string) => void
}

const RentalsRow = ({ liableRental, onRentalRowPress }: IRentalsRowProps) => {
  const { id: rentalId, ownerFirstName, ownerLastName, planName, startDate } = liableRental

  const ownerFullName = `${ownerFirstName} ${ownerLastName}`
  const startDateAsString = getDateFromISOString(startDate)

  return (
    <Pressable style={styles.tableRowContainer} onPress={() => onRentalRowPress(rentalId)}>
      <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1}>
        {ownerFullName}
      </Text>

      <Text style={{ flex: 1 }}>{planName}</Text>

      <Text style={{ flex: 1 }}>{startDateAsString}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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

export default LiableRentals
