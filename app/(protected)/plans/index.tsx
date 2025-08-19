import PageTitle from '@/components/common/PageTitle'
import WithWrapper from '@/components/common/WithWrapper'
import BasicDataTable from '@/components/table/DataTable'
import ErrorScreen from '@/components/common/ErrorScreen'
import ScreenLoading from '@/components/common/ScreenLoading'
import NoDataAvailableScreen from '@/components/common/NoDataAvailable'

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
    return <NoDataAvailableScreen />
  }

  const tableConfig = getRentalPlanTableConfig()

  return (
    <>
      <PageTitle>Rental Plans</PageTitle>

      <BasicDataTable tableConfig={tableConfig} data={data} />
    </>
  )
}

export default WithWrapper(RentalPlans)
