import { StyleSheet, Text, View } from 'react-native'

import { TRentalPayment } from '@/types/rentalPayments'
import { getDateFromISOString } from '@/utils/dateUtils'
import NoDataAvailable from '../common/NoDataAvailable'

const RentalPaymentsTable = ({ rentalPayments }: { rentalPayments: TRentalPayment[] }) => {
  if (rentalPayments.length === 0) {
    return <NoDataAvailable />
  }

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
  const { amount, paymentDate, proofOfPayment } = rentalPayment

  const proofOfPaymentLabel = proofOfPayment ?? 'N/A'

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }}>{amount}</Text>

      <Text style={{ flex: 1 }}>{getDateFromISOString(paymentDate)}</Text>

      <Text style={{ flex: 1 }}>{proofOfPaymentLabel}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default RentalPaymentsTable
