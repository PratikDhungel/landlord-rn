import { api } from '@/utils/axios'

interface IRejectRentalPaymentVariables {
  paymentId: string
  rejectionReason: string
}

export function rejectRentalPayment(variables: IRejectRentalPaymentVariables) {
  const { paymentId, rejectionReason } = variables

  return api.put(`/payments/${paymentId}/reject`, { rejection_reason: rejectionReason })
}
