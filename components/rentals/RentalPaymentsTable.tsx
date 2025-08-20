import { StyleSheet, Text, View } from 'react-native'

import { TRentalPayment } from '@/types/rentalPayments'
import { getDateFromISOString } from '@/utils/dateUtils'
import NoDataAvailable from '@/components/common/NoDataAvailable'
import StatusPill from '@/components/pills/StatusPill'

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
      <Text style={[styles.tableTitleText, { flex: 1 }]}>Amount</Text>

      <Text style={[styles.tableTitleText, { flex: 1 }]}>Date</Text>

      <Text style={[styles.tableTitleText, { flexBasis: 80, textAlign: 'center' }]}>Status</Text>
    </View>
  )
}

const RentalPaymentsTableRow = ({ rentalPayment }: { rentalPayment: TRentalPayment }) => {
  const { amount, paymentDate } = rentalPayment

  return (
    <View style={styles.tableRowContainer}>
      <Text style={{ flex: 1 }}>{amount}</Text>

      <Text style={{ flex: 1 }}>{getDateFromISOString(paymentDate)}</Text>

      <View style={{ flexBasis: 80 }}>
        <StatusPill />
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
