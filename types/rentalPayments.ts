export type TRentalPayment = {
  id: string
  rentalId: string
  payerId: string
  amount: number
  createdAt: string
  paymentDate: string
  proofOfPayment: string | null
}
