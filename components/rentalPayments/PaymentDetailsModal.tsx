import { Image, Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { useLocalSearchParams } from 'expo-router'

import LabelValuePair from '@/components/labelvalues/LabelValuePair'

import { useApiMutation } from '@/hooks/useApiMutation'
import useReactQueryClient from '@/hooks/useReactQueryClient'
import { rejectRentalPayment } from '@/api/rentalPayments/rejectRentalPayment'
import { approveRentalPayment } from '@/api/rentalPayments/approveRentalPayment'

import { TTransformedRentalPayment } from '@/types/rentalPayments'
import PaymentDetailsModalAction from './PaymentDetailsModalAction'

interface IPaymentDetailsModalProps {
  visible: boolean
  onDismissModal: () => void
  paymentDetails?: TTransformedRentalPayment
}

const PaymentDetailsModal = (prop: IPaymentDetailsModalProps) => {
  const { visible, onDismissModal, paymentDetails } = prop
  const { id: rentalId }: { id: string } = useLocalSearchParams()
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

        {proofOfPayment && (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: 600 }}>Proof of Payment</Text>

            <Image
              source={{ uri: proofOfPayment }}
              style={{ height: 240, width: '100%' }}
              resizeMode="contain"
            />
          </View>
        )}

        <PaymentDetailsModalAction
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
