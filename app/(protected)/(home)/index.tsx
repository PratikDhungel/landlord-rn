import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { isObjectEmpty } from '@/utils/objectUtils'

import { TFinancialSummary } from '@/types/users'
import MonthlyPaymentsBar from '@/components/dashboard/MonthlyPaymentsBar'

export default function Home() {
  const { data, isError, isLoading } = useApiQuery<TFinancialSummary>({
    queryKey: ['financialSummary'],
    url: '/users/financial-summary',
  })

  if (isLoading) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center' }}>
        <ActivityIndicator size="large" animating={true} />
      </ScreenWrapper>
    )
  }

  if (isError) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Something went wrong</Text>
      </ScreenWrapper>
    )
  }

  if (!data || isObjectEmpty(data)) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  const { ownedRentalCount, liableRentalCount, totalEarnings, totalExpenditure, paymentsByMonth } =
    data

  return (
    <ScrollView>
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
            <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Owned Rentals</Text>

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
              <Text style={{ fontSize: 20 }}>{ownedRentalCount}</Text>
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
            <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Total Earnings</Text>

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
                {totalEarnings}
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
            <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Liable Rentals</Text>

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
                {liableRentalCount}
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
            <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>
              Total Expenditure
            </Text>

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
                {totalExpenditure}
              </Text>
            </View>
          </View>
        </View>

        <MonthlyPaymentsBar monthlyEarnings={paymentsByMonth} />
      </ScreenWrapper>
    </ScrollView>
  )
}
