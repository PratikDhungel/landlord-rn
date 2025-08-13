import { api } from '@/utils/axios'

import { TUserLoginResponse } from '@/types/users'

interface INewUserVariables {
  email: string
  first_name: string
  last_name: string
  password: string
}

export async function registerNewUser(newUserVariables: INewUserVariables) {
  const response = await api.post('/auth/register', newUserVariables)

  const userInfo = response.data as TUserLoginResponse

  return userInfo
}
