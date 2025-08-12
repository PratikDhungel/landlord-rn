import { api } from '@/utils/axios'

interface ICreateNewPlanVariables {
  name: string
  rate: string
  rate_period: string
}

export function handleCreateNewRentalPlan(variables: ICreateNewPlanVariables) {
  return api.post('/rentals/create-rental-plan', variables)
}
