import { use, createContext } from 'react'

interface IAuthContext {
  setAuthTokenOnLogin: (token: string) => void
  removeAuthTokenOnLogout: () => void
  token?: string | null
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({
  setAuthTokenOnLogin: () => null,
  removeAuthTokenOnLogout: () => null,
  token: null,
  isLoading: false,
})

export function useAuth() {
  const value = use(AuthContext)

  if (!value) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />')
  }

  return value
}

export default useAuth
