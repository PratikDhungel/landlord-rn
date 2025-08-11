import { Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import PageTitle from '@/components/common/PageTitle'
import Container from '@/components/common/Container'
import BasicDataTable from '@/components/table/DataTable'
import ScreenWrapper from '@/components/common/ScreenWrapper'

import useApiQuery from '@/hooks/useApiQuery'
import { getRentalPlanTableConfig } from '@/components/rentalPlans/constants'

import { TRentalPlan } from '@/types/rentalPlan'

const RentalPlans = () => {
  const { data, isError, isLoading } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
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

  if (!data || data.length === 0) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  const tableConfig = getRentalPlanTableConfig()

  return (
    <ScreenWrapper>
      <Container>
        <PageTitle>Rental Plans</PageTitle>

        <BasicDataTable tableConfig={tableConfig} data={data} />
      </Container>
    </ScreenWrapper>
  )
}

export default RentalPlans
