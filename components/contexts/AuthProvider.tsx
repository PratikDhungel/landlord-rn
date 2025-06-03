import { type PropsWithChildren } from 'react'

import { AuthContext } from '@/hooks/useAuth'
import { useStorageState } from '@/hooks/useStorageState'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, token], setToken] = useStorageState('jwt_token')

  function setAuthTokenOnLogin(authToken: string) {
    console.log('setAuthTokenOnLogin', authToken)
    setToken(authToken)
  }

  function removeAuthTokenOnLogout() {
    setToken(null)
  }

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
