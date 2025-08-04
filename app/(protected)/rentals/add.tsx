import { useState } from 'react'
import { Menu } from 'react-native-paper'
import { Pressable, View } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'
import SearchableDropdown from '@/components/dropdown/SearchableDropdown'

import useApiQuery from '@/hooks/useApiQuery'

import { TUser } from '@/types/users'
import { TRentalPlan } from '@/types/rentalPlan'
import { TDropdownOption } from '@/types/common'

export default function TabTwoScreen() {
  const [isRentalPlanMenuVisible, setIsRentalPlanMenuVisible] = useState(false)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<TDropdownOption | null>(null)
  const [startDate, setStartDate] = useState(new Date())
  const [rentalPlanId, setRentalPlanId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { data: rentalPlans } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })

  async function handleAddNewRental() {
    setIsLoading(true)

    try {
      setIsSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRentalPlan = rentalPlans?.find(each => each.id === rentalPlanId)

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
          <Menu
            visible={isRentalPlanMenuVisible}
            anchor={
              <Pressable onPress={() => setIsRentalPlanMenuVisible(true)}>
                <LabelTextInput
                  mode="outlined"
                  label="Rental Plan"
                  value={selectedRentalPlan?.name}
                  disabled
                  outlineStyle={{ borderColor: '#444444' }}
                  textColor="#444444"
                />
              </Pressable>
            }
            anchorPosition="bottom"
            onDismiss={() => setIsRentalPlanMenuVisible(false)}
            contentStyle={{ minWidth: 160 }}
          >
            {rentalPlans?.map(eachRentalPlan => {
              return (
                <Menu.Item
                  key={eachRentalPlan.id}
                  onPress={() => {
                    setRentalPlanId(eachRentalPlan.id)
                    setIsRentalPlanMenuVisible(false)
                  }}
                  title={eachRentalPlan.name}
                />
              )
            })}
          </Menu>
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
            isSuccess={isSuccess}
            loadingLabel="Adding Rental"
            successLabel="Added"
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
