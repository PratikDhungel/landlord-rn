import { useState } from 'react'
import { Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import LoadingButton from '@/components/button/LoadingButton'
import LabelTextInput from '@/components/input/LabelTextInput'

import { BUTTON_TYPE } from '@/types/common'
import { RENTAL_TYPE } from '@/types/rentals'
import { RENTAL_PAYMENT_STATUS } from '@/types/rentalPayments'

interface IPaymentDetailsModalProps {
  rentalType: RENTAL_TYPE
  paymentStatus: RENTAL_PAYMENT_STATUS
  isActionLoading: boolean
  onRejectRentalPayment: (rejectionReason: string) => void
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

  const [showRejectionReason, setShowRejectionReason] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const isPaymentApproved = paymentStatus === RENTAL_PAYMENT_STATUS.APPROVED
  const isPaymentRejected = paymentStatus === RENTAL_PAYMENT_STATUS.REJECTED
  const isRentalTypeLiable = rentalType === RENTAL_TYPE.LIABLE_RENTAL

  if (isPaymentApproved || isRentalTypeLiable) {
    return <></>
  }

  const trimmedRejectionReason = rejectionReason.trim()

  function onCancelRejection() {
    setShowRejectionReason(false)
    setRejectionReason('')
  }

  function onConfirmRejection() {
    if (!trimmedRejectionReason) {
      return
    }

    onRejectRentalPayment(trimmedRejectionReason)
  }

  if (showRejectionReason) {
    return (
      <View style={{ marginTop: 12 }}>
        <LabelTextInput
          label="Reason for rejection"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={rejectionReason}
          placeholder="Reject Reason"
          onChangeText={setRejectionReason}
        />

        <View style={{ flexDirection: 'row' }}>
          <LoadingButton
            isLoading={false}
            buttonLabel="Cancel"
            disabled={isActionLoading}
            onPress={onCancelRejection}
          />

          <LoadingButton
            isLoading={isActionLoading}
            buttonLabel="Confirm Rejection"
            loadingLabel="Rejecting"
            mode="contained"
            buttonType={BUTTON_TYPE.DANGER}
            disabled={!trimmedRejectionReason}
            style={{ marginLeft: 'auto' }}
            onPress={onConfirmRejection}
          />
        </View>
      </View>
    )
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
            onPress={() => setShowRejectionReason(true)}
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
