import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import ScreenWrapper from '@/components/common/ScreenWrapper'
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

export default function Home() {
  const { data, isError, isLoading } = useApiQuery<TFinancialSummary>({
    queryKey: ['financialSummary'],
    url: '/users/financial-summary',
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

  if (!data || isObjectEmpty(data)) {
    return (
      <ScreenWrapper customStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </ScreenWrapper>
    )
  }

  const { ownedRentalCount, liableRentalCount, totalEarnings, totalExpenditure, paymentsByMonth } =
    data

  return (
    <ScrollView>
      <ScreenWrapper>
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
      </ScreenWrapper>
    </ScrollView>
  )
}
