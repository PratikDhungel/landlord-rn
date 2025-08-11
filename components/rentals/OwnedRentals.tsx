import { Text } from 'react-native'
import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'

import { TRental } from '@/types/rentals'
import BasicDataTable from '../table/DataTable'
import { getOwnedRentalsTableConfig } from './utils/ownedTableUtils'
import { transformRentalData } from './utils/dataUtils'

const OwnedRentals = () => {
  const {
    data = [],
    isError,
    isLoading,
  } = useApiQuery<TRental[]>({
    queryKey: ['owned-rentals'],
    url: '/rentals/owned-rentals',
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
        type: 'owned-rental',
      },
    })
  }

  const ownedRentalTableConfig = getOwnedRentalsTableConfig(onRentalRowPress)
  const ownedRentalTableData = transformRentalData(data)

  return (
    <Container>
      <PageTitle>Owned Rentals</PageTitle>

      <BasicDataTable tableConfig={ownedRentalTableConfig} data={ownedRentalTableData} />
    </Container>
  )
}

export default OwnedRentals
