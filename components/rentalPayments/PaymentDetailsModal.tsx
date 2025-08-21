import { Modal, Portal } from 'react-native-paper'
import { Image, Text, View } from 'react-native'

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

        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            onPress={() => {}}
          />
        </View>
      </Modal>
    </Portal>
  )
}

export default PaymentDetailsModal
