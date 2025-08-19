import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import Container from '@/components/common/Container'
import WithWrapper from '@/components/common/WithWrapper'

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
    <Container>
      <ProfilePictureUploader />

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default WithWrapper(Account)
