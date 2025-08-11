import { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import Container from '@/components/common/Container'
import RentalPaymentModal from './RentalPaymentModal'
import RentalPaymentsTable from './RentalPaymentsTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenLoading from '@/components/common/ScreenLoading'
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
    return <ScreenLoading />
  }

  if (isError || !data) {
    return <ErrorScreen customMessage="Rental details not available" />
  }

  function handleDismissPaymentModal() {
    setShowPaymentModal(false)
  }

  const {
    ownerFirstName,
    ownerLastName,
    ownerEmail,
    planName,
    startDate,
    paymentDetails,
    planRate,
  } = data
  const planRateAsString = planRate.toString()
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
      label: 'Rental Plan Rate',
      value: planRateAsString,
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
        planRate={planRateAsString}
        visible={showPaymentModal}
        onDismissModal={handleDismissPaymentModal}
      />
    </ScreenWrapper>
  )
}

export default LiableRentalDetails
