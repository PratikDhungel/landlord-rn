import { Text, View } from 'react-native'

import ScreenWrapper from '@/components/common/ScreenWrapper'

export default function Home() {
  return (
    <ScreenWrapper>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
        <View
          style={{
            padding: 12,
            borderRadius: 20,
            backgroundColor: '#fff',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 12 }}>Total Rentals</Text>

          <View
            style={{
              borderWidth: 8,
              borderRadius: '50%',
              borderColor: '#007fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
            }}
          >
            <Text style={{ fontSize: 20 }}>50</Text>
          </View>
        </View>

        <View
          style={{
            padding: 12,
            borderRadius: 20,
            backgroundColor: '#fff',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 12 }}>Total Earnings</Text>

          <View
            style={{
              borderWidth: 8,
              borderRadius: '50%',
              borderColor: 'green',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
            }}
          >
            <Text style={{ fontSize: 16, maxWidth: 60 }} ellipsizeMode="tail" numberOfLines={1}>
              10000000
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}
