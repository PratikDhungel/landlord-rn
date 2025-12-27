import { ActivityIndicator } from 'react-native-paper'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Image, StyleSheet, Text, View } from 'react-native'

import useApiQuery from '@/hooks/useApiQuery'

import { VALID_FILE_TYPE } from '@/types/common'
import { TProofOfPaymentDetails } from '@/types/rentalPayments'
import DownloadFileButton from '../common/DownloadButton'

const ProofOfPaymentFile = ({ paymentId, filePath }: { paymentId: string; filePath: string }) => {
  const { isLoading, data, isError } = useApiQuery<TProofOfPaymentDetails>({
    queryKey: ['owned-rentals', paymentId],
    url: `/payments/proof-of-payment/${filePath}`,
  })

  if (isLoading) {
    return (
      <View style={styles.loaderWrapper}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      </View>
    )
  }

  if (!data || isError) {
    return <></>
  }

  if (data.fileType === VALID_FILE_TYPE.JPEG) {
    return (
      <DownloadFileButton fileName="transaction-details." fileUrl={data.url}>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 600 }}>Proof of Payment</Text>

          <Image
            source={{ uri: data?.url }}
            style={{ height: 240, width: '100%' }}
            resizeMode="contain"
          />
        </View>
      </DownloadFileButton>
    )
  }

  if (data.fileType === VALID_FILE_TYPE.PDF) {
    return (
      <DownloadFileButton fileName="transaction-details.pdf" fileUrl={data.url}>
        <View style={styles.pdfBadge}>
          <FontAwesome5 name="file-pdf" size={18} />
          <Text style={styles.pdfText}>PDF</Text>
        </View>
      </DownloadFileButton>
    )
  }

  return <Text>PDF</Text>
}

const styles = StyleSheet.create({
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
  loaderWrapper: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 64,
    height: 64,
  },
})

export default ProofOfPaymentFile
