import RNFS from 'react-native-fs'
import * as FileSystem from 'expo-file-system'
import { ActivityIndicator } from 'react-native-paper'
import React, { PropsWithChildren, useState } from 'react'
import { Alert, Platform, Pressable, View } from 'react-native'

interface IDownloadFileButtonProps extends PropsWithChildren {
  fileUrl: string
  fileName: string
}

const DownloadFileButton = ({ fileUrl, fileName, children }: IDownloadFileButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)

      const downloadPath =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`

      // Define where to save
      const fileUri = FileSystem.documentDirectory + fileName

      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadPath,
      }).promise

      if (result.statusCode !== 200) {
        throw new Error('File download failed')
      } else {
        Alert.alert('Download Complete', `${fileName} successfully saved`)
      }

      // Download file
      //   const downloadResumable = FileSystem.createDownloadResumable(fileUrl, fileUri)
      //   const downloadedContent = await downloadResumable.downloadAsync()

      //   if (!downloadedContent) {
      //     throw 'Content Not Available'
      //   }

      //   const { uri } = downloadedContent!

      //   // Try opening or sharing
      //   if (await Sharing.isAvailableAsync()) {
      //     await Sharing.shareAsync(uri)
      //   } else {
      //     Alert.alert('Downloaded', `File saved to: ${uri}`)
      //   }
    } catch (error: any) {
      Alert.alert('Download failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ margin: 10 }}>
      {loading ? <ActivityIndicator /> : <Pressable onPress={handleDownload}>{children}</Pressable>}
    </View>
  )
}

export default DownloadFileButton
