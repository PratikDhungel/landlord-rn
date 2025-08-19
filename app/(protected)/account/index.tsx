import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import useAuth from '@/hooks/useAuth'
import WithWrapper from '@/components/common/WithWrapper'
import ProfilePictureUploader from '@/components/profile/ProfilePictureUploader'

const Account = () => {
  const { handleStateUpdateOnLogout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    handleStateUpdateOnLogout()
    router.replace('/login')
  }

  return (
    <>
      <ProfilePictureUploader />

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </>
  )
}

export default WithWrapper(Account)
