import { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

import { api } from '@/utils/axios'
import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'
import useReactQueryClient from '@/hooks/useReactQueryClient'
import Dropdown from '@/components/dropdown/Dropdown'

// TODO Move to constants
const RATE_PERIOD_OPTIONS = [
  {
    id: '1',
    label: 'Weekly',
    value: 'weekly',
  },
  {
    id: '2',
    label: 'Biweekly',
    value: 'biweekly',
  },
  {
    id: '3',
    label: 'Monthly',
    value: 'monthly',
    default: true,
  },
  {
    id: '4',
    label: 'Quarterly',
    value: 'quarterly',
  },
  {
    id: '5',
    label: 'Biannual',
    value: 'biannual',
  },
  {
    id: '6',
    label: 'Annual',
    value: 'annual',
  },
]

const defaultRatePeriod = RATE_PERIOD_OPTIONS.find(ratePeriod => ratePeriod.default)!

export default function TabTwoScreen() {
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [ratePeriod, setRatePeriod] = useState(defaultRatePeriod)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  async function handleAddNewPlan() {
    setIsLoading(true)

    try {
      await api.post('/rentals/create-rental-plan', {
        name,
        rate,
        rate_period: ratePeriod,
      })
      setIsSuccess(true)
      handleInvalidateSingleQuery(['rental-plans'])
      // NOTE Assuming new plan page is always opened from plans tab
      router.back()
    } finally {
      setIsLoading(false)
    }
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

          <View style={{ flex: 1 }}>
            <Dropdown
              selectedValue={ratePeriod}
              setSelectedValue={setRatePeriod}
              dropdownOptions={RATE_PERIOD_OPTIONS}
            />
          </View>
        </View>

        <View>
          <LoadingButton
            buttonLabel="Add Plan"
            isLoading={isLoading}
            isSuccess={isSuccess}
            loadingLabel="Adding Plan"
            successLabel="Added"
            mode="contained"
            icon="plus"
            style={{ alignSelf: 'flex-end' }}
            onPress={handleAddNewPlan}
          />
        </View>
      </Container>
    </ScreenWrapper>
  )
}
