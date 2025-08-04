import { use } from 'react'
import { AuthContext } from '@/components/contexts/AuthProvider'

export function useAuth() {
  const value = use(AuthContext)

  if (!value) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />')
  }

  return value
}

export default useAuth
