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
  planRate: number
  startDate: string
}

export type TRentalWithPayments = TRental & {
  paymentDetails: {
    total: number
    payments: TRentalPayment[]
  }
}

export enum RentalTypes {
  OWNED_RENTAL = 'owned-rental',
  LIABLE_RENTAL = 'liable-rental',
}
