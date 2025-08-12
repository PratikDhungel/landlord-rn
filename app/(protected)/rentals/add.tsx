import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pressable, View } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import Dropdown from '@/components/dropdown/Dropdown'
import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'
import SearchableDropdown from '@/components/dropdown/SearchableDropdown'

import useApiQuery from '@/hooks/useApiQuery'
import { useApiMutation } from '@/hooks/useApiMutation'
import useReactQueryClient from '@/hooks/useReactQueryClient'

import { TUser } from '@/types/users'
import { TRentalPlan } from '@/types/rentalPlan'
import { TDropdownOption } from '@/types/common'
import { addNewRental } from '@/api/rentals/addNewRental'

export default function TabTwoScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [selectedTenant, setSelectedTenant] = useState<TDropdownOption | null>(null)
  const [selectedRentalPlan, setSelectedRentalPlan] = useState<TDropdownOption | null>(null)
  const [startDate, setStartDate] = useState(new Date())

  const router = useRouter()
  const { handleInvalidateSingleQuery } = useReactQueryClient()

  const { data: rentalPlans = [] } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })

  const { mutateAsync, isLoading } = useApiMutation(addNewRental)

  const rentalPlansOptions = rentalPlans.map(rentalPlan => {
    return {
      id: rentalPlan.id,
      label: rentalPlan.name,
      value: rentalPlan.id,
    }
  })

  async function handleAddNewRental() {
    if (!selectedTenant) {
      console.error('Tenant required')
      return
    }

    if (!selectedRentalPlan) {
      console.error('Rental Plan required')
      return
    }

    const newRentalVariables = {
      tenant_id: selectedTenant.id,
      plan_id: selectedRentalPlan.id,
      start_date: startDate.toISOString(),
    }

    try {
      await mutateAsync(newRentalVariables)
      handleInvalidateSingleQuery(['owned-rentals'])
      router.back()
    } catch {
      console.error('Error creating new plan')
    }
  }

  function usersListPrepareFunction(user: TUser[]) {
    return user.map(eachUser => {
      return {
        id: eachUser.id,
        label: `${eachUser.firstName} ${eachUser.lastName}`,
        value: eachUser.id,
      }
    })
  }

  function handleOpenDatePicker() {
    setShowDatePicker(true)
  }

  function handleStartDateSelection(datePickerEvent: DateTimePickerEvent, date: Date | undefined) {
    const { type } = datePickerEvent

    if (type === 'set' && date) {
      setStartDate(date)
    }

    setShowDatePicker(false)
  }

  const userSearchQueryOptions = {
    queryKey: ['users-list-query'],
    endpoint: 'users/search?name',
    prepareFunc: usersListPrepareFunction,
  }

  // Show date only
  const startDateString = startDate.toISOString().split('T')[0]

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ marginBottom: 12 }}>
          <SearchableDropdown
            selectedValue={selectedTenant}
            setSelectedValue={setSelectedTenant}
            queryOptions={userSearchQueryOptions}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Dropdown
            selectedValue={selectedRentalPlan}
            setSelectedValue={setSelectedRentalPlan}
            dropdownOptions={rentalPlansOptions}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Pressable onPress={handleOpenDatePicker}>
            <LabelTextInput
              mode="outlined"
              label="Start Date"
              value={startDateString}
              disabled
              outlineStyle={{ borderColor: '#444444' }}
              textColor="#444444"
            />
          </Pressable>

          {showDatePicker && (
            <RNDateTimePicker value={startDate} onChange={handleStartDateSelection} />
          )}
        </View>

        <View>
          <LoadingButton
            buttonLabel="Add Rental"
            isLoading={isLoading}
            loadingLabel="Adding Rental"
            mode="contained"
            icon="plus"
            style={{ alignSelf: 'flex-end' }}
            onPress={handleAddNewRental}
          />
        </View>
      </Container>
    </ScreenWrapper>
  )
}
