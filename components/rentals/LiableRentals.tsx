import { Text } from 'react-native'
import { useRouter } from 'expo-router'

import PageTitle from '@/components/common/PageTitle'
import WithWrapper from '@/components/common/WithWrapper'
import BasicDataTable from '@/components/table/DataTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import ScreenLoading from '@/components/common/ScreenLoading'

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
        type: 'liable-rental',
      },
    })
  }

  const liableRentalTableConfig = getLiableRentalsTableConfig(onRentalRowPress)
  const liableTableData = transformRentalData(data)

  return (
    <>
      <PageTitle>Liable Rentals</PageTitle>

      <BasicDataTable tableConfig={liableRentalTableConfig} data={liableTableData} />
    </>
  )
}

export default WithWrapper(LiableRentals)
