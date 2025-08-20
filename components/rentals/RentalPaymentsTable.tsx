import { StyleSheet, Text, View } from 'react-native'

import NoDataAvailable from '@/components/common/NoDataAvailable'
import StatusPill, { STATUS_PILL_TYPE } from '@/components/pills/StatusPill'

import { capitalize } from '@/utils/stringUtils'
import { getDateFromISOString } from '@/utils/dateUtils'

import { RENTAL_PAYMENT_STATUS, TRentalPayment } from '@/types/rentalPayments'

type TRentalPaymentWithStatusLabel = TRentalPayment & {
  statusLabel: string
  pillType: STATUS_PILL_TYPE
}

function getStatusPillType(status: RENTAL_PAYMENT_STATUS) {
  switch (status) {
    case RENTAL_PAYMENT_STATUS.APPROVED:
      return STATUS_PILL_TYPE.ACTIVE

    case RENTAL_PAYMENT_STATUS.REJECTED:
      return STATUS_PILL_TYPE.DANGER

    default:
      return STATUS_PILL_TYPE.NEUTRAL
  }
}

function prepareRentalPaymentsData(rentalPayments: TRentalPayment[]) {
  return rentalPayments.map(eachPayment => {
    const paymentStatusLabel = capitalize(eachPayment.status)
    const pillType = getStatusPillType(eachPayment.status)

    return { ...eachPayment, statusLabel: paymentStatusLabel, pillType }
  })
}

const RentalPaymentsTable = ({ rentalPayments }: { rentalPayments: TRentalPayment[] }) => {
  if (rentalPayments.length === 0) {
    return <NoDataAvailable />
  }

  const rentalPaymentsData = prepareRentalPaymentsData(rentalPayments)

  return (
    <View>
      <RentalPaymentsTableHeader />

      {rentalPaymentsData.map(eachPayment => {
        return <RentalPaymentsTableRow rentalPayment={eachPayment} key={eachPayment.id} />
      })}
    </View>
  )
}

const RentalPaymentsTableHeader = () => {
  return (
    <View style={styles.tableTitleContainer}>
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Amount</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Date</Text>

      <Text style={[styles.tableTitleText, { flexBasis: 80 }]}>Status</Text>
    </View>
  )
}

const RentalPaymentsTableRow = ({
  rentalPayment,
}: {
  rentalPayment: TRentalPaymentWithStatusLabel
}) => {
  const { amount, paymentDate, statusLabel, pillType } = rentalPayment

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }}>{amount}</Text>

      <Text style={{ flex: 1 }}>{getDateFromISOString(paymentDate)}</Text>

      <View style={{ flexBasis: 80 }}>
        <StatusPill statusLabel={statusLabel} pillType={pillType} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tableTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableTitleText: {
    color: '#808080',
  },
  tableRowContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
})

export default RentalPaymentsTable
