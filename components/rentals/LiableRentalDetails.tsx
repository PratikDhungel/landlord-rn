import { useState } from 'react'

import { Text, View } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

import Container from '@/components/common/Container'
import RentalPaymentModal from './RentalPaymentModal'
import RentalPaymentsTable from './RentalPaymentsTable'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRentalWithPayments } from '@/types/rentals'

const LiableRentalDetails = ({ rentalId }: { rentalId: string }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const { data, isError, isLoading } = useApiQuery<TRentalWithPayments>({
    queryKey: ['liable-rentals', rentalId],
    url: `/rentals/details/${rentalId}`,
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

  function handleDismissPaymentModal() {
    setShowPaymentModal(false)
  }

  const { ownerFirstName, ownerLastName, ownerEmail, planName, startDate, paymentDetails } = data
  const { payments, total: totalPayment } = paymentDetails

  const rentalDetailsLabelValues = [
    {
      label: 'Owner Full Name',
      value: `${ownerFirstName} ${ownerLastName}`,
    },
    {
      label: 'Tenant Email',
      value: ownerEmail,
    },
    {
      label: 'Rental Plan Name',
      value: planName,
    },
    {
      label: 'Start Date',
      value: getDateFromISOString(startDate),
    },
  ]

  return (
    <ScreenWrapper>
      <Container containerStyles={{ marginBottom: 16 }}>
        <View>
          <View>
            {rentalDetailsLabelValues.map((detail, idx) => {
              return <LabelValuePair label={detail.label} value={detail.value} key={idx} />
            })}
          </View>
        </View>
      </Container>

      <Container>
        <View style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Rental Payments
          </Text>

          <Button mode="text" onPress={() => setShowPaymentModal(true)}>
            <Text style={{ fontSize: 12 }}>New Payment</Text>
          </Button>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>
            <Text style={{ fontWeight: 600 }}>Total Payment Amount: </Text>
            {totalPayment}
          </Text>
        </View>

        <RentalPaymentsTable rentalPayments={payments} />
      </Container>

      <RentalPaymentModal
        rentalId={rentalId}
        visible={showPaymentModal}
        onDismissModal={handleDismissPaymentModal}
      />
    </ScreenWrapper>
  )
}

export default LiableRentalDetails
