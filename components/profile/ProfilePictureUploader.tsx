import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import * as ImagePicker from 'expo-image-picker'

const ProfilePictureUploader = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

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
      const fileUrl = result.assets[0].uri
      setImageUrl(fileUrl)
    }
  }

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={120}
        style={{ justifyContent: 'center' }}
        source={
          imageUrl
            ? { uri: imageUrl }
            : () => (
                <View style={{ alignItems: 'center' }}>
                  <FontAwesome size={110} name="user" color="white" />
                </View>
              )
        }
      />

      <Button mode="text" style={styles.button} onPress={pickImage}>
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
