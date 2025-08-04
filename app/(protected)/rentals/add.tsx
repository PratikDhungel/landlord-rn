import { useState } from 'react'
import { Menu } from 'react-native-paper'
import { Pressable, View } from 'react-native'

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

  const [selectedTenant, setSelectedTenant] = useState<TDropdownOption | null>(null)
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

  const userSearchQueryOptions = {
    queryKey: ['users-list-query'],
    endpoint: 'users/search?name',
    prepareFunc: usersListPrepareFunction,
  }

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <SearchableDropdown
              selectedValue={selectedTenant}
              setSelectedValue={setSelectedTenant}
              queryOptions={userSearchQueryOptions}
            />
          </View>

          <View style={{ flex: 1 }}>
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
