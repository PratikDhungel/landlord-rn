import { useState } from 'react'
import { Portal } from 'react-native-paper'
import { Pressable, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import Container from '@/components/common/Container'
import { useApiMutation } from '@/hooks/useApiMutation'
import WithWrapper from '@/components/common/WithWrapper'
import LoadingButton from '@/components/button/LoadingButton'
import useReactQueryClient from '@/hooks/useReactQueryClient'
import LabelTextInput from '@/components/input/LabelTextInput'
import FileUploader from '@/components/fileUpload/FileUpload'

import { getDateFromISOString } from '@/utils/dateUtils'
import { addNewRentalPayment } from '@/api/rentals/addNewRentalPayment'

import { PickedFile } from '@/types/common'

const currentDate = new Date()

type TSearchParams = {
  id: string
  planRate: string
}

const NewPayment = () => {
  const { id: rentalId, planRate: defaultAmount } = useLocalSearchParams<TSearchParams>()
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  const [paymentAmount, setPaymentAmount] = useState(defaultAmount)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [paymentDate, setPaymentDate] = useState(currentDate)
  const [proofOfPayment, setProofOfPayment] = useState<PickedFile | null>(null)

  const paymentDateISO = paymentDate.toISOString()

  const { mutateAsync, isLoading } = useApiMutation(addNewRentalPayment)

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

  function resetFormValuesToDefault() {
    setPaymentAmount(defaultAmount)
    setPaymentDate(currentDate)
  }

  async function handleAddNewPayment() {
    const parsedPaymentAmount = parseFloat(paymentAmount)

    try {
      const newPaymentVariables = {
        rental_id: rentalId,
        amount: parsedPaymentAmount,
        payment_date: paymentDateISO,
        file: proofOfPayment!,
      }

      await mutateAsync(newPaymentVariables)

      handleInvalidateSingleQuery(['liable-rentals', rentalId])
    } catch {
      console.error('Error adding new payment')
    } finally {
      resetFormValuesToDefault()
    }
  }

  async function onFileSelected(file: PickedFile) {
    setProofOfPayment(file)
  }

  const paymentDateString = getDateFromISOString(paymentDateISO)

  return (
    <Container>
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
            label="Payment Date"
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
        <FileUploader onSelected={onFileSelected} />
      </View>

      <View>
        <LoadingButton
          buttonLabel="Add Payment"
          isLoading={isLoading}
          mode="contained"
          onPress={handleAddNewPayment}
        />
      </View>
    </Container>
  )
}

export default WithWrapper(NewPayment)
