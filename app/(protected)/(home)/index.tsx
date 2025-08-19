import { ScrollView, Text } from 'react-native'

import ErrorScreen from '@/components/common/ErrorScreen'
import WithWrapper from '@/components/common/WithWrapper'
import ScreenLoading from '@/components/common/ScreenLoading'
import NoDataAvailable from '@/components/common/NoDataAvailable'
import {
  DashboardStatsContainer,
  DashboardStatsSectionWrapper,
} from '@/components/dashboard/DashboardContentWrappers'
import {
  CircularStatsVisualization,
  DashboardVisualizationTitle,
} from '@/components/dashboard/DashboardVisualizations'

import useApiQuery from '@/hooks/useApiQuery'
import { isObjectEmpty } from '@/utils/objectUtils'

import { TFinancialSummary } from '@/types/users'
import MonthlyPaymentsBar from '@/components/dashboard/MonthlyPaymentsBar'
import { VisualizationType } from '@/types/dashboard'

const Home = () => {
  const { data, isError, isLoading } = useApiQuery<TFinancialSummary>({
    queryKey: ['financialSummary'],
    url: '/users/financial-summary',
  })

  if (isLoading) {
    return <ScreenLoading />
  }

  if (isError) {
    return <ErrorScreen />
  }

  if (!data || isObjectEmpty(data)) {
    return <NoDataAvailable />
  }

  const { ownedRentalCount, liableRentalCount, totalEarnings, totalExpenditure, paymentsByMonth } =
    data

  return (
    <ScrollView>
      <DashboardStatsSectionWrapper>
        <DashboardStatsContainer>
          <DashboardVisualizationTitle>Owned Rentals</DashboardVisualizationTitle>

          <CircularStatsVisualization type={VisualizationType.NEUTRAL}>
            <Text style={{ fontSize: 16 }}>{ownedRentalCount}</Text>
          </CircularStatsVisualization>
        </DashboardStatsContainer>

        <DashboardStatsContainer>
          <DashboardVisualizationTitle>Total Earnings</DashboardVisualizationTitle>

          <CircularStatsVisualization type={VisualizationType.POSITIVE}>
            <Text style={{ fontSize: 16, maxWidth: 60 }} ellipsizeMode="tail" numberOfLines={1}>
              {totalEarnings}
            </Text>
          </CircularStatsVisualization>
        </DashboardStatsContainer>
      </DashboardStatsSectionWrapper>

      <DashboardStatsSectionWrapper>
        <DashboardStatsContainer>
          <DashboardVisualizationTitle>Liable Rentals</DashboardVisualizationTitle>

          <CircularStatsVisualization type={VisualizationType.NEGATIVE}>
            <Text style={{ fontSize: 16 }}>{liableRentalCount}</Text>
          </CircularStatsVisualization>
        </DashboardStatsContainer>

        <DashboardStatsContainer>
          <DashboardVisualizationTitle>Total Expenditure</DashboardVisualizationTitle>

          <CircularStatsVisualization type={VisualizationType.NEGATIVE}>
            <Text style={{ fontSize: 16, maxWidth: 60 }} ellipsizeMode="tail" numberOfLines={1}>
              {totalExpenditure}
            </Text>
          </CircularStatsVisualization>
        </DashboardStatsContainer>
      </DashboardStatsSectionWrapper>

      <MonthlyPaymentsBar monthlyEarnings={paymentsByMonth} />
    </ScrollView>
  )
}

export default WithWrapper(Home)
