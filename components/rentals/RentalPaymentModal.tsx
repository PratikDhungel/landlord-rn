import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import LoadingButton from '@/components/button/LoadingButton'
import LabelTextInput from '@/components/input/LabelTextInput'

import { api } from '@/utils/axios'
import useReactQueryClient from '@/hooks/useReactQueryClient'

interface IRentalPaymentModalProps {
  rentalId: string
  visible: boolean
  onDismissModal: () => void
}

const currentDate = new Date()

const RentalPaymentModal = ({ rentalId, visible, onDismissModal }: IRentalPaymentModalProps) => {
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  const [paymentAmount, setPaymentAmount] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [paymentDate, setPaymentDate] = useState(currentDate)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function handleOpenDatePicker() {
    setShowDatePicker(true)
  }

  function handlePaymentDateSelection(
    datePickerEvent: DateTimePickerEvent,
    date: Date | undefined,
  ) {
    const { type } = datePickerEvent

    if (type === 'set' && date) {
      setPaymentDate(date)
    }

    if (type === 'dismissed') {
      setPaymentDate(currentDate)
    }

    setShowDatePicker(false)
  }

  async function handleAddNewPayment() {
    setIsLoading(true)

    try {
      const parsedPaymentAmount = parseFloat(paymentAmount)

      await api.post('/rentals/create-rental-payment', {
        rental_id: rentalId,
        amount: parsedPaymentAmount,
        payment_date: paymentDate,
      })
      setIsSuccess(true)
      handleInvalidateSingleQuery(['liable-rentals', rentalId])
    } catch {
      console.error('Error adding new payment')
    } finally {
      setIsLoading(false)
      onDismissModal()
    }
  }

  const paymentDateString = paymentDate.toISOString().split('T')[0]

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismissModal}
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 20,
          width: '80%',
          marginHorizontal: 'auto',
        }}
      >
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Add New Payment</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <LabelTextInput
            label="Amount"
            mode="outlined"
            value={paymentAmount}
            onChangeText={setPaymentAmount}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Pressable onPress={handleOpenDatePicker}>
            <LabelTextInput
              mode="outlined"
              label="Start Date"
              value={paymentDateString}
              disabled
              outlineStyle={{ borderColor: '#444444' }}
              textColor="#444444"
            />
          </Pressable>

          {showDatePicker && (
            <Portal>
              <RNDateTimePicker
                value={paymentDate}
                onChange={handlePaymentDateSelection}
                maximumDate={currentDate}
              />
            </Portal>
          )}
        </View>

        <View>
          <LoadingButton
            buttonLabel="Pay"
            loadingLabel="Paying"
            successLabel="Payed"
            isSuccess={isSuccess}
            isLoading={isLoading}
            mode="contained"
            onPress={handleAddNewPayment}
          />
        </View>
      </Modal>
    </Portal>
  )
}

export default RentalPaymentModal
