import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import Container from '@/components/common/Container'
import WithWrapper from '@/components/common/WithWrapper'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenLoading from '@/components/common/ScreenLoading'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'
import RentalPaymentsTable from '@/components/rentalPayments/RentalPaymentsTable'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { RENTAL_TYPE, TRentalWithPayments } from '@/types/rentals'

const LiableRentalDetails = ({ rentalId }: { rentalId: string }) => {
  const router = useRouter()

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

  function onAddNewPaymentPress() {
    router.push({
      pathname: '/rentals/[id]/newPayment',
      params: {
        id: rentalId,
        type: RENTAL_TYPE.LIABLE_RENTAL,
        planRate: planRate.toString(),
      },
    })
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
    <>
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

          <Button mode="text" onPress={onAddNewPaymentPress}>
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
    </>
  )
}

export default WithWrapper(LiableRentalDetails)
