import { useRouter } from 'expo-router'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import BasicDataTable from '@/components/table/DataTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenLoading from '@/components/common/ScreenLoading'
import NoDataAvailable from '@/components/common/NoDataAvailable'

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
    return <NoDataAvailable />
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
