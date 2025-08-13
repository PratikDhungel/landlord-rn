import { Stack } from 'expo-router'

import useAuth from '@/hooks/useAuth'
import FullPageLoader from '../loaders/FullPageLoader'

const AuthNavigation = () => {
  const { isLoading, token } = useAuth()

  if (isLoading) {
    return <FullPageLoader />
  }

  return (
    <Stack>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!token}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password' }} />
        <Stack.Screen name="create-account" options={{ title: 'Create Account' }} />
      </Stack.Protected>
    </Stack>
  )
}

export default AuthNavigation
