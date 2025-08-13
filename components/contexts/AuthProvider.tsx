import { createContext, useEffect, type PropsWithChildren } from 'react'

import { useStorageState } from '@/hooks/useStorageState'
import { provideStateUpdateCallbackToInterceptor } from '@/utils/axios'

import { TUser } from '@/types/users'

interface IAuthContext {
  setAuthTokenOnLogin: (token: string) => void
  removeAuthTokenOnLogout: () => void
  setUserInfoInStore: (user: TUser) => void
  handleStateUpdateOnLogout: () => void
  userInfo: TUser | null
  token?: string | null
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
  setAuthTokenOnLogin: () => null,
  removeAuthTokenOnLogout: () => null,
  setUserInfoInStore: () => null,
  handleStateUpdateOnLogout: () => null,
  userInfo: null,
  token: null,
  isLoading: false,
})

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [[isTokenStateLoading, token], setToken] = useStorageState('jwt_token')
  const [[isUserStateLoading, userInfoInStorage], setUserInfoInStorage] = useStorageState('user')

  const userInfo = userInfoInStorage === null ? null : JSON.parse(userInfoInStorage)

  function setAuthTokenOnLogin(authToken: string) {
    setToken(authToken)
  }

  function removeAuthTokenOnLogout() {
    setToken(null)
  }

  function setUserInfoInStore(user: TUser) {
    const stringifiedUserInfo = JSON.stringify(user)
    setUserInfoInStorage(stringifiedUserInfo)
  }

  function handleStateUpdateOnLogout() {
    setToken(null)
    setUserInfoInStorage(null)
  }

  useEffect(() => {
    provideStateUpdateCallbackToInterceptor(handleStateUpdateOnLogout)
  }, [])

  const isLoading = isTokenStateLoading || isUserStateLoading

  return (
    <AuthContext
      value={{
        setAuthTokenOnLogin,
        removeAuthTokenOnLogout,
        setUserInfoInStore,
        handleStateUpdateOnLogout,
        userInfo,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  )
}

export default AuthProvider
