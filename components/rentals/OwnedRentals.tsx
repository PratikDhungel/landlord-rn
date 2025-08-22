import { useRouter } from 'expo-router'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import BasicDataTable from '@/components/table/DataTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenLoading from '@/components/common/ScreenLoading'
import NoDataAvailable from '@/components/common/NoDataAvailable'

import useApiQuery from '@/hooks/useApiQuery'
import { getOwnedRentalsTableConfig } from './utils/ownedTableUtils'
import { transformRentalData } from './utils/dataUtils'

import { RENTAL_TYPE, TRental } from '@/types/rentals'

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
    return <NoDataAvailable />
  }

  function onRentalRowPress(rentalId: string) {
    router.push({
      pathname: '/rentals/[id]',
      params: {
        id: rentalId,
        type: RENTAL_TYPE.OWNED_RENTAL,
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
