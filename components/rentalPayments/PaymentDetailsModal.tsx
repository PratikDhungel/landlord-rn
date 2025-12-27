import { Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { useLocalSearchParams } from 'expo-router'

import ProofOfPaymentFile from './ProofOfPaymentFile'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'
import PaymentDetailsModalAction from './PaymentDetailsModalAction'

import { useApiMutation } from '@/hooks/useApiMutation'
import useReactQueryClient from '@/hooks/useReactQueryClient'
import { rejectRentalPayment } from '@/api/rentalPayments/rejectRentalPayment'
import { approveRentalPayment } from '@/api/rentalPayments/approveRentalPayment'

import { RENTAL_TYPE } from '@/types/rentals'
import { TTransformedRentalPayment } from '@/types/rentalPayments'

interface IPaymentDetailsModalProps {
  visible: boolean
  onDismissModal: () => void
  paymentDetails?: TTransformedRentalPayment
}

const PaymentDetailsModal = (prop: IPaymentDetailsModalProps) => {
  const { visible, onDismissModal, paymentDetails } = prop
  const { id: rentalId, type: rentalType }: { id: string; type: RENTAL_TYPE } =
    useLocalSearchParams()
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  const { mutateAsync: handleApprovePayment, isLoading: isApprovePaymentLoading } =
    useApiMutation(approveRentalPayment)

  const { mutateAsync: handleRejectRentalPayment, isLoading: isRejectPaymentLoading } =
    useApiMutation(rejectRentalPayment)

  if (!paymentDetails) {
    return null
  }

  const { id, amount, status, paymentDateFull, proofOfPayment } = paymentDetails

  const isActionLoading = isApprovePaymentLoading || isRejectPaymentLoading

  async function onApproveRentalPayment() {
    try {
      await handleApprovePayment({ paymentId: id })
      handleInvalidateSingleQuery(['owned-rentals', rentalId])
      onDismissModal()
    } catch (e) {
      console.error('Error approving rental payment')
    }
  }

  async function onRejectRentalPayment() {
    try {
      await handleRejectRentalPayment({ paymentId: id })
      handleInvalidateSingleQuery(['owned-rentals', rentalId])
      onDismissModal()
    } catch (e) {
      console.error('Error rejecting rental payment')
    }
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismissModal}
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 12,
          width: '80%',
          marginHorizontal: 'auto',
        }}
      >
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Payment Details</Text>
        </View>

        <LabelValuePair label="Amount" value={amount} />

        <LabelValuePair label="Payment Date" value={paymentDateFull} />

        <ProofOfPaymentFile paymentId={id} filePath={proofOfPayment} />

        <PaymentDetailsModalAction
          rentalType={rentalType}
          paymentStatus={status}
          isActionLoading={isActionLoading}
          onApproveRentalPayment={onApproveRentalPayment}
          onRejectRentalPayment={onRejectRentalPayment}
        />
      </Modal>
    </Portal>
  )
}

export default PaymentDetailsModal
