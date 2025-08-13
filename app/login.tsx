import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import { api } from '@/utils/axios'
import useAuth from '@/hooks/useAuth'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'

import { TUserLoginResponse } from '@/types/users'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()
  const { setAuthTokenOnLogin, setUserInfoInStore } = useAuth()

  async function handleUserLogin() {
    try {
      setIsLoading(true)

      const { data }: { data: TUserLoginResponse } = await api.post('/auth/login', {
        email,
        password,
      })

      // TODO Add refresh token to state
      setAuthTokenOnLogin(data.token)

      const { token, refreshToken, ...userInfo } = data

      setUserInfoInStore(userInfo)
      setIsSuccess(true)
      router.replace('/(protected)/(home)')
      // TODO Add a toast on error
    } catch {
      console.error('Login Error')
    } finally {
      setIsLoading(false)
    }
  }

  function handleForgotPasswordClick() {
    router.push('/forgot-password')
  }

  function handleCreateAccountClick() {
    router.push('/create-account')
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/images/icon.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.loginFormContainer}>
          <View style={styles.loginTitleContainer}>
            <Text style={styles.loginTitle}>Welcome back</Text>

            <Text>Login to your account</Text>
          </View>

          <View>
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

            <Button
              mode="text"
              style={styles.forgotPasswordButton}
              onPress={handleForgotPasswordClick}
            >
              Forgot Password?
            </Button>

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

            <Text style={styles.actionButtonSeparatorText}>Or</Text>

            <Button mode="contained" onPress={handleCreateAccountClick}>
              Create Account
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loginFormContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    marginTop: 240,
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  loginTitleContainer: {
    marginBottom: 24,
  },
  loginTitle: {
    fontSize: 32,
    color: '#007fff',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginLeft: -12,
  },
  actionButtonSeparatorText: {
    fontSize: 16,
    paddingVertical: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

export default Login
