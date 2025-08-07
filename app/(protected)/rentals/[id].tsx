import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRentalWithPayments } from '@/types/rentals'
import { TRentalPayment } from '@/types/rentalPayments'

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

const RentalPaymentsTable = ({ rentalPayments }: { rentalPayments: TRentalPayment[] }) => {
  return (
    <View>
      <RentalPaymentsTableHeader />

      {rentalPayments.map(eachPayment => {
        return <RentalPaymentsTableRow rentalPayment={eachPayment} key={eachPayment.id} />
      })}
    </View>
  )
}

const RentalPaymentsTableHeader = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Payment Amount</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Payment Date</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Proof of Payment</Text>
    </View>
  )
}

const RentalPaymentsTableRow = ({ rentalPayment }: { rentalPayment: TRentalPayment }) => {
  const { amount, createdAt, proofOfPayment } = rentalPayment

  const proofOfPaymentLabel = proofOfPayment ?? 'N/A'

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }}>{amount}</Text>

      <Text style={{ flex: 1 }}>{getDateFromISOString(createdAt)}</Text>

      <Text style={{ flex: 1 }}>{proofOfPaymentLabel}</Text>
    </View>
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

export default RentalDetails
