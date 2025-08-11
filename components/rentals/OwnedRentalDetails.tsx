import { Text, View } from 'react-native'

import Container from '@/components/common/Container'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import ScreenLoading from '@/components/common/ScreenLoading'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'

import useApiQuery from '@/hooks/useApiQuery'
import { getDateFromISOString } from '@/utils/dateUtils'

import { TRentalWithPayments } from '@/types/rentals'
import RentalPaymentsTable from './RentalPaymentsTable'

const OwnedRentalDetails = ({ rentalId }: { rentalId: string }) => {
  const { data, isError, isLoading } = useApiQuery<TRentalWithPayments>({
    queryKey: ['owned-rentals', rentalId],
    url: `/rentals/details/${rentalId}`,
  })

  if (isLoading) {
    return <ScreenLoading />
  }

  if (isError || !data) {
    return <ErrorScreen customMessage="Rental details not available" />
  }

  const {
    tenantFirstName,
    tenantLastName,
    tenantEmail,
    planName,
    startDate,
    paymentDetails,
    planRate,
  } = data
  const { payments, total: totalPayment } = paymentDetails

  const rentalDetailsLabelValues = [
    {
      label: 'Tenant Full Name',
      value: `${tenantFirstName} ${tenantLastName}`,
    },
    {
      label: 'Tenant Email',
      value: tenantEmail,
    },
    {
      label: 'Rental Plan Name',
      value: planName,
    },
    {
      label: 'Rental Plan Rate',
      value: planRate.toString(),
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
          {rentalDetailsLabelValues.map((detail, idx) => {
            return <LabelValuePair label={detail.label} value={detail.value} key={idx} />
          })}
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

export default OwnedRentalDetails
