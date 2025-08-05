import { Text, View } from 'react-native'

import ScreenWrapper from '@/components/common/ScreenWrapper'

export default function Home() {
  return (
    <ScreenWrapper>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 12, marginBottom: 12 }}>
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
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>Total Rentals</Text>

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
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>Total Earnings</Text>

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
              50758
            </Text>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 12, marginBottom: 12 }}>
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
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>Owned Rentals</Text>

          <View
            style={{
              borderWidth: 8,
              borderRadius: '50%',
              borderColor: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
            }}
          >
            <Text style={{ fontSize: 16, maxWidth: 60 }} ellipsizeMode="tail" numberOfLines={1}>
              4
            </Text>
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
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>Total Expenditure</Text>

          <View
            style={{
              borderWidth: 8,
              borderRadius: '50%',
              borderColor: 'red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
            }}
          >
            <Text style={{ fontSize: 16, maxWidth: 60 }} ellipsizeMode="tail" numberOfLines={1}>
              10973
            </Text>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: 12, marginBottom: 12 }}>
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
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 500 }}>Earnings by month</Text>

          <View
            style={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 24 }}>Show bar graphs here</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}
