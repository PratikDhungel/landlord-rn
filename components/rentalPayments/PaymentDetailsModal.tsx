import { Modal, Portal } from 'react-native-paper'
import { Image, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import LoadingButton from '@/components/button/LoadingButton'
import LabelValuePair from '@/components/labelvalues/LabelValuePair'
// import LoadingButton from '@/components/button/LoadingButton'

// import { useApiMutation } from '@/hooks/useApiMutation'
// import useReactQueryClient from '@/hooks/useReactQueryClient'

import { BUTTON_TYPE } from '@/types/common'
import { TTransformedRentalPayment } from '@/types/rentalPayments'

interface IPaymentDetailsModalProps {
  visible: boolean
  onDismissModal: () => void
  paymentDetails?: TTransformedRentalPayment
}

const PaymentDetailsModal = (prop: IPaymentDetailsModalProps) => {
  const { visible, onDismissModal, paymentDetails } = prop

  if (!paymentDetails) {
    return null
  }

  const { amount, paymentDateFull, proofOfPayment } = paymentDetails

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
            isLoading={false}
            buttonLabel="Reject"
            loadingLabel="Rejecting"
            buttonType={BUTTON_TYPE.DANGER}
            onPress={() => {}}
          />

          <LoadingButton
            isLoading={false}
            buttonLabel="Approve"
            loadingLabel="Approving"
            mode="contained"
            style={{ marginLeft: 'auto' }}
            onPress={() => {}}
          />
        </View>
      </Modal>
    </Portal>
  )
}

export default PaymentDetailsModal
