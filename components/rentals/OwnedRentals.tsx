import { Text } from 'react-native'
import { useRouter } from 'expo-router'

import PageTitle from '@/components/common/PageTitle'
import WithWrapper from '@/components/common/WithWrapper'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import ScreenLoading from '@/components/common/ScreenLoading'

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
    return <ScreenLoading />
  }

  if (isError) {
    return <ErrorScreen />
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
    <>
      <PageTitle>Owned Rentals</PageTitle>

      <BasicDataTable tableConfig={ownedRentalTableConfig} data={ownedRentalTableData} />
    </>
  )
}

export default WithWrapper(OwnedRentals)
