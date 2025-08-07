export type TRentalPayment = {
  id: string
  rentalId: string
  payerId: string
  amount: number
  createdAt: string
  proofOfPayment: string | null
}
