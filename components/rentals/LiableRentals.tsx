import { Text } from 'react-native'
import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import BasicDataTable from '@/components/table/DataTable'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { transformRentalData } from './utils/dataUtils'
import { getLiableRentalsTableConfig } from './utils/liableTableUtils'

import { TRental } from '@/types/rentals'

const LiableRentals = () => {
  const {
    data = [],
    isError,
    isLoading,
  } = useApiQuery<TRental[]>({
    queryKey: ['liable-rentals'],
    url: '/rentals/liable-rentals',
  })

  const router = useRouter()

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

  if (data.length === 0) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  function onRentalRowPress(rentalId: string) {
    router.push({
      pathname: '/rentals/[id]',
      params: {
        id: rentalId,
        type: 'liable-rental',
      },
    })
  }

  const liableRentalTableConfig = getLiableRentalsTableConfig(onRentalRowPress)
  const liableTableData = transformRentalData(data)

  return (
    <Container>
      <PageTitle>Liable Rentals</PageTitle>

      <BasicDataTable tableConfig={liableRentalTableConfig} data={liableTableData} />
    </Container>
  )
}

export default LiableRentals
