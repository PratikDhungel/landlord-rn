import { Modal, Portal } from 'react-native-paper'
import { Image, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import LoadingButton from '@/components/button/LoadingButton'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'

import { useApiMutation } from '@/hooks/useApiMutation'
import useReactQueryClient from '@/hooks/useReactQueryClient'
import { approveRentalPayment } from '@/api/rentalPayments/approveRentalPayment'

import { BUTTON_TYPE } from '@/types/common'
import { TTransformedRentalPayment } from '@/types/rentalPayments'

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

  if (!paymentDetails) {
    return null
  }

  const { id, amount, paymentDateFull, proofOfPayment } = paymentDetails

  const isActionLoading = isApprovePaymentLoading

  async function onApproveRentalPayment() {
    try {
      await handleApprovePayment({ paymentId: id })
      handleInvalidateSingleQuery(['owned-rentals', rentalId])
      onDismissModal()
    } catch (e) {
      console.error('Error approving rental payment')
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

        <View style={{ flexDirection: 'row', gap: 8, padding: 4 }}>
          <FontAwesome
            size={12}
            name="exclamation-circle"
            color="#dc2626"
            style={{ marginTop: 2 }}
          />

          <Text style={{ fontSize: 12, maxWidth: '90%' }}>
            Please confirm the details before approving payment, approved payments cannot be
            reverted
          </Text>
        </View>

        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
          }}
        >
          <LoadingButton
            isLoading={isActionLoading}
            buttonLabel="Reject"
            loadingLabel="Rejecting"
            buttonType={BUTTON_TYPE.DANGER}
            onPress={() => {}}
          />

          <LoadingButton
            isLoading={isActionLoading}
            buttonLabel="Approve"
            loadingLabel="Approving"
            mode="contained"
            style={{ marginLeft: 'auto' }}
            onPress={onApproveRentalPayment}
          />
        </View>
      </Modal>
    </Portal>
  )
}

export default PaymentDetailsModal
