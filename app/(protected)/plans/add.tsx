import { useState } from 'react'
import { Menu } from 'react-native-paper'
import { Pressable, View } from 'react-native'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'

// TODO Move to constants
const RATE_PERIOD_VALUES = [
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Biweekly',
    value: 'biweekly',
  },
  {
    label: 'Monthly',
    value: 'monthly',
    default: true,
  },
  {
    label: 'Quarterly',
    value: 'quarterly',
  },
  {
    label: 'Biannual',
    value: 'biannual',
  },
  {
    label: 'Annual',
    value: 'annual',
  },
]

const defaultRatePeriod = RATE_PERIOD_VALUES.find(ratePeriod => ratePeriod.default)!.value

export default function TabTwoScreen() {
  const [menuVisible, setMenuVisible] = useState(false)

  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [ratePeriod, setRatePeriod] = useState(defaultRatePeriod)

  const ratePeriodLabel = RATE_PERIOD_VALUES.find(each => each.value === ratePeriod)!.label

  const openMenu = () => {
    setMenuVisible(true)
  }

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ marginBottom: 16 }}>
          <LabelTextInput mode="outlined" label="Name" value={name} onChangeText={setName} />
        </View>

        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <LabelTextInput mode="outlined" label="Rate" value={rate} onChangeText={setRate} />
          </View>

          <View style={{ width: 160 }}>
            <Menu
              visible={menuVisible}
              anchor={
                <Pressable onPress={openMenu}>
                  <LabelTextInput
                    mode="outlined"
                    label="Rate Period"
                    value={ratePeriodLabel}
                    disabled
                    // override disabled state colors
                    outlineStyle={{ borderColor: '#444444' }}
                    textColor="#444444"
                  />
                </Pressable>
              }
              anchorPosition="bottom"
              contentStyle={{ width: 160 }}
            >
              {RATE_PERIOD_VALUES.map(eachRatePeriod => {
                return (
                  <Menu.Item
                    key={eachRatePeriod.value}
                    onPress={() => {
                      setRatePeriod(eachRatePeriod.value)
                      setMenuVisible(false)
                    }}
                    title={eachRatePeriod.label}
                  />
                )
              })}
            </Menu>
          </View>
        </View>

        <View>
          <LoadingButton
            buttonLabel="Add Plan"
            isLoading={false}
            isSuccess={false}
            loadingLabel="Adding Plan"
            successLabel="Added"
            mode="contained"
            icon="plus"
            style={{ alignSelf: 'flex-end' }}
          />
        </View>
      </Container>
    </ScreenWrapper>
  )
}
