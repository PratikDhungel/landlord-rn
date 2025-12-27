import { api } from '@/utils/axios'

import { PickedFile } from '@/types/common'

interface IAddNewRentalPaymentVariables {
  rental_id: string
  amount: number
  payment_date: string
  file: PickedFile
}

export function addNewRentalPayment(addRentalPaymentVariables: IAddNewRentalPaymentVariables) {
  const { rental_id, amount, payment_date, file } = addRentalPaymentVariables

  const newPaymentFormData = new FormData()

  const payload = {
    rental_id,
    amount,
    payment_date,
  }

  newPaymentFormData.append('data', JSON.stringify(payload))
  newPaymentFormData.append('file', file as any)

  return api.post('/rentals/create-rental-payment', newPaymentFormData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
}
