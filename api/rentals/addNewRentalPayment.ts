import { api } from '@/utils/axios'

interface IAddNewRentalPaymentVariables {
  rental_id: string
  amount: number
  payment_date: string
}

export function addNewRentalPayment(addRentalPaymentVariables: IAddNewRentalPaymentVariables) {
  return api.post('/rentals/create-rental-payment', addRentalPaymentVariables)
}
