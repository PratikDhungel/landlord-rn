import { Fragment } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import paymentMock from './paymentMock.json'

const EARNINGS_RANGE_START = 0
const EARNINGS_RANGE_ADDITION = 100

const EARNINGS_RANGE_START_PIXEL = 32
const EARNINGS_RANGE_PIXEL_DIFFERENCE = 30

const EARNINGS_RANGE_LIST = [...Array(11).keys()]

const MonthlyPaymentsBar = () => {
  return (
    <View
      style={{
        marginBottom: 12,
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: 600, alignSelf: 'center' }}>
        Earnings for past year
      </Text>

      <View style={styles.container}>
        {/* Vertical line on the left to show range */}
        <View
          style={{
            position: 'absolute',
            width: 1,
            backgroundColor: '#808080',
            bottom: EARNINGS_RANGE_START_PIXEL,
            height: (EARNINGS_RANGE_LIST.length - 1) * EARNINGS_RANGE_PIXEL_DIFFERENCE,
          }}
        />
        {/* Horizontal line on the left to show earnings */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: '#808080',
            bottom: EARNINGS_RANGE_START_PIXEL,
            height: 1,
          }}
        />

        {EARNINGS_RANGE_LIST.map(value => {
          const indicatorBottomPosition =
            EARNINGS_RANGE_START_PIXEL + EARNINGS_RANGE_PIXEL_DIFFERENCE * value
          const labelBottomPosition =
            EARNINGS_RANGE_START_PIXEL + EARNINGS_RANGE_PIXEL_DIFFERENCE * value - 5

          const rangeValue = EARNINGS_RANGE_START + EARNINGS_RANGE_ADDITION * value

          return (
            <Fragment key={value}>
              <View style={{ position: 'absolute', left: -28, bottom: labelBottomPosition }}>
                <Text style={{ fontSize: 12, lineHeight: 12, transform: [{ rotate: '-45deg' }] }}>
                  {rangeValue !== 0 && rangeValue}
                </Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  left: -6,
                  bottom: indicatorBottomPosition,
                  width: 12,
                  height: 2,
                  backgroundColor: '#000000',
                }}
              />
            </Fragment>
          )
        })}

        <ScrollView
          horizontal={true}
          style={{
            marginLeft: 16,
            paddingBottom: EARNINGS_RANGE_START_PIXEL,
          }}
          contentContainerStyle={{
            gap: 24,
          }}
        >
          {paymentMock.map(each => {
            return (
              <View style={{ alignSelf: 'flex-end', position: 'relative' }}>
                <View style={{ height: 200, width: 24, backgroundColor: '#007fff' }} />
                <View
                  style={{
                    position: 'absolute',
                    bottom: -26,
                    left: 2,
                  }}
                >
                  <Text style={{ fontSize: 12, lineHeight: 12, transform: [{ rotate: '-45deg' }] }}>
                    {each.month}
                  </Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 32 + (EARNINGS_RANGE_LIST.length - 1) * EARNINGS_RANGE_PIXEL_DIFFERENCE,
    marginLeft: 20,
    marginTop: 8,
  },
})

export default MonthlyPaymentsBar
