import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import useAuth from '@/hooks/useAuth'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'

import { useApiMutation } from '@/hooks/useApiMutation'
import { registerNewUser } from '@/api/auth/register'

const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const { mutateAsync, isLoading } = useApiMutation(registerNewUser)

  const router = useRouter()
  const { setAuthTokenOnLogin, setUserInfoInStore } = useAuth()

  async function handleRegisterNewUser() {
    try {
      const newUserPayload = { email, first_name: firstName, last_name: lastName, password }

      const userData = await mutateAsync(newUserPayload)

      setAuthTokenOnLogin(userData.token)

      const { token, refreshToken, ...userInfo } = userData
      setUserInfoInStore(userInfo)

      router.replace('/(protected)/(home)')
    } catch {
      console.error('Register User Error')
    }
  }

  function handleLoginRouteButtonPress() {
    router.push('/login')
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/images/icon.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.registerFormContainer}>
          <View style={styles.registerFormTitleContainer}>
            <Text style={styles.registerTitleText}>Welcome</Text>

            <Text>Register a new account</Text>
          </View>

          <View>
            <LabelTextInput
              label="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <LabelTextInput label="First Name" value={firstName} onChangeText={setFirstName} />

            <LabelTextInput label="Last Name" value={lastName} onChangeText={setLastName} />

            <LabelTextInput
              label="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />

            <LoadingButton
              buttonLabel="Register"
              loadingLabel="Registering"
              isLoading={isLoading}
              mode="contained"
              style={{ marginTop: 24 }}
              onPress={handleRegisterNewUser}
            />
          </View>

          <View style={styles.backToLoginButtonContainer}>
            <Button mode="text" onPress={handleLoginRouteButtonPress}>
              Already have an account?
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
  registerFormContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    marginTop: 240,
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  registerFormTitleContainer: {
    marginBottom: 24,
  },
  registerTitleText: {
    fontSize: 32,
    color: '#007fff',
  },
  backToLoginButtonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
})

export default CreateAccount
