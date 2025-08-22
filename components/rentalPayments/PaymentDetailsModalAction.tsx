import { Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import LoadingButton from '@/components/button/LoadingButton'

import { BUTTON_TYPE } from '@/types/common'
import { RENTAL_TYPE } from '@/types/rentals'
import { RENTAL_PAYMENT_STATUS } from '@/types/rentalPayments'

interface IPaymentDetailsModalProps {
  rentalType: RENTAL_TYPE
  paymentStatus: RENTAL_PAYMENT_STATUS
  isActionLoading: boolean
  onRejectRentalPayment: () => void
  onApproveRentalPayment: () => void
}

const PaymentDetailsModalAction = (props: IPaymentDetailsModalProps) => {
  const {
    rentalType,
    paymentStatus,
    isActionLoading,
    onRejectRentalPayment,
    onApproveRentalPayment,
  } = props

  const isPaymentApproved = paymentStatus === RENTAL_PAYMENT_STATUS.APPROVED
  const isPaymentRejected = paymentStatus === RENTAL_PAYMENT_STATUS.REJECTED
  const isRentalTypeLiable = rentalType === RENTAL_TYPE.LIABLE_RENTAL

  if (isPaymentApproved || isRentalTypeLiable) {
    return <></>
  }

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 8, padding: 4 }}>
        <FontAwesome size={12} name="exclamation-circle" color="#dc2626" style={{ marginTop: 2 }} />

        <Text style={{ fontSize: 12, maxWidth: '90%' }}>
          Please confirm the details before approving payment, approved payments cannot be reverted.
        </Text>
      </View>

      <View
        style={{
          marginVertical: 8,
          flexDirection: 'row',
        }}
      >
        {!isPaymentRejected && (
          <LoadingButton
            isLoading={isActionLoading}
            buttonLabel="Reject"
            buttonType={BUTTON_TYPE.DANGER}
            onPress={onRejectRentalPayment}
          />
        )}

        <LoadingButton
          isLoading={isActionLoading}
          buttonLabel="Approve"
          mode="contained"
          style={{ marginLeft: 'auto' }}
          onPress={onApproveRentalPayment}
        />
      </View>
    </>
  )
}

export default PaymentDetailsModalAction
