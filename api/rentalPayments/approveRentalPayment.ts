import { api } from '@/utils/axios'

interface IApproveRentalPaymentVariables {
  paymentId: string
}

export function approveRentalPayment(variables: IApproveRentalPaymentVariables) {
  const { paymentId } = variables

  return api.put(`/payments/${paymentId}/approve`)
}
