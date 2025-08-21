import { STATUS_PILL_TYPE } from './common'

export enum RENTAL_PAYMENT_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type TRentalPayment = {
  id: string
  rentalId: string
  payerId: string
  amount: number
  createdAt: string
  paymentDate: string
  proofOfPayment: string | null
  status: RENTAL_PAYMENT_STATUS
}

export type TTransformedRentalPayments = TRentalPayment & {
  statusLabel: string
  pillType: STATUS_PILL_TYPE
}
