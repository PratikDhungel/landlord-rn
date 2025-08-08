export type TUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type TUserLoginResponse = TUser & {
  token: string
  refreshToken: string
}

export type TFinancialSummary = {
  ownedRentalCount: number
  liableRentalCount: number
  totalEarnings: number
  totalExpenditure: number
}
