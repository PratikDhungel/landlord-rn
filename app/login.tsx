import { useState } from 'react'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { api } from '@/utils/axios'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'
import { setStorageItem } from '@/utils/storage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()

  async function handleUserLogin() {
    try {
      setIsLoading(true)
      const { data } = await api.post('/api/auth/login', {
        email,
        password,
      })
      setStorageItem('jwt_token', data.token)
      setStorageItem('refresh_token', data.refreshToken)
      setIsSuccess(true)
      router.replace('/(tabs)/plans')
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Landlord</Text>
        </View>

        <View style={styles.loginFormContainer}>
          <View style={styles.loginTitleContainer}>
            <Text style={styles.loginTitle}>Login</Text>
          </View>

          <LabelTextInput
            label="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <LabelTextInput
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          <LoadingButton
            buttonLabel="Login"
            loadingLabel="Logging In"
            successLabel="Logged In"
            isSuccess={isSuccess}
            isLoading={isLoading}
            mode="contained"
            style={{ marginTop: 24 }}
            onPress={handleUserLogin}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b2d8ff',
  },
  titleContainer: {
    paddingTop: 64,
    paddingVertical: 32,
  },
  appTitle: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginFormContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    fontSize: 24,
    paddingVertical: 32,
    paddingHorizontal: 18,
  },
  loginTitleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 32,
  },
})

export default Login
