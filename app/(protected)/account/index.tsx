import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useAuth from '@/hooks/useAuth'
import ProfilePictureUploader from '@/components/profile/ProfilePictureUploader'

const Account = () => {
  const { handleStateUpdateOnLogout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    handleStateUpdateOnLogout()
    router.replace('/login')
  }

  return (
    <ScreenWrapper>
      <Container>
        <ProfilePictureUploader />

        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </Container>
    </ScreenWrapper>
  )
}

export default Account
