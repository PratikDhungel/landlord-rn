import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import FileUploadPreview from './FileUploadPreview'

import { PickedFile } from '@/types/common'

type Props = {
  label?: string
  onSelected?: (file: PickedFile) => void
  onError?: (err: unknown) => void
}

const FileUploader = ({ label = 'Upload an image or PDF', onSelected, onError }: Props) => {
  const [file, setFile] = useState<PickedFile | null>(null)

  async function pickImage() {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!perm.granted) {
        throw new Error('Media library permission not granted')
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        base64: false,
        quality: 1,
      })

      if (!result.canceled) {
        const asset = result.assets[0]
        const picked: PickedFile = {
          uri: asset.uri,
          name: asset.fileName || 'image.jpg',
          type: asset.type || 'image/jpeg',
        }
        setFile(picked)
        onSelected?.(picked)
      }
    } catch (e) {
      onError?.(e)
    }
  }

  async function pickPDF() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        multiple: false,
        copyToCacheDirectory: true,
      })

      if (!result.canceled) {
        const asset = result.assets[0]

        const picked: PickedFile = {
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/pdf',
        }
        setFile(picked)
        onSelected?.(picked)
      }
    } catch (e) {
      onError?.(e)
    }
  }

  async function openPickerActionSheet() {
    await pickImage()
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={openPickerActionSheet}
        onLongPress={pickPDF}
        style={({ pressed }) => [
          styles.dropzone,
          pressed && { opacity: 0.85, transform: [{ scale: 0.995 }] },
        ]}
      >
        <View style={styles.headerRow}>
          <FontAwesome5 name="cloud-upload-alt" size={20} />
          <Text style={styles.headerText}>{label}</Text>
        </View>

        <FileUploadPreview file={file} pickImage={pickImage} pickPDF={pickPDF} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 16,
  },
  dropzone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default FileUploader
