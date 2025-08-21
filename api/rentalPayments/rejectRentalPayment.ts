import { api } from '@/utils/axios'

interface IRejectRentalPaymentVariables {
  paymentId: string
}

export function rejectRentalPayment(variables: IRejectRentalPaymentVariables) {
  const { paymentId } = variables

  return api.put(`/payments/${paymentId}/reject`)
}
