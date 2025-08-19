import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import BasicDataTable from '@/components/table/DataTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import WithWrapper from '@/components/common/WithWrapper'
import ScreenLoading from '@/components/common/ScreenLoading'
import NoDataAvailable from '@/components/common/NoDataAvailable'

import useApiQuery from '@/hooks/useApiQuery'
import { getRentalPlanTableConfig } from '@/components/rentalPlans/rentalPlanTableUtils'

import { TRentalPlan } from '@/types/rentalPlan'

const RentalPlans = () => {
  const { data, isError, isLoading } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })

  if (isLoading) {
    return <ScreenLoading />
  }

  if (isError) {
    return <ErrorScreen />
  }

  if (!data || data.length === 0) {
    return <NoDataAvailable />
  }

  const tableConfig = getRentalPlanTableConfig()

  return (
    <Container>
      <PageTitle>Rental Plans</PageTitle>

      <BasicDataTable tableConfig={tableConfig} data={data} />
    </Container>
  )
}

export default WithWrapper(RentalPlans)
