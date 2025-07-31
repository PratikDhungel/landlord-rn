import { useEffect, type PropsWithChildren } from 'react'

import { AuthContext } from '@/hooks/useAuth'
import { useStorageState } from '@/hooks/useStorageState'
import { provideStateUpdateCallbackToInterceptor } from '@/utils/axios'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, token], setToken] = useStorageState('jwt_token')

  function setAuthTokenOnLogin(authToken: string) {
    setToken(authToken)
  }

  function removeAuthTokenOnLogout() {
    setToken(null)
  }

  useEffect(() => {
    provideStateUpdateCallbackToInterceptor(removeAuthTokenOnLogout)
  }, [])

  return (
    <AuthContext
      value={{
        setAuthTokenOnLogin,
        removeAuthTokenOnLogout,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  )
}

export default AuthProvider
