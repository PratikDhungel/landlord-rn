import { api } from '@/utils/axios'

interface ICreateNewRentalVariables {
  tenant_id: string
  plan_id: string
  start_date: string
}

export function addNewRental(createRentalVariables: ICreateNewRentalVariables) {
  return api.post('/rentals/create-rental', createRentalVariables)
}
