import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Avatar, Button } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { View, StyleSheet, Pressable } from 'react-native'

import useAuth from '@/hooks/useAuth'
import { useApiMutation } from '@/hooks/useApiMutation'
import { uploadUserProfilePicture } from '@/api/account/uploadProfilePicture'

type TImagePickerFileInfo = {
  uri: string
  name: string
  type: string
}

const imagePickerDefaultFileInfo: TImagePickerFileInfo = {
  uri: '',
  name: '',
  type: '',
}

const ProfilePictureUploader = () => {
  const [imageFileInfo, setImageFileInfo] = useState<TImagePickerFileInfo>(
    imagePickerDefaultFileInfo,
  )
  const { userInfo, setUserInfoOnLogin } = useAuth()

  const { mutateAsync, isLoading } = useApiMutation(uploadUserProfilePicture)

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0]

      const fileUrl = asset.uri
      const fileName = 'user-profile-pic'
      const fileType = asset.mimeType || 'image/jpeg'

      const fileInfo = {
        uri: fileUrl,
        name: fileName,
        type: fileType,
      }

      setImageFileInfo(fileInfo)
    }
  }

  function updateUserAvatarUrlInStore(newUrl: string) {
    const updatedUserInfo = { ...userInfo!, avatarUrl: newUrl }

    setUserInfoOnLogin(updatedUserInfo)
  }

  const handleUploadUserPhoto = async () => {
    const formData = new FormData()

    formData.append('file', imageFileInfo as any)

    try {
      const response = await mutateAsync(formData)

      const newAvatarUrl = response.avatarUrl

      updateUserAvatarUrlInStore(newAvatarUrl)

      setImageFileInfo(imagePickerDefaultFileInfo)
    } catch {
      console.error('Error uploading image')
    }
  }

  const avatarUrl = imageFileInfo.uri || userInfo!.avatarUrl

  return (
    <View style={styles.container}>
      <Pressable style={{ alignItems: 'center' }} onPress={pickImage}>
        <Avatar.Image
          size={120}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : () => <FontAwesome size={110} name="user" color="white" />
          }
        />
      </Pressable>

      <Button
        mode="text"
        style={styles.button}
        disabled={!imageFileInfo.name || isLoading}
        onPress={() => handleUploadUserPhoto()}
      >
        Upload Photo
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    marginTop: 10,
  },
})

export default ProfilePictureUploader
