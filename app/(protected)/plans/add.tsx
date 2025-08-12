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

import { useApiMutation } from '@/hooks/useApiMutation'
import { handleCreateNewRentalPlan } from '@/api/rentalPlans/addNewRenalPlan'
import { ratePeriodOptions } from '@/components/rentalPlans/constants/ratePeriodOptions'

const defaultRatePeriod = ratePeriodOptions.find(ratePeriod => ratePeriod.default)!

export default function TabTwoScreen() {
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [ratePeriod, setRatePeriod] = useState(defaultRatePeriod)

  const router = useRouter()
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  const { mutateAsync, isLoading } = useApiMutation(handleCreateNewRentalPlan)

  async function handleAddNewPlan() {
    try {
      const rentalPlanPayload = {
        name,
        rate,
        rate_period: ratePeriod.value,
      }

      await mutateAsync(rentalPlanPayload)

      handleInvalidateSingleQuery(['rental-plans'])
      router.back()
    } catch {
      console.error('Error adding new plan')
    }
  }

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ marginBottom: 12 }}>
          <LabelTextInput mode="outlined" label="Name" value={name} onChangeText={setName} />
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <LabelTextInput mode="outlined" label="Rate" value={rate} onChangeText={setRate} />
          </View>

          <View style={{ flex: 1 }}>
            <Dropdown
              selectedValue={ratePeriod}
              setSelectedValue={setRatePeriod}
              dropdownOptions={ratePeriodOptions}
            />
          </View>
        </View>

        <View>
          <LoadingButton
            buttonLabel="Add Plan"
            isLoading={isLoading}
            loadingLabel="Adding Plan"
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
