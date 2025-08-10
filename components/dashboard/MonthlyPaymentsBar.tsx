import { Fragment } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Container from '@/components/common/Container'

import { TMonthlyEarning } from '@/types/users'

const EARNINGS_RANGE_START = 0
const EARNINGS_RANGE_ADDITION = 100

const EARNINGS_RANGE_START_PIXEL = 32
const EARNINGS_RANGE_PIXEL_DIFFERENCE = 30

const EARNINGS_RANGE_LIST = [...Array(11).keys()]

const EARNINGS_RANGE_MAX_HEIGHT = (EARNINGS_RANGE_LIST.length - 1) * EARNINGS_RANGE_PIXEL_DIFFERENCE

function getBarGraphHeightFromEarnings(earning: number) {
  const heightForEarning = (earning / EARNINGS_RANGE_ADDITION) * EARNINGS_RANGE_PIXEL_DIFFERENCE

  const roundedHeightValue = Math.round(heightForEarning)

  if (roundedHeightValue > EARNINGS_RANGE_MAX_HEIGHT) {
    return EARNINGS_RANGE_MAX_HEIGHT
  }

  return roundedHeightValue
}

const MonthlyPaymentsBar = ({ monthlyEarnings }: { monthlyEarnings: TMonthlyEarning[] }) => {
  return (
    <Container>
      <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600, alignSelf: 'center' }}>
        Earnings for past year
      </Text>

      <View style={styles.sectionWrapper}>
        {/* Vertical line on the left to show range */}
        <View style={styles.barGraphYAxis} />
        {/* Horizontal line on the left to show earnings */}
        <View style={styles.barGraphXAxis} />

        {EARNINGS_RANGE_LIST.map(value => {
          const indicatorBottomPosition =
            EARNINGS_RANGE_START_PIXEL + EARNINGS_RANGE_PIXEL_DIFFERENCE * value
          const labelBottomPosition =
            EARNINGS_RANGE_START_PIXEL + EARNINGS_RANGE_PIXEL_DIFFERENCE * value - 5

          const rangeValue = EARNINGS_RANGE_START + EARNINGS_RANGE_ADDITION * value

          return (
            <Fragment key={value}>
              <View style={[styles.yAxisRangeContainer, { bottom: labelBottomPosition }]}>
                <Text style={styles.barGraphRangeLabel}>{rangeValue !== 0 && rangeValue}</Text>
              </View>

              <View style={[styles.yAxisRangeDivider, { bottom: indicatorBottomPosition }]} />
            </Fragment>
          )
        })}

        <ScrollView
          horizontal={true}
          style={styles.horizontalScrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {monthlyEarnings.map((each, idx) => {
            const heightValue = getBarGraphHeightFromEarnings(each.earnings)

            return (
              <View style={styles.barGraphContainer} key={idx}>
                <View style={[styles.earningsBarGraph, { height: heightValue }]} />
                <View style={styles.earningMonthlyLabel}>
                  <Text style={styles.barGraphRangeLabel}>{each.month}</Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  sectionWrapper: {
    height: 32 + EARNINGS_RANGE_MAX_HEIGHT,
    marginLeft: 20,
    marginTop: 8,
  },
  barGraphYAxis: {
    position: 'absolute',
    width: 1,
    backgroundColor: '#808080',
    bottom: EARNINGS_RANGE_START_PIXEL,
    height: EARNINGS_RANGE_MAX_HEIGHT,
  },
  barGraphXAxis: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#808080',
    bottom: EARNINGS_RANGE_START_PIXEL,
    height: 1,
  },
  yAxisRangeContainer: {
    position: 'absolute',
    left: -28,
  },
  barGraphRangeLabel: {
    fontSize: 12,
    lineHeight: 12,
    transform: [{ rotate: '-45deg' }],
  },
  yAxisRangeDivider: {
    position: 'absolute',
    left: -6,
    width: 12,
    height: 2,
    backgroundColor: '#000000',
  },
  horizontalScrollContainer: {
    marginLeft: 16,
    paddingBottom: EARNINGS_RANGE_START_PIXEL,
  },
  scrollContentContainer: {
    gap: 24,
  },
  barGraphContainer: {
    alignSelf: 'flex-end',
  },
  earningsBarGraph: {
    width: 24,
    backgroundColor: '#007fff',
  },
  earningMonthlyLabel: {
    position: 'absolute',
    bottom: -26,
    left: 2,
  },
})

export default MonthlyPaymentsBar
