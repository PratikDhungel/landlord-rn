import { TRentalPayment } from './rentalPayments'

export type TRental = {
  id: string
  userId: number
  ownerFirstName: string
  ownerLastName: string
  ownerEmail: string
  tenantId: string
  tenantFirstName: string
  tenantLastName: string
  tenantEmail: string
  planId: string
  planName: string
  startDate: string
}

export type TRentalWithPayments = TRental & {
  paymentDetails: {
    total: number
    payments: TRentalPayment[]
  }
}
