import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRentalWithPayments } from '@/types/rentals'
import RentalPaymentsTable from '@/components/rentals/RentalPaymentsTable'

const RentalDetails = () => {
  const { id: rentalId } = useLocalSearchParams()

  const { data, isError, isLoading } = useApiQuery<TRentalWithPayments>({
    queryKey: ['liable-rentals', rentalId],
    url: `/rentals/liable-rental/${rentalId}`,
  })

  if (isLoading) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </ScreenWrapper>
    )
  }

  if (isError || !data) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  const { ownerFirstName, ownerLastName, ownerEmail, planName, startDate, paymentDetails } = data
  const { payments, total: totalPayment } = paymentDetails

  return (
    <ScreenWrapper>
      <Container containerStyles={{ marginBottom: 16 }}>
        <View>
          <View style={{ marginBottom: 12 }}>
            <Text>
              <Text style={{ fontWeight: 600 }}>Owner Full Name: </Text>
              {ownerFirstName} {ownerLastName}
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text>
              <Text style={{ fontWeight: 600 }}>Owner Email: </Text>
              {ownerEmail}
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text>
              <Text style={{ fontWeight: 600 }}>Rental Plan Name: </Text>
              {planName}
            </Text>
          </View>

          <View>
            <Text>
              <Text style={{ fontWeight: 600 }}>Start Date: </Text>
              {getDateFromISOString(startDate)}
            </Text>
          </View>
        </View>
      </Container>

      <Container>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Rental Payments
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>
            <Text style={{ fontWeight: 600 }}>Total Payment Amount: </Text>
            {totalPayment}
          </Text>
        </View>

        <RentalPaymentsTable rentalPayments={payments} />
      </Container>
    </ScreenWrapper>
  )
}

export default RentalDetails
