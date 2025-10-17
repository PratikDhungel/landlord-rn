import { Button } from 'react-native-paper'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Image, StyleSheet, Text, View } from 'react-native'
import { PickedFile } from '@/types/common'

interface IFileUploadPreviewProps {
  file: PickedFile | null
  pickImage: () => void
  pickPDF: () => void
}

const FileUploadPreview = (prop: IFileUploadPreviewProps) => {
  const { file, pickImage, pickPDF } = prop

  if (!file) {
    return (
      <View style={styles.helperArea}>
        <Text style={styles.helperText}>Tap to pick an image. Long-press to pick a PDF.</Text>
        <Text style={styles.subtleText}>Supported: JPG, PNG, HEIC, PDF</Text>
      </View>
    )
  }

  const isSelectedFileImage = file.type.startsWith('image')

  return (
    <View style={styles.previewRow}>
      {isSelectedFileImage ? (
        <Image source={{ uri: file.uri }} style={styles.thumb} resizeMode="cover" />
      ) : (
        <View style={styles.pdfBadge}>
          <FontAwesome5 name="file-pdf" size={18} />
          <Text style={styles.pdfText}>PDF</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.fileName}>
          {file.name}
        </Text>
        <Text style={styles.fileMeta}>{file.type}</Text>
        <View style={styles.actionsRow}>
          <Button onPress={pickImage} mode="outlined" compact>
            Pick Image
          </Button>

          <Button onPress={pickPDF} mode="outlined" compact>
            Pick PDF
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  helperArea: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#edf6ff',
  },
  helperText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  subtleText: {
    fontSize: 12,
    color: '#777',
  },
  previewRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  pdfBadge: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff7f7',
  },
  pdfText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  fileMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  smallBtnPressed: {
    backgroundColor: '#f5f5f5',
  },
  smallBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
})

export default FileUploadPreview
