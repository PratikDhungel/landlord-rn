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
  proofOfPayment: string
  status: RENTAL_PAYMENT_STATUS
}

export type TTransformedRentalPayment = TRentalPayment & {
  statusLabel: string
  paymentDateFull: string
  pillType: STATUS_PILL_TYPE
}

export type TProofOfPaymentDetails = {
  url: string
  fileType: string
}
